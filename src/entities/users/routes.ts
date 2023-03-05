import express from 'express';
import { USERS_ROUTES } from './constants';
import { UsersController } from './controller';

export const usersRoutes = express.Router();

usersRoutes.post(USERS_ROUTES.login, async (req, res) => {
  const { statusCode, response } = await UsersController.login(req.body);
  res.status(statusCode).send(response);
});

usersRoutes.post(USERS_ROUTES.signup, async (req, res) => {
  const { statusCode, response } = await UsersController.signup(req.body);
  res.status(statusCode).send(response);
});

usersRoutes.post(USERS_ROUTES.updateOptionalInfo, async (req, res) => {
  const { statusCode, response } = await UsersController.updateOptionalInfo(
    req.body
  );
  res.status(statusCode).send(response);
});
