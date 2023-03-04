import express from 'express';
import { CATEGORIES_ROUTES } from './constant';
import { CategoriesController } from './controller';

export const categoriesRoutes = express.Router();

categoriesRoutes.post(CATEGORIES_ROUTES.createNewCategory, async (req, res) => {
  const { statusCode, response } = await CategoriesController.createNewCategory(
    req.body
  );
  res.status(statusCode).send(response);
});
