import express from 'express';
import { verifyAuthorization } from '../common/apiResponses';
import { CATEGORIES_ROUTES } from './constant';
import { CategoriesController } from './controller';

export const categoriesRoutes = express.Router();

categoriesRoutes.get(CATEGORIES_ROUTES.getAllCategories, async (req, res) => {
  const { statusCode, response, data } =
    await CategoriesController.getAllCategories();
  res.status(statusCode).send({ response, data });
});

categoriesRoutes.post(CATEGORIES_ROUTES.createNewCategory, async (req, res) => {
  const { statusCode, response } = await CategoriesController.createNewCategory(
    req.body
  );
  res.status(statusCode).send(response);
});

// PROTECTED

categoriesRoutes.post(CATEGORIES_ROUTES.deleteCategory, async (req, res) => {
  const auth = await verifyAuthorization(req);
  if (auth.statusCode === 200) {
    const { statusCode, response } = await CategoriesController.deleteCategory({
      id: req.body.id_category,
      name: req.body.name,
    });
    res.status(statusCode).send(response);
  } else {
    res.status(401).send('Unauthorized');
  }
});

categoriesRoutes.post(CATEGORIES_ROUTES.modifyCategory, async (req, res) => {
  const auth = await verifyAuthorization(req);
  if (auth.statusCode === 200) {
    const { statusCode, response } = await CategoriesController.modifyCategory(
      req.body
    );
    res.status(statusCode).send(response);
  } else {
    res.status(401).send('Unauthorized');
  }
});

// PROTECTED

categoriesRoutes.post(CATEGORIES_ROUTES.createNewCategory, async (req, res) => {
  const auth = await verifyAuthorization(req);
  if (auth.statusCode === 200) {
    const { statusCode, response } =
      await CategoriesController.createNewCategory(req.body);
    res.status(statusCode).send(response);
  } else {
    res.status(401).send('Unauthorized');
  }
});
