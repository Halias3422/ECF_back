import express from 'express';
import { verifyAuthorization } from '../common/apiResponses';
import { DISHES_ROUTES } from './constants';
import { DishesController } from './controller';

export const dishesRoutes = express.Router();

dishesRoutes.get(DISHES_ROUTES.getAllDishesByCategories, async (req, res) => {
  const { statusCode, data, response } =
    await DishesController.getAllDishesByCategories();
  res.status(statusCode).send({ response, data });
});

dishesRoutes.post(DISHES_ROUTES.createNewDish, async (req, res) => {
  const { statusCode, response } = await DishesController.createNewDish(
    req.body
  );
  res.status(statusCode).send(response);
});

dishesRoutes.post(DISHES_ROUTES.deleteDishItem, async (req, res) => {
  const auth = await verifyAuthorization(req);
  if (auth.statusCode === 200) {
    const { statusCode, response } = await DishesController.deleteDishItem(
      req.body
    );
    res.status(statusCode).send(response);
  } else {
    res.status(401).send('Unauthorized');
  }
});
