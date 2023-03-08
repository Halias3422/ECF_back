import express from 'express';
import { adminRoutes } from '../entities/admin/routes';
import { categoriesRoutes } from '../entities/categories/routes';
import { dishesRoutes } from '../entities/dishes/routes';
import { dishesGalleryRoutes } from '../entities/dishesGallery/routes';
import { menusRoutes } from '../entities/menus/routes';
import { scheduleRoutes } from '../entities/schedule/routes';
import { usersRoutes } from '../entities/users/routes';

export const routes = express.Router();

routes.use(dishesRoutes);
routes.use(dishesGalleryRoutes);
routes.use(scheduleRoutes);
routes.use(menusRoutes);
routes.use(categoriesRoutes);
routes.use(usersRoutes);
routes.use(adminRoutes);
