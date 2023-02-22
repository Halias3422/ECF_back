import path from 'path';
import dotenv from 'dotenv';

export const setupCurrentEnvironment = () => {
  if (!process.env.ENVIRONMENT) {
    process.env.ENVIRONMENT = 'development';
  }

  dotenv.config({
    path: path.resolve(
      __dirname,
      `../../environment/${process.env.ENVIRONMENT}.env`
    ),
  });

  console.log(
    'You are runnning the server in ' + process.env.ENVIRONMENT + ' mode'
  );
};
