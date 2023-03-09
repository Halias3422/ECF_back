import multer from 'multer';
import { initDatabaseConnexion } from './init/database';
import { setupCurrentEnvironment } from './init/environment';
import { initExpressServer } from './init/server';
import { initDishesGalleryStorage, initDishesStorage } from './init/storage';

setupCurrentEnvironment();

export const server = initExpressServer();
export const upload = {
  dishesGallery: () => multer({ storage: initDishesGalleryStorage() }),
  dishes: () => initDishesStorage(),
};
export const dbConnexion = initDatabaseConnexion();
