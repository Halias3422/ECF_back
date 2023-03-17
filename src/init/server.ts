import cors from 'cors';
import express from 'express';
import { routes } from './routes';

export const initExpressServer = () => {
  const app = express();

  const corsOptions = {
    AccessControlAllowOrigin: '*',
    origin: '*',
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
  };
  console.log('JE SUIS LA');
  app.use(
    cors(corsOptions),
    // necessary to handle incoming data
    express.urlencoded({ extended: true }),
    express.json()
  );

  // init routing
  app.use('/', routes);

  // serve static images
  app.use(express.static('public'));

  // launch server
  let server = null;
  try {
    server = app.listen(process.env.SERVER_PORT || '5000', () => {
      console.log(
        'Server is running on port ' + process.env.SERVER_PORT || 8080
      );
    });
  } catch (error) {
    console.log('Unexpected Error while initializing server : ' + error);
  }
  return server;
};
