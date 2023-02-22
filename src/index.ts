import { setupCurrentEnvironment } from './init/environment';
import { initExpressServer } from './init/server';

setupCurrentEnvironment();

export const server = initExpressServer();
