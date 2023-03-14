import express from 'express';
import { AdminController } from '../admin/controller';
import { verifyUserAuthorization } from '../common/apiResponses';
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

// PROTECTED

usersRoutes.post(USERS_ROUTES.updateOptionalInfo, async (req, res) => {
  const auth = await verifyUserAuthorization(req);
  if (auth.statusCode === 200) {
    const { statusCode, response, data } =
      await UsersController.updateOptionalInfo(req.body);
    res.status(statusCode).send({ response, data });
  } else {
    res.status(401).send('Unauthorized');
  }
});

usersRoutes.get(USERS_ROUTES.getOptionalInfo, async (req, res) => {
  const auth = await verifyUserAuthorization(req);
  if (auth.statusCode === 200) {
    const { statusCode, response, data } =
      await UsersController.getUserOptionalInfo(auth.data);
    res.status(statusCode).send({ response, data });
  } else {
    res.status(401).send('Unauthorized');
  }
});

usersRoutes.get(USERS_ROUTES.getRole, async (req, res) => {
  if (req.headers && req.headers.authorization) {
    const auth = req.headers.authorization.split(':');
    if (auth.length === 2) {
      const { statusCode, response, data } = await UsersController.getUserRole({
        id: auth[0],
        token: auth[1],
      });
      res.status(statusCode).send({ response, data });
    } else if (auth.length === 3) {
      const { statusCode, response } =
        await AdminController.getAuthenticatedProtectedUserFromSession({
          id: auth[0],
          email: auth[1],
          token: auth[2],
        });
      if (statusCode === 200) {
        res.status(statusCode).send({ response, data: { role: 1 } });
      }
    }
  } else {
    res.status(401).send('Unauthorized');
  }
});
