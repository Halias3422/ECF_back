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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationsMutationsService = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
const __1 = require("../..");
const apiResponses_1 = require("../common/apiResponses");
const constants_1 = require("./constants");
class ReservationsMutationsService {
}
exports.ReservationsMutationsService = ReservationsMutationsService;
_a = ReservationsMutationsService;
ReservationsMutationsService.createReservation = (reservation, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const DEFAULT = {
            toSqlString: function () {
                return "DEFAULT";
            },
        };
        const mutation = mysql2_1.default.format(`INSERT INTO ${constants_1.RESERVATIONS_TABLE.name} VALUES (?, ?, ?, ?, ?, ?, ?)`, [
            DEFAULT,
            reservation.guestNumber,
            reservation.date,
            reservation.hour,
            reservation.service,
            reservation.allergies,
            userId || null,
        ]);
        const [rows] = yield __1.dbConnexion.execute(mutation);
        return (0, apiResponses_1.databaseMutationResponse)(rows, "create new reservation");
    }
    catch (error) {
        return (0, apiResponses_1.databaseMutationError)("create new reservation");
    }
});
