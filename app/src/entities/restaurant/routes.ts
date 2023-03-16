import express from 'express';
import { verifyAuthorization } from '../common/apiResponses';
import { RESTAURANT_ROUTES } from './constants';
import { RestaurantController } from './controller';

export const restaurantRoutes = express.Router();

restaurantRoutes.get(RESTAURANT_ROUTES.getSeatsCapacity, async (req, res) => {
  const { statusCode, response, data } =
    await RestaurantController.getSeatsCapacity();
  res.status(statusCode).send({ response, data });
});

// PROTECTED

restaurantRoutes.post(
  RESTAURANT_ROUTES.modifySeatsCapacity,
  async (req, res) => {
    const auth = await verifyAuthorization(req);
    if (auth.statusCode === 200) {
      const { statusCode, response } =
        await RestaurantController.modifySeatsCapacity(req.body.seatsCapacity);
      res.status(statusCode).send(response);
    } else {
      res.status(401).send('Unauthorized');
    }
  }
);
