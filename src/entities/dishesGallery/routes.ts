import express from 'express';
import { upload } from '../../index';
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

// PROTECTED

dishesGalleryRoutes.post(
  DISHES_GALLERY_ROUTES.deleteDishGalleryItem,
  async (req, res) => {
    if (req.headers && req.headers.authorization) {
      const auth = req.headers.authorization.split(':');
      if (auth.length === 3) {
        const { statusCode, response } =
          await DishesGalleryController.deleteDishGalleryItem(
            {
              id: auth[0],
              email: auth[1],
              token: auth[2],
            },
            req.body
          );
        res.status(statusCode).send({ response });
      }
    } else {
      res.status(401).send('Unauthorized');
    }
  }
);

dishesGalleryRoutes.post(
  DISHES_GALLERY_ROUTES.saveDishGalleryImage,
  (req, res) => {
    upload.dishesGallery(req, res, (error) => {
      if (error) {
        return res.status(500).send('Error uploading image ');
      }
      return res.status(201).send('New gallery dish saved');
    });
  }
);

dishesGalleryRoutes.post(
  DISHES_GALLERY_ROUTES.createNewDishGalleryItem,
  async (req, res) => {
    if (req.headers && req.headers.authorization) {
      const auth = req.headers.authorization.split(':');
      if (auth.length === 3) {
        const { statusCode, response } =
          await DishesGalleryController.createDishGalleryItem(
            {
              id: auth[0],
              email: auth[1],
              token: auth[2],
            },
            req.body
          );
        res.status(statusCode).send(response);
      }
    } else {
      res.status(401).send('Unauthorized');
    }
  }
);
