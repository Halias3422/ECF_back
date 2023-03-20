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
exports.usersRoutes = void 0;
const express_1 = __importDefault(require("express"));
const controller_1 = require("../admin/controller");
const apiResponses_1 = require("../common/apiResponses");
const constants_1 = require("./constants");
const controller_2 = require("./controller");
exports.usersRoutes = express_1.default.Router();
exports.usersRoutes.post(constants_1.USERS_ROUTES.login, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { statusCode, response, data } = yield controller_2.UsersController.login(req.body);
    res.status(statusCode).send(Object.assign({ response }, data));
}));
exports.usersRoutes.post(constants_1.USERS_ROUTES.signup, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { statusCode, response, data } = yield controller_2.UsersController.signup(req.body);
    res.status(statusCode).send(Object.assign({ response }, data));
}));
// PROTECTED
exports.usersRoutes.post(constants_1.USERS_ROUTES.updateOptionalInfo, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = yield (0, apiResponses_1.verifyUserAuthorization)(req);
    if (auth.statusCode === 200) {
        const { statusCode, response, data } = yield controller_2.UsersController.updateOptionalInfo(req.body);
        res.status(statusCode).send({ response, data });
    }
    else {
        res.status(401).send('Unauthorized');
    }
}));
exports.usersRoutes.post(constants_1.USERS_ROUTES.updateMail, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = yield (0, apiResponses_1.verifyUserAuthorization)(req);
    if (auth.statusCode === 200) {
        const { statusCode, response, data } = yield controller_2.UsersController.updateMail(req.body, auth.data[0]);
        res.status(statusCode).send(Object.assign({ response }, data));
        return;
    }
    else {
        const protectedAuth = yield (0, apiResponses_1.verifyAuthorization)(req);
        if (protectedAuth.statusCode === 200) {
            const { statusCode, response, data } = yield controller_1.AdminController.updateMail(req.body, protectedAuth.data[0]);
            res.status(statusCode).send(Object.assign({ response }, data));
            return;
        }
    }
    res.status(401).send('Unauthorized');
}));
exports.usersRoutes.post(constants_1.USERS_ROUTES.updatePassword, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = yield (0, apiResponses_1.verifyUserAuthorization)(req);
    if (auth.statusCode === 200) {
        const { statusCode, response, data } = yield controller_2.UsersController.updatePassword(req.body, auth.data[0]);
        res.status(statusCode).send({ response, data });
        return;
    }
    else {
        const protectedAuth = yield (0, apiResponses_1.verifyAuthorization)(req);
        if (protectedAuth.statusCode === 200) {
            const { statusCode, response, data } = yield controller_1.AdminController.updatePassword(req.body, protectedAuth.data[0]);
            res.status(statusCode).send({ response, data });
            return;
        }
    }
    res.status(401).send('Unauthorized');
}));
exports.usersRoutes.get(constants_1.USERS_ROUTES.getOptionalInfo, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = yield (0, apiResponses_1.verifyUserAuthorization)(req);
    if (auth.statusCode === 200) {
        const { statusCode, response, data } = yield controller_2.UsersController.getUserOptionalInfo(auth.data[0]);
        res.status(statusCode).send({ response, data });
    }
    else {
        res.status(401).send('Unauthorized');
    }
}));
exports.usersRoutes.get(constants_1.USERS_ROUTES.getRole, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.headers && req.headers.authorization) {
        const auth = req.headers.authorization.split(':');
        if (auth.length === 2) {
            const { statusCode, response, data } = yield controller_2.UsersController.getUserRole({
                id: auth[0],
                token: auth[1],
            });
            res.status(statusCode).send({ response, data });
        }
        else if (auth.length === 3) {
            const { statusCode, response } = yield controller_1.AdminController.getAuthenticatedProtectedUserFromSession({
                id: auth[0],
                email: auth[1],
                token: auth[2],
            });
            if (statusCode === 200) {
                res.status(statusCode).send({ response, data: { role: 1 } });
            }
        }
    }
    else {
        res.status(401).send('Unauthorized');
    }
}));
