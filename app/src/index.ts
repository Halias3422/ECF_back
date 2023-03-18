import path from "path";
import { initDatabaseConnexion } from "./init/database";
import { setupCurrentEnvironment } from "./init/environment";
import { initExpressServer } from "./init/server";
import { initStorage, uploadDishImage } from "./init/storage";

setupCurrentEnvironment();

export const server = initExpressServer();
export const storage = initStorage();
export const upload = {
  dishes: uploadDishImage(),
};
export const dbConnexion = initDatabaseConnexion();
export const rootDirectory = path.resolve(__dirname + "/..");
