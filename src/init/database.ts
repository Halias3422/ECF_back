import fs from 'fs';
import path from 'path';
import mysql2 from 'mysql2';
import { USERS_TABLE } from '../entities/users/constants';

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
  console.log(' DB_HOST = ' + process.env.DB_HOST);
  console.log('DB_USER = ' + process.env.DB_USER);
  console.log('DB_PASSWORD = ' + process.env.DB_PASSWORD);
  console.log('DB_NAME = ' + process.env.DB_NAME);
  const dbConnexion = mysql2
    .createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    })
    .promise();
  testDatabaseConnexion(dbConnexion);
  addFirstUser(dbConnexion);
  return dbConnexion;
};
