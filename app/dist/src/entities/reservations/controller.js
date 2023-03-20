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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationsController = void 0;
const controller_1 = require("../users/controller");
const service_mutations_1 = require("./service.mutations");
const service_queries_1 = require("./service.queries");
class ReservationsController {
}
exports.ReservationsController = ReservationsController;
_a = ReservationsController;
//QUERIES
ReservationsController.getAllPartialReservationsByDate = (date) => __awaiter(void 0, void 0, void 0, function* () {
    yield _a.deletePassedReservations();
    const response = yield service_queries_1.ReservationsQueriesService.getAllPartialReservationsByDate(date);
    return response;
});
ReservationsController.getUserReservations = (userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    yield _a.deletePassedReservations();
    const response = yield service_queries_1.ReservationsQueriesService.getUserReservations(userInfo.id);
    return response;
});
ReservationsController.getAllReservationsWithAssociatedMail = () => __awaiter(void 0, void 0, void 0, function* () {
    yield _a.deletePassedReservations();
    const response = yield service_queries_1.ReservationsQueriesService.getAllReservationsWithAssociatedMail();
    return response;
});
// MUTATIONS
ReservationsController.createReservation = (reservation, userSession) => __awaiter(void 0, void 0, void 0, function* () {
    let retreivedUser;
    if (userSession) {
        const userSessionInfo = userSession.split(':');
        retreivedUser = yield controller_1.UsersController.getAuthenticatedUserFromSession({
            id: userSessionInfo[0],
            token: userSessionInfo[1],
        });
    }
    const newReservation = yield service_mutations_1.ReservationsMutationsService.createReservation(reservation, (retreivedUser === null || retreivedUser === void 0 ? void 0 : retreivedUser.data[0].id) || null);
    if (newReservation.statusCode === 200) {
        return Object.assign(Object.assign({}, newReservation), { statusCode: 201 });
    }
    return newReservation;
});
// PRIVATE
ReservationsController.deletePassedReservations = () => __awaiter(void 0, void 0, void 0, function* () {
    yield service_mutations_1.ReservationsMutationsService.deletePassedReservations();
});
