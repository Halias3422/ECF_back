import cors from 'cors';
import express from 'express';

export const initExpressServer = () => {
  const app = express();

  app.use(
    cors({
      origin: process.env.FRONT_END_URL,
    }),
    // necessary to handle incoming data
    express.urlencoded({ extended: true }),
    express.json()
  );

  let server = null;
  try {
    server = app.listen(process.env.SERVER_PORT, () => {
      console.log('Server is running on port ' + process.env.SERVER_PORT);
    });
  } catch (error) {
    console.log('Unexpected Error while initializing server : ' + error);
  }
  return server;
};
