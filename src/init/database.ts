import mysql2 from 'mysql2';

export const initDatabaseConnexion = async () => {
  let dbConnexion;

  try {
    dbConnexion = await mysql2
      .createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      })
      .promise();
    console.log('Connexion to the database established.');
  } catch (error) {
    throw new Error('Unable to connect to the database: ' + error);
  }
  return dbConnexion;
};
