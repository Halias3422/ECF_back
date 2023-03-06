import express from 'express';
import { USERS_ROUTES } from './constants';
import { UsersController } from './controller';

export const usersRoutes = express.Router();

usersRoutes.post(USERS_ROUTES.login, async (req, res) => {
  const { statusCode, response, data } = await UsersController.login(req.body);
  res.status(statusCode).send({ response, ...data });
});

usersRoutes.post(USERS_ROUTES.signup, async (req, res) => {
  const { statusCode, response, data } = await UsersController.signup(req.body);
  res.status(statusCode).send({ response, ...data });
});

usersRoutes.post(USERS_ROUTES.updateOptionalInfo, async (req, res) => {
  const { statusCode, response, data } =
    await UsersController.updateOptionalInfo(req.body);
  res.status(statusCode).send({ response, data });
});
