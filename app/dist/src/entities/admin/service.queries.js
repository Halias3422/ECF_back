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
exports.AdminQueriesService = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
const __1 = require("../..");
const apiResponses_1 = require("../common/apiResponses");
const constants_1 = require("../users/constants");
class AdminQueriesService {
}
exports.AdminQueriesService = AdminQueriesService;
_a = AdminQueriesService;
AdminQueriesService.getProtectedUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = mysql2_1.default.format(`SELECT * FROM ${constants_1.USERS_TABLE.name} WHERE ${constants_1.USERS_TABLE.columns.email} = ?`, [email]);
        const [rows] = yield __1.dbConnexion.execute(query);
        return (0, apiResponses_1.databaseQueryResponse)(rows, 'user');
    }
    catch (error) {
        return (0, apiResponses_1.databaseQueryError)('get user');
    }
});
AdminQueriesService.getProtectedUserBySessionToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = mysql2_1.default.format(`SELECT * FROM ${constants_1.USERS_TABLE.name} WHERE ${constants_1.USERS_TABLE.columns.sessionToken} = ?`, [token]);
        const [rows] = yield __1.dbConnexion.execute(query);
        return (0, apiResponses_1.databaseQueryResponse)(rows, 'protected user');
    }
    catch (error) {
        return (0, apiResponses_1.databaseQueryError)('get protected user');
    }
});
