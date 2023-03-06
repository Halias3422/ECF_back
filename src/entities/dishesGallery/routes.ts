import express from 'express';
import { DISHES_GALLERY_ROUTES } from './constants';
import { DishesGalleryController } from './controller';

export const dishesGalleryRoutes = express.Router();

dishesGalleryRoutes.get(
  DISHES_GALLERY_ROUTES.getAllDishesGallery,
  async (req, res) => {
    const { statusCode, response, data } =
      await DishesGalleryController.getAllDishesGallery();
    res.status(statusCode).send({ response, data });
  }
);
