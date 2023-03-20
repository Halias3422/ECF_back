import express from 'express';
import { uploadImage } from '../../index';
import { verifyAuthorization } from '../common/apiResponses';
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

dishesGalleryRoutes.get(
  DISHES_GALLERY_ROUTES.verifyIfDuplicateTitleOrImage,
  async (req, res) => {
    if (req.query) {
      const { title, image, id } = req.query;
      const { statusCode, response } =
        await DishesGalleryController.verifyIfDuplicateTitleOrImage({
          title: title as string,
          image: image as string,
          id: id as string,
        });
      res.status(statusCode).send(response);
    } else {
      res.status(400).send('Wrong data sent');
    }
  }
);

// PROTECTED

dishesGalleryRoutes.post(
  DISHES_GALLERY_ROUTES.deleteDishGalleryItem,
  async (req, res) => {
    const auth = await verifyAuthorization(req);
    if (auth.statusCode === 200) {
      const { statusCode, response } =
        await DishesGalleryController.deleteDishGalleryItem(req.body);
      res.status(statusCode).send(response);
    } else {
      res.status(401).send('Unauthorized');
    }
  }
);

dishesGalleryRoutes.post(
  DISHES_GALLERY_ROUTES.saveDishGalleryImage,
  async (req, res) => {
    const auth = await verifyAuthorization(req);
    if (auth.statusCode === 200) {
      uploadImage(req, res, async (error) => {
        if (error) {
          return res.status(500).send('Error uploading image: ' + error);
        }
        const { statusCode, response } =
          await DishesGalleryController.saveDishGalleryImage(req.file);
        return res.status(statusCode).send(response);
      });
    } else {
      res.status(401).send('Unauthorized');
    }
  }
);

dishesGalleryRoutes.post(
  DISHES_GALLERY_ROUTES.deleteDishGalleryImage,
  async (req, res) => {
    const auth = await verifyAuthorization(req);
    if (auth.statusCode === 200) {
      const { statusCode, response } =
        await DishesGalleryController.deleteDishGalleryImage(req.body);
      res.status(statusCode).send(response);
    } else {
      res.status(401).send('Unauthorized');
    }
  }
);

dishesGalleryRoutes.post(
  DISHES_GALLERY_ROUTES.createNewDishGalleryItem,
  async (req, res) => {
    const auth = await verifyAuthorization(req);
    if (auth.statusCode === 200) {
      const { statusCode, response } =
        await DishesGalleryController.createDishGalleryItem(req.body);
      res.status(statusCode).send(response);
    } else {
      res.status(401).send('Unauthorized');
    }
  }
);

dishesGalleryRoutes.post(
  DISHES_GALLERY_ROUTES.modifyDishGalleryItem,
  async (req, res) => {
    const auth = await verifyAuthorization(req);
    if (auth.statusCode === 200) {
      const { statusCode, response } =
        await DishesGalleryController.modifyDishGalleryItem(req.body);
      res.status(statusCode).send(response);
    } else {
      res.status(401).send('Unauthorized');
    }
  }
);
