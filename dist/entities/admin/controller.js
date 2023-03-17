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
exports.AdminController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const apiResponses_1 = require("../common/apiResponses");
const controller_1 = require("../users/controller");
const service_mutations_1 = require("../users/service.mutations");
const service_mutations_2 = require("./service.mutations");
const service_queries_1 = require("./service.queries");
class AdminController {
}
exports.AdminController = AdminController;
_a = AdminController;
AdminController.protectedLogin = (userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const retreivedUser = yield service_queries_1.AdminQueriesService.getProtectedUserByEmail(userInfo.email);
    let needPasswordReset = false;
    if (retreivedUser.statusCode != 200 || !retreivedUser.data) {
        return retreivedUser;
    }
    if (!(yield _a.comparePassword(retreivedUser.data[0].password, userInfo.password))) {
        return (0, apiResponses_1.databaseQueryResponse)([], "user");
    }
    const updatedUser = yield service_mutations_1.UsersMutationsService.updateUserToken(userInfo.email, _a.generateUserSessionToken());
    if (updatedUser.statusCode !== 200) {
        return updatedUser;
    }
    return yield _a.getProtectedUserSessionInfo(userInfo.email, needPasswordReset ? 303 : 200, needPasswordReset ? "password reset needed" : "user logged in");
});
AdminController.getAuthenticatedProtectedUserFromSession = (userSessionInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const isValid = (0, apiResponses_1.verifyFormDataValidity)(userSessionInfo, [
        "id",
        "email",
        "token",
    ]);
    if (isValid.statusCode !== 200) {
        return isValid;
    }
    const retreivedUser = yield service_queries_1.AdminQueriesService.getProtectedUserBySessionToken(userSessionInfo.token);
    if (retreivedUser.statusCode !== 200) {
        return retreivedUser;
    }
    const idIsValid = yield _a.verifyUserSessionItemValidity(userSessionInfo.id, retreivedUser.data[0].id);
    if (!idIsValid) {
        return (0, apiResponses_1.databaseQueryError)("get protected user info");
    }
    const emailIsValid = yield _a.verifyUserSessionItemValidity(userSessionInfo.email, retreivedUser.data[0].email);
    if (!emailIsValid) {
        return (0, apiResponses_1.databaseQueryError)("get protected user info");
    }
    return retreivedUser;
});
AdminController.updateMail = (userInfo, dbUser) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield _a.comparePassword(dbUser.password, userInfo.password))) {
        return {
            statusCode: 400,
            response: "Mot de passe incorrect.",
        };
    }
    const isSecure = controller_1.UsersController.verifyUserSignupConformity(userInfo);
    if (isSecure.statusCode !== 200) {
        return Object.assign(Object.assign({}, isSecure), { response: "Le nouveau mail n'est pas conforme" });
    }
    const modifiedMail = yield service_mutations_2.AdminMutationsService.updateAdminMail(userInfo.email, dbUser.id);
    if (modifiedMail.statusCode !== 200) {
        return {
            statusCode: 400,
            response: "Erreur lors du traitement. Veuillez réessayer plus tard",
        };
    }
    return yield _a.protectedLogin(userInfo);
});
AdminController.updatePassword = (userInfo, dbUser) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield _a.comparePassword(dbUser.password, userInfo.password))) {
        return {
            statusCode: 400,
            response: "Mot de passe incorrect.",
        };
    }
    const isSecure = controller_1.UsersController.verifyUserSignupConformity({
        email: dbUser.email,
        password: userInfo.newPassword,
    });
    if (isSecure.statusCode !== 200) {
        return Object.assign(Object.assign({}, isSecure), { response: "Le nouveau mot de passe n'est pas conforme" });
    }
    const modifiedPassword = yield service_mutations_2.AdminMutationsService.updateAdminPassword(userInfo.newPassword, dbUser.id);
    if (modifiedPassword.statusCode !== 200) {
        return {
            statusCode: 400,
            response: "Erreur lors du traitement. Veuillez réessayer plus tard",
        };
    }
    return modifiedPassword;
});
AdminController.getProtectedUserSessionInfo = (email, statusCode, context) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield service_queries_1.AdminQueriesService.getProtectedUserByEmail(email);
    if ((user.statusCode !== 200 && user.statusCode !== 303) || !user.data) {
        return user;
    }
    try {
        const hashedId = yield bcrypt_1.default.hash(user.data[0].id, 10);
        const hashedMail = yield bcrypt_1.default.hash(user.data[0].email, 10);
        return {
            statusCode: statusCode,
            data: {
                session: `${hashedId}:${hashedMail}:${user.data[0].sessionToken}`,
            },
            response: context + " successfully",
        };
    }
    catch (error) {
        return (0, apiResponses_1.databaseQueryError)("get session info");
    }
});
AdminController.comparePassword = (dbPass, userPass) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const passwordCheck = yield bcrypt_1.default.compare(userPass, dbPass);
        return passwordCheck;
    }
    catch (error) {
        return false;
    }
});
AdminController.verifyUserSessionItemValidity = (sessionItem, userItem) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield bcrypt_1.default.compare(userItem, sessionItem);
    }
    catch (error) {
        return false;
    }
});
AdminController.generateUserSessionToken = () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let token = "";
    for (let i = 0; i < 500; i++) {
        token += chars[Math.floor(Math.random() * chars.length)];
    }
    return token;
};
