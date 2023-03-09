import mysql2 from 'mysql2';
import bcrypt from 'bcrypt';
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
      const hashedPwd = await bcrypt.hash('password@2', 10);
      const insert = mysql2.format(
        `INSERT INTO ${USERS_TABLE.name} VALUES (DEFAULT, 'admin@mail.com', '${hashedPwd}', NULL, NULL, NULL, true)`
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
      port: parseInt(process.env.DB_PORT as string),
    })
    .promise();
  testDatabaseConnexion(dbConnexion);
  addFirstUser(dbConnexion);
  return dbConnexion;
};
