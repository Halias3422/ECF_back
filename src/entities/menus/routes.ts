import express from 'express';
import { MENUS_ROUTES } from './constants';
import { MenuController } from './controller';

export const menusRoutes = express.Router();

menusRoutes.get(MENUS_ROUTES.getAllMenus, async (req, res) => {
  const { statusCode, response, data } = await MenuController.getAllMenus();
  res.status(statusCode).send({ response, data });
});
