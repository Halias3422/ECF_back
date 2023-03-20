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
exports.ReservationsQueriesService = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
const __1 = require("../..");
const apiResponses_1 = require("../common/apiResponses");
const constants_1 = require("../users/constants");
const constants_2 = require("./constants");
class ReservationsQueriesService {
}
exports.ReservationsQueriesService = ReservationsQueriesService;
_a = ReservationsQueriesService;
ReservationsQueriesService.getAllPartialReservationsByDate = (date) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = mysql2_1.default.format(`SELECT * FROM ${constants_2.RESERVATIONS_TABLE.name} WHERE ${constants_2.RESERVATIONS_TABLE.columns.date} = ?`, [date]);
        const [rows] = yield __1.dbConnexion.execute(query);
        if (rows.length === 0) {
            return {
                statusCode: 200,
                response: 'No reservation scheduled on that day',
                data: [],
            };
        }
        return (0, apiResponses_1.databaseQueryResponse)(rows, 'get partial reservation info by day');
    }
    catch (error) {
        return (0, apiResponses_1.databaseQueryError)('get partial reservation info by day');
    }
});
ReservationsQueriesService.getUserReservations = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = mysql2_1.default.format(`SELECT * FROM ${constants_2.RESERVATIONS_TABLE.name} WHERE ${constants_2.RESERVATIONS_TABLE.columns.userId} = ?`, [userId]);
        const [rows] = yield __1.dbConnexion.execute(query);
        return (0, apiResponses_1.databaseQueryResponse)(rows, 'get user reservations');
    }
    catch (error) {
        return (0, apiResponses_1.databaseQueryError)('get user reservations');
    }
});
ReservationsQueriesService.getAllReservationsWithAssociatedMail = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = `SELECT ${constants_2.RESERVATIONS_TABLE.name}.*, ${constants_1.USERS_TABLE.name}.${constants_1.USERS_TABLE.columns.email} as userMail FROM ${constants_2.RESERVATIONS_TABLE.name} LEFT JOIN ${constants_1.USERS_TABLE.name} ON ${constants_2.RESERVATIONS_TABLE.name}.${constants_2.RESERVATIONS_TABLE.columns.userId} = ${constants_1.USERS_TABLE.name}.${constants_1.USERS_TABLE.columns.id}`;
        const [rows] = yield __1.dbConnexion.execute(query);
        if (rows.length === 0) {
            return {
                statusCode: 200,
                data: [],
                response: 'No reservations found',
            };
        }
        return (0, apiResponses_1.databaseQueryResponse)(rows, 'get all reservations with associated user mail');
    }
    catch (error) {
        return (0, apiResponses_1.databaseQueryError)('get all reservations with associated user mail ');
    }
});
