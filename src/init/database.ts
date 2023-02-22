import mysql2 from 'mysql2';

const testDatabaseConnexion = async (dbConnexion: any) => {
  try {
    await dbConnexion.execute('SELECT * from Users');
    console.log('Connexion to the database successfully established.');
  } catch (error) {
    throw new Error(
      'Error: could not connect to the database: ' + JSON.stringify(error)
    );
  }
};

export const initDatabaseConnexion = () => {
  const dbConnexion = mysql2
    .createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    })
    .promise();
  testDatabaseConnexion(dbConnexion);
  return dbConnexion;
};
