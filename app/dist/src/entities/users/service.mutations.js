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
exports.UsersMutationsService = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const constants_1 = require("./constants");
const __1 = require("../..");
const apiResponses_1 = require("../common/apiResponses");
class UsersMutationsService {
}
exports.UsersMutationsService = UsersMutationsService;
_a = UsersMutationsService;
UsersMutationsService.createNewUser = (userInfo, token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hashedPassword = yield bcrypt_1.default.hash(userInfo.password, 10);
        const DEFAULT = {
            toSqlString: function () {
                return 'DEFAULT';
            },
        };
        const mutation = mysql2_1.default.format(`INSERT INTO ${constants_1.USERS_TABLE.name} VALUES (?, ?, ?, ?, ?, ?, ?)`, [DEFAULT, userInfo.email, hashedPassword, 1, null, token, 0]);
        const [rows] = yield __1.dbConnexion.execute(mutation);
        return (0, apiResponses_1.databaseMutationResponse)(rows, 'create new user');
    }
    catch (error) {
        return (0, apiResponses_1.databaseMutationError)('create new user');
    }
});
UsersMutationsService.updateUserOptionalData = (userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mutation = mysql2_1.default.format(`UPDATE ${constants_1.USERS_TABLE.name} SET ${constants_1.USERS_TABLE.columns.defaultGuestNumber} = ?, ${constants_1.USERS_TABLE.columns.defaultAllergies} = ? WHERE ${constants_1.USERS_TABLE.columns.email} = ?`, [userInfo.defaultGuestNumber, userInfo.defaultAllergies, userInfo.email]);
        const [rows] = yield __1.dbConnexion.execute(mutation);
        return (0, apiResponses_1.databaseMutationResponse)(rows, 'update user optional data');
    }
    catch (error) {
        return (0, apiResponses_1.databaseMutationError)('update user optional data');
    }
});
UsersMutationsService.updateUserMail = (newMail, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mutation = mysql2_1.default.format(`UPDATE ${constants_1.USERS_TABLE.name} SET ${constants_1.USERS_TABLE.columns.email} = ? WHERE ${constants_1.USERS_TABLE.columns.id} = ? AND ${constants_1.USERS_TABLE.columns.isAdmin} = 0`, [newMail, userId]);
        const [rows] = yield __1.dbConnexion.execute(mutation);
        return (0, apiResponses_1.databaseMutationResponse)(rows, 'update user mail');
    }
    catch (error) {
        return (0, apiResponses_1.databaseMutationError)('update user mail');
    }
});
UsersMutationsService.updateUserPassword = (newPassword, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newHashedPassword = yield bcrypt_1.default.hash(newPassword, 10);
        const mutation = mysql2_1.default.format(`UPDATE ${constants_1.USERS_TABLE.name} SET ${constants_1.USERS_TABLE.columns.password} = ? WHERE ${constants_1.USERS_TABLE.columns.id} = ? AND ${constants_1.USERS_TABLE.columns.isAdmin} = 0`, [newHashedPassword, userId]);
        const [rows] = yield __1.dbConnexion.execute(mutation);
        return (0, apiResponses_1.databaseMutationResponse)(rows, 'update user password');
    }
    catch (error) {
        return (0, apiResponses_1.databaseMutationError)('update user password');
    }
});
UsersMutationsService.updateUserToken = (userEmail, token) => __awaiter(void 0, void 0, void 0, function* () {
    const mutation = mysql2_1.default.format(`UPDATE ${constants_1.USERS_TABLE.name} SET ${constants_1.USERS_TABLE.columns.sessionToken} = ? WHERE ${constants_1.USERS_TABLE.columns.email} = ?`, [token, userEmail]);
    try {
        const [rows] = yield __1.dbConnexion.execute(mutation);
        return (0, apiResponses_1.databaseMutationResponse)(rows, 'update user session token');
    }
    catch (error) {
        return (0, apiResponses_1.databaseMutationError)('update user session token');
    }
});
