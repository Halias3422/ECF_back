import express from 'express';
import { ADMIN_ROUTES } from './constants';
import { AdminController } from './controller';

export const adminRoutes = express.Router();

adminRoutes.get(ADMIN_ROUTES.securedLogRequest, async (req, res) => {
  res.render('secured-log-request');
});

adminRoutes.post(ADMIN_ROUTES.securedLogProcess, async (req, res) => {
  const { statusCode, data } = await AdminController.protectedLogin({
    email: req.body.emailInput,
    password: req.body.passwordInput,
  });
  if (statusCode !== 303 && statusCode !== 200) {
    res.status(401).send('Unauthorized');
  } else if (statusCode === 303) {
    res.render(ADMIN_ROUTES.updateDefaultPassword, {
      auth: data.session,
    });
  } else if (statusCode === 200) {
    res.render(ADMIN_ROUTES.securedLogProcessed, {
      auth: data.session,
    });
  }
});

adminRoutes.post(
  ADMIN_ROUTES.processUpdateDefaultPassword,
  async (req, res) => {
    if (req.headers && req.headers.authorization) {
      const auth = req.headers.authorization.split(':');
      if (auth.length === 3) {
        await AdminController.updateProtectedDefaultPassword(
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
