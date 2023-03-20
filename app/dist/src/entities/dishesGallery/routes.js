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
exports.dishesGalleryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const index_1 = require("../../index");
const apiResponses_1 = require("../common/apiResponses");
const constants_1 = require("./constants");
const controller_1 = require("./controller");
exports.dishesGalleryRoutes = express_1.default.Router();
exports.dishesGalleryRoutes.get(constants_1.DISHES_GALLERY_ROUTES.getAllDishesGallery, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { statusCode, response, data } = yield controller_1.DishesGalleryController.getAllDishesGallery();
    res.status(statusCode).send({ response, data });
}));
exports.dishesGalleryRoutes.get(constants_1.DISHES_GALLERY_ROUTES.verifyIfDuplicateTitleOrImage, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.query) {
        const { title, image, id } = req.query;
        const { statusCode, response } = yield controller_1.DishesGalleryController.verifyIfDuplicateTitleOrImage({
            title: title,
            image: image,
            id: id,
        });
        res.status(statusCode).send(response);
    }
    else {
        res.status(400).send('Wrong data sent');
    }
}));
// PROTECTED
exports.dishesGalleryRoutes.post(constants_1.DISHES_GALLERY_ROUTES.deleteDishGalleryItem, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = yield (0, apiResponses_1.verifyAuthorization)(req);
    if (auth.statusCode === 200) {
        const { statusCode, response } = yield controller_1.DishesGalleryController.deleteDishGalleryItem(req.body);
        res.status(statusCode).send(response);
    }
    else {
        res.status(401).send('Unauthorized');
    }
}));
exports.dishesGalleryRoutes.post(constants_1.DISHES_GALLERY_ROUTES.saveDishGalleryImage, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = yield (0, apiResponses_1.verifyAuthorization)(req);
    if (auth.statusCode === 200) {
        (0, index_1.uploadImage)(req, res, (error) => __awaiter(void 0, void 0, void 0, function* () {
            if (error) {
                return res.status(500).send('Error uploading image: ' + error);
            }
            const { statusCode, response } = yield controller_1.DishesGalleryController.saveDishGalleryImage(req.file);
            return res.status(statusCode).send(response);
        }));
    }
    else {
        res.status(401).send('Unauthorized');
    }
}));
exports.dishesGalleryRoutes.post(constants_1.DISHES_GALLERY_ROUTES.deleteDishGalleryImage, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = yield (0, apiResponses_1.verifyAuthorization)(req);
    if (auth.statusCode === 200) {
        const { statusCode, response } = yield controller_1.DishesGalleryController.deleteDishGalleryImage(req.body);
        res.status(statusCode).send(response);
    }
    else {
        res.status(401).send('Unauthorized');
    }
}));
exports.dishesGalleryRoutes.post(constants_1.DISHES_GALLERY_ROUTES.createNewDishGalleryItem, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = yield (0, apiResponses_1.verifyAuthorization)(req);
    if (auth.statusCode === 200) {
        const { statusCode, response } = yield controller_1.DishesGalleryController.createDishGalleryItem(req.body);
        res.status(statusCode).send(response);
    }
    else {
        res.status(401).send('Unauthorized');
    }
}));
exports.dishesGalleryRoutes.post(constants_1.DISHES_GALLERY_ROUTES.modifyDishGalleryItem, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = yield (0, apiResponses_1.verifyAuthorization)(req);
    if (auth.statusCode === 200) {
        const { statusCode, response } = yield controller_1.DishesGalleryController.modifyDishGalleryItem(req.body);
        res.status(statusCode).send(response);
    }
    else {
        res.status(401).send('Unauthorized');
    }
}));
