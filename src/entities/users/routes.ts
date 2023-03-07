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

// PROTECTED

usersRoutes.get(USERS_ROUTES.getOptionalInfo, async (req, res) => {
  if (req.headers && req.headers.authorization) {
    const auth = req.headers.authorization.split(':');
    if (auth.length === 2) {
      const { statusCode, response, data } =
        await UsersController.getUserOptionalInfo({
          id: auth[0],
          token: auth[1],
        });
      res.status(statusCode).send({ response, data });
    }
  }
  res.status(401).send('Unauthorized');
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
    }
  }
  res.status(401).send('Unauthorized');
});

usersRoutes.get(USERS_ROUTES.securedLogRequest, async (req, res) => {
  res.render('secured-log-request');
});

usersRoutes.post(USERS_ROUTES.securedLogProcess, async (req, res) => {
  const { statusCode, data } = await UsersController.protectedLogin({
    email: req.body.emailInput,
    password: req.body.passwordInput,
  });
  if (statusCode !== 303 && statusCode !== 200) {
    res.status(401).send('Unauthorized');
  } else if (statusCode === 303) {
    res.render(USERS_ROUTES.updateDefaultPassword, {
      auth: data.session,
    });
  } else if (statusCode === 200) {
    res.render(USERS_ROUTES.securedLogProcessed, {
      auth: data.session,
    });
  }
});

usersRoutes.post(
  USERS_ROUTES.processUpdateDefaultPassword,
  async (req, res) => {
    if (req.headers && req.headers.authorization) {
      const auth = req.headers.authorization.split(':');
      if (auth.length === 3) {
        await UsersController.updateProtectedDefaultPassword(
          {
            id: auth[0],
            email: auth[1],
            token: auth[2],
          },
          req.body.password
        );
      }
    }
    res.status(401).send('Unauthorized');
  }
);
