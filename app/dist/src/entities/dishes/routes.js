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
exports.dishesRoutes = void 0;
const express_1 = __importDefault(require("express"));
const index_1 = require("../../index");
const apiResponses_1 = require("../common/apiResponses");
const constants_1 = require("./constants");
const controller_1 = require("./controller");
exports.dishesRoutes = express_1.default.Router();
exports.dishesRoutes.get(constants_1.DISHES_ROUTES.getAllDishesByCategories, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { statusCode, data, response } = yield controller_1.DishesController.getAllDishesByCategories();
    res.status(statusCode).send({ response, data });
}));
exports.dishesRoutes.get(constants_1.DISHES_ROUTES.verifyIfDuplicateTitleOrImage, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.query) {
        const { title, image, id, description, price, category } = req.query;
        const { statusCode, response } = yield controller_1.DishesController.verifyIfDuplicateTitleOrImage({
            title: title,
            image: image,
            id: id,
            description: description,
            price: price,
            category: category,
        });
        res.status(statusCode).send(response);
    }
    else {
        res.status(400).send('Wrong data sent');
    }
}));
// PROTECTED
exports.dishesRoutes.post(constants_1.DISHES_ROUTES.createNewDish, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = yield (0, apiResponses_1.verifyAuthorization)(req);
    if (auth.statusCode === 200) {
        const { statusCode, response } = yield controller_1.DishesController.createNewDish(req.body);
        res.status(statusCode).send(response);
    }
    else {
        res.status(401).send('Unauthorized');
    }
}));
exports.dishesRoutes.post(constants_1.DISHES_ROUTES.deleteDishItem, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = yield (0, apiResponses_1.verifyAuthorization)(req);
    if (auth.statusCode === 200) {
        const { statusCode, response } = yield controller_1.DishesController.deleteDishItem(req.body);
        res.status(statusCode).send(response);
    }
    else {
        res.status(401).send('Unauthorized');
    }
}));
exports.dishesRoutes.post(constants_1.DISHES_ROUTES.saveDishImage, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = yield (0, apiResponses_1.verifyAuthorization)(req);
    if (auth.statusCode === 200) {
        (0, index_1.uploadImage)(req, res, (error) => __awaiter(void 0, void 0, void 0, function* () {
            if (error) {
                return res.status(500).send('Error uploading image: ' + error);
            }
            const { statusCode, response } = yield controller_1.DishesController.saveDishImage(req.file);
            return res.status(statusCode).send(response);
        }));
    }
    else {
        res.status(401).send('Unauthorized');
    }
}));
exports.dishesRoutes.post(constants_1.DISHES_ROUTES.deleteDishImage, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = yield (0, apiResponses_1.verifyAuthorization)(req);
    if (auth.statusCode === 200) {
        const { statusCode, response } = yield controller_1.DishesController.deleteDishImage(req.body);
        res.status(statusCode).send(response);
    }
    else {
        res.status(401).send('Unauthorized');
    }
}));
exports.dishesRoutes.post(constants_1.DISHES_ROUTES.modifyDishItem, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = yield (0, apiResponses_1.verifyAuthorization)(req);
    if (auth.statusCode === 200) {
        const { statusCode, response } = yield controller_1.DishesController.modifyDishItem(req.body);
        res.status(statusCode).send(response);
    }
    else {
        res.status(401).send('Unauthorized');
    }
}));
