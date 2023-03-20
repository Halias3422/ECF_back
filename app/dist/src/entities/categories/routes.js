"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriesRoutes = void 0;
const express_1 = __importDefault(require("express"));
const apiResponses_1 = require("../common/apiResponses");
const constant_1 = require("./constant");
const controller_1 = require("./controller");
exports.categoriesRoutes = express_1.default.Router();
exports.categoriesRoutes.get(constant_1.CATEGORIES_ROUTES.getAllCategories, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { statusCode, response, data } = yield controller_1.CategoriesController.getAllCategories();
    res.status(statusCode).send({ response, data });
}));
// PROTECTED
exports.categoriesRoutes.post(constant_1.CATEGORIES_ROUTES.deleteCategory, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = yield (0, apiResponses_1.verifyAuthorization)(req);
    if (auth.statusCode === 200) {
        const { statusCode, response } = yield controller_1.CategoriesController.deleteCategory(req.body);
        res.status(statusCode).send(response);
    }
    else {
        res.status(401).send('Unauthorized');
    }
}));
exports.categoriesRoutes.post(constant_1.CATEGORIES_ROUTES.modifyCategory, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = yield (0, apiResponses_1.verifyAuthorization)(req);
    if (auth.statusCode === 200) {
        const { statusCode, response } = yield controller_1.CategoriesController.modifyCategory(req.body);
        res.status(statusCode).send(response);
    }
    else {
        res.status(401).send('Unauthorized');
    }
}));
exports.categoriesRoutes.post(constant_1.CATEGORIES_ROUTES.createNewCategory, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = yield (0, apiResponses_1.verifyAuthorization)(req);
    if (auth.statusCode === 200) {
        const { statusCode, response } = yield controller_1.CategoriesController.createNewCategory(req.body);
        res.status(statusCode).send(response);
    }
    else {
        res.status(401).send('Unauthorized');
    }
}));
