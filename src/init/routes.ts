import express from 'express';
import { dishesRoutes } from '../entities/dishes/routes';
import { dishesGalleryRoutes } from '../entities/dishesGallery/routes';
import { scheduleRoutes } from '../entities/schedule/routes';

export const routes = express.Router();

routes.use(dishesRoutes);
routes.use(dishesGalleryRoutes);
routes.use(scheduleRoutes);
