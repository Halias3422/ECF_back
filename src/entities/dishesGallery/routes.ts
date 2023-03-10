import express from 'express';
import { upload } from '../../index';
import { AdminController } from '../admin/controller';
import { databaseQueryError } from '../common/apiResponses';
import { ApiResponse } from '../common/constants';
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

const verifyAuthorization = async (req: any): Promise<ApiResponse> => {
  if (req.headers && req.headers.authorization) {
    const auth = req.headers.authorization.split(':');
    if (auth.length === 3) {
      const isAuth =
        await AdminController.getAuthenticatedProtectedUserFromSession({
          id: auth[0],
          email: auth[1],
          token: auth[2],
        });
      return isAuth;
    }
  }
  return databaseQueryError('Unauthorized');
};

dishesGalleryRoutes.post(
  DISHES_GALLERY_ROUTES.deleteDishGalleryItem,
  async (req, res) => {
    const auth = await verifyAuthorization(req);
    if (auth.statusCode === 200) {
      const { statusCode, response } =
        await DishesGalleryController.deleteDishGalleryItem(req.body);
      res.status(statusCode).send({ response });
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

dishesGalleryRoutes.post(
  DISHES_GALLERY_ROUTES.deleteImage,
  async (req, res) => {
    const auth = await verifyAuthorization(req);
    if (auth.statusCode === 200) {
      const { statusCode, response } =
        await DishesGalleryController.deleteImage(req.body.image);
      res.status(statusCode).send(response);
    } else {
      res.status(401).send('Unauthorized');
    }
  }
);
