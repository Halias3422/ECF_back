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
exports.reservationsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const apiResponses_1 = require("../common/apiResponses");
const constants_1 = require("./constants");
const controller_1 = require("./controller");
exports.reservationsRoutes = express_1.default.Router();
exports.reservationsRoutes.get(constants_1.RESERVATIONS_ROUTES.getAllPartialReservationsByDate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date } = req.query;
    const { statusCode, response, data } = yield controller_1.ReservationsController.getAllPartialReservationsByDate(date);
    res.status(statusCode).send({ response, data });
}));
exports.reservationsRoutes.post(constants_1.RESERVATIONS_ROUTES.createReservation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { reservation, userContext } = req.body;
    const { statusCode, response } = yield controller_1.ReservationsController.createReservation(reservation, userContext);
    res.status(statusCode).send(response);
}));
// PROTECTED
exports.reservationsRoutes.get(constants_1.RESERVATIONS_ROUTES.getUserReservations, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = yield (0, apiResponses_1.verifyUserAuthorization)(req);
    if (auth.statusCode === 200) {
        const { statusCode, response, data } = yield controller_1.ReservationsController.getUserReservations(auth.data[0]);
        res.status(statusCode).send({ response, data });
    }
    else {
        res.status(401).send('Unauthorized');
    }
}));
exports.reservationsRoutes.get(constants_1.RESERVATIONS_ROUTES.getAllReservationsWithAssociatedMail, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = yield (0, apiResponses_1.verifyAuthorization)(req);
    if (auth.statusCode === 200) {
        const { statusCode, response, data } = yield controller_1.ReservationsController.getAllReservationsWithAssociatedMail();
        res.status(statusCode).send({ response, data });
    }
    else {
        res.status(401).send('Unauthorized');
    }
}));
