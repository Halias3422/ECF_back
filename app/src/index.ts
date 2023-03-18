import AWS from "aws-sdk";
import path from "path";
import { initDatabaseConnexion } from "./init/database";
import { setupCurrentEnvironment } from "./init/environment";
import { initExpressServer } from "./init/server";

setupCurrentEnvironment();

export const server = initExpressServer();
export const dbConnexion = initDatabaseConnexion();
export const rootDirectory = path.resolve(__dirname + "/..");
export const storage = new AWS.S3();
