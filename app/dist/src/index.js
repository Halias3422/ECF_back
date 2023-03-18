"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootDirectory = exports.dbConnexion = exports.upload = exports.storage = exports.server = void 0;
const path_1 = __importDefault(require("path"));
const database_1 = require("./init/database");
const environment_1 = require("./init/environment");
const server_1 = require("./init/server");
const storage_1 = require("./init/storage");
(0, environment_1.setupCurrentEnvironment)();
exports.server = (0, server_1.initExpressServer)();
exports.storage = (0, storage_1.initStorage)();
exports.upload = {
    dishes: (0, storage_1.uploadDishImage)(),
};
exports.dbConnexion = (0, database_1.initDatabaseConnexion)();
exports.rootDirectory = path_1.default.resolve(__dirname + "/..");
