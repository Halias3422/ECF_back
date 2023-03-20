import express from 'express';
import { uploadImage } from '../../index';
import { verifyAuthorization } from '../common/apiResponses';
import { DISHES_ROUTES } from './constants';
import { DishesController } from './controller';

export const dishesRoutes = express.Router();

dishesRoutes.get(DISHES_ROUTES.getAllDishesByCategories, async (req, res) => {
  const { statusCode, data, response } =
    await DishesController.getAllDishesByCategories();
  res.status(statusCode).send({ response, data });
});

dishesRoutes.get(
  DISHES_ROUTES.verifyIfDuplicateTitleOrImage,
  async (req, res) => {
    if (req.query) {
      const { title, image, id, description, price, category } = req.query;
      const { statusCode, response } =
        await DishesController.verifyIfDuplicateTitleOrImage({
          title: title as string,
          image: image as string,
          id: id as string,
          description: description as string,
          price: price as string,
          category: category as string,
        });
      res.status(statusCode).send(response);
    } else {
      res.status(400).send('Wrong data sent');
    }
  }
);

// PROTECTED

dishesRoutes.post(DISHES_ROUTES.createNewDish, async (req, res) => {
  const auth = await verifyAuthorization(req);
  if (auth.statusCode === 200) {
    const { statusCode, response } = await DishesController.createNewDish(
      req.body
    );
    res.status(statusCode).send(response);
  } else {
    res.status(401).send('Unauthorized');
  }
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

dishesRoutes.post(DISHES_ROUTES.saveDishImage, async (req, res) => {
  const auth = await verifyAuthorization(req);
  if (auth.statusCode === 200) {
    uploadImage(req, res, async (error) => {
      if (error) {
        return res.status(500).send('Error uploading image: ' + error);
      }
      const { statusCode, response } = await DishesController.saveDishImage(
        req.file
      );
      return res.status(statusCode).send(response);
    });
  } else {
    res.status(401).send('Unauthorized');
  }
});

dishesRoutes.post(DISHES_ROUTES.deleteDishImage, async (req, res) => {
  const auth = await verifyAuthorization(req);
  if (auth.statusCode === 200) {
    const { statusCode, response } = await DishesController.deleteDishImage(
      req.body
    );
    res.status(statusCode).send(response);
  } else {
    res.status(401).send('Unauthorized');
  }
});

dishesRoutes.post(DISHES_ROUTES.modifyDishItem, async (req, res) => {
  const auth = await verifyAuthorization(req);
  if (auth.statusCode === 200) {
    const { statusCode, response } = await DishesController.modifyDishItem(
      req.body
    );
    res.status(statusCode).send(response);
  } else {
    res.status(401).send('Unauthorized');
  }
});
