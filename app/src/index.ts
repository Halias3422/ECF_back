import path from 'path';
import { initDatabaseConnexion } from './init/database';
import { setupCurrentEnvironment } from './init/environment';
import { initExpressServer } from './init/server';
import { initStorage, initUploadImage } from './init/storage';

setupCurrentEnvironment();

export const server = initExpressServer();
export const storage = initStorage();
export const uploadImage = initUploadImage();
export const dbConnexion = initDatabaseConnexion();
export const rootDirectory = path.resolve(__dirname + '/..');
