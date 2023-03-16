import path from 'path';
import dotenv from 'dotenv';

export const setupCurrentEnvironment = () => {
  if (!process.env.ENVIRONMENT) {
    process.env.ENVIRONMENT = 'development';
  }

  dotenv.config({
    path: path.resolve(__dirname, `../../${process.env.ENVIRONMENT}.env`),
  });
  console.log(
    'path = ' + path.resolve(__dirname, `/../../${process.env.ENVIRONMENT}.env`)
  );
  console.log('process.env.DB_HOST = ' + process.env.DB_HOST);
  console.log(
    'You are runnning the server in ' + process.env.ENVIRONMENT + ' mode'
  );
};
