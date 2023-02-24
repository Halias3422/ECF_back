import express from 'express';
import { dishesRoutes } from '../entities/dishes/routes';
import { dishesGalleryRoutes } from '../entities/dishesGallery/routes';

export const routes = express.Router();

routes.use(dishesRoutes);
routes.use(dishesGalleryRoutes);
