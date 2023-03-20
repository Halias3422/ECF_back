"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupCurrentEnvironment = void 0;
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const setupCurrentEnvironment = () => {
    if (!process.env.ENVIRONMENT) {
        process.env.ENVIRONMENT = 'development';
    }
    dotenv_1.default.config({
        path: path_1.default.resolve(__dirname, `../../environment/${process.env.ENVIRONMENT}.env`),
    });
    console.log('You are runnning the server in ' + process.env.ENVIRONMENT + ' mode');
};
exports.setupCurrentEnvironment = setupCurrentEnvironment;
