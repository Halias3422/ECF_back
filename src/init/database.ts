import fs from 'fs';
import mysql2 from 'mysql2';
import { USERS_TABLE } from '../entities/users/constants';

const seedDatabase = async (dbConnexion: any) => {
  const seedQuery = fs.readFileSync('../../init.sql', { encoding: 'utf-8' });
  try {
    await dbConnexion.execute(seedQuery);
    console.log('Database seeded successfully');
    await testDatabaseConnexion(dbConnexion);
    await addFirstUser(dbConnexion);
  } catch (error) {
    throw new Error(
      'Error: could not seed the database: ' + JSON.stringify(error)
    );
  }
};

const testDatabaseConnexion = async (dbConnexion: any) => {
  try {
    await dbConnexion.execute(`SELECT * from ${USERS_TABLE.name}`);
    console.log('Connexion to the database successfully established.');
  } catch (error) {
    throw new Error(
      'Error: could not connect to the database: ' + JSON.stringify(error)
    );
  }
};

const addFirstUser = async (dbConnexion: any) => {
  try {
    const users = `SELECT * FROM ${USERS_TABLE.name}`;
    const [rows] = await dbConnexion.execute(users);
    if (rows.length === 0) {
      const insert = mysql2.format(
        `INSERT INTO ${USERS_TABLE.name} VALUES (DEFAULT, 'admin@mail.com', '$2a$10$ibNTirYwGrrMwrJOq0GDje4lYAfKYaXaJV/TtLR4.7VBPHbhLu5eC', NULL, NULL, NULL, true)`
      );
      const [rows] = await dbConnexion.execute(insert);
      if (rows.affectedRows !== 1) {
        throw new Error('Error creating first user');
      }
    }
  } catch (error) {
    throw new Error('Error creating first user' + JSON.stringify(error));
  }
};

export const initDatabaseConnexion = () => {
  const dbConnexion = mysql2
    .createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: {
        rejectUnauthorized: true,
      },
    })
    .promise();
  seedDatabase(dbConnexion);
  return dbConnexion;
};
