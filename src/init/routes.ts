import express from 'express';
import { dishesRoutes } from '../entities/dishes/routes';

export const routes = express.Router();

routes.use(dishesRoutes);
