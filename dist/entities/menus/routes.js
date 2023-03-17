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
exports.menusRoutes = void 0;
const express_1 = __importDefault(require("express"));
const apiResponses_1 = require("../common/apiResponses");
const constants_1 = require("./constants");
const controller_1 = require("./controller");
exports.menusRoutes = express_1.default.Router();
exports.menusRoutes.get(constants_1.MENUS_ROUTES.getAllMenus, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { statusCode, response, data } = yield controller_1.MenuController.getAllMenus();
    res.status(statusCode).send({ response, data });
}));
//PROTECTED
exports.menusRoutes.post(constants_1.MENUS_ROUTES.createNewMenu, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = yield (0, apiResponses_1.verifyAuthorization)(req);
    if (auth.statusCode === 200) {
        const { statusCode, response } = yield controller_1.MenuController.createNewMenu(req.body);
        res.status(statusCode).send(response);
    }
    else {
        res.status(401).send("Unauthorized");
    }
}));
exports.menusRoutes.post(constants_1.MENUS_ROUTES.modifyMenu, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = yield (0, apiResponses_1.verifyAuthorization)(req);
    if (auth.statusCode === 200) {
        const { statusCode, response } = yield controller_1.MenuController.modifyMenu(req.body);
        res.status(statusCode).send(response);
    }
    else {
        res.status(401).send("Unauthorized");
    }
}));
exports.menusRoutes.post(constants_1.MENUS_ROUTES.deleteMenu, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = yield (0, apiResponses_1.verifyAuthorization)(req);
    if (auth.statusCode === 200) {
        const { statusCode, response } = yield controller_1.MenuController.deleteMenu(req.body);
        res.status(statusCode).send(response);
    }
    else {
        res.status(401).send("Unauthorized");
    }
}));
