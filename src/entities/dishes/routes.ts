import express from 'express';
import { DISHES_ROUTES } from './constants';
import { DishesController } from './controller';

export const dishesRoutes = express.Router();

dishesRoutes.post(DISHES_ROUTES.createNewDish, async (req, res) => {
  const { statusCode, response } = await DishesController.createNewDish(
    req.body
  );
  res.status(statusCode).send(response);
});
