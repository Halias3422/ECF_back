import express from 'express';
import { verifyAuthorization } from '../common/apiResponses';
import { MENUS_ROUTES } from './constants';
import { MenuController } from './controller';

export const menusRoutes = express.Router();

menusRoutes.get(MENUS_ROUTES.getAllMenus, async (req, res) => {
  const { statusCode, response, data } = await MenuController.getAllMenus();
  res.status(statusCode).send({ response, data });
});

//PROTECTED

menusRoutes.post(MENUS_ROUTES.createNewMenu, async (req, res) => {
  const auth = await verifyAuthorization(req);
  if (auth.statusCode === 200) {
    const { statusCode, response } = await MenuController.createNewMenu(
      req.body
    );
    res.status(statusCode).send(response);
  } else {
    res.status(401).send('Unauthorized');
  }
});

menusRoutes.post(MENUS_ROUTES.modifyMenu, async (req, res) => {
  const auth = await verifyAuthorization(req);
  if (auth.statusCode === 200) {
    const { statusCode, response } = await MenuController.modifyMenu(req.body);
    res.status(statusCode).send(response);
  } else {
    res.status(401).send('Unauthorized');
  }
});

menusRoutes.post(MENUS_ROUTES.deleteMenu, async (req, res) => {
  const auth = await verifyAuthorization(req);
  if (auth.statusCode === 200) {
    const { statusCode, response } = await MenuController.deleteMenu(req.body);
    res.status(statusCode).send(response);
  } else {
    res.status(401).send('Unauthorized');
  }
});
