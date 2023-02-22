import { initDatabaseConnexion } from './init/database';
import { setupCurrentEnvironment } from './init/environment';
import { initExpressServer } from './init/server';

setupCurrentEnvironment();

export const server = initExpressServer();
export const dbConnexion = initDatabaseConnexion();
