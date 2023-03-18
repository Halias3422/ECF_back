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
exports.UsersController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const controller_1 = require("../admin/controller");
const apiResponses_1 = require("../common/apiResponses");
const service_mutations_1 = require("./service.mutations");
const service_queries_1 = require("./service.queries");
class UsersController {
}
exports.UsersController = UsersController;
_a = UsersController;
// MUTATIONS
UsersController.signup = (userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const isValid = (0, apiResponses_1.verifyFormDataValidity)(userInfo, ["email", "password"]);
    if (isValid.statusCode !== 200) {
        return isValid;
    }
    const isSecure = _a.verifyUserSignupConformity(userInfo);
    if (isSecure.statusCode !== 200) {
        return isSecure;
    }
    const isDuplicate = yield service_queries_1.UsersQueriesService.getUserByEmail(userInfo.email);
    if (isDuplicate.statusCode === 200) {
        return (0, apiResponses_1.isDuplicateResponse)("signup");
    }
    const response = yield service_mutations_1.UsersMutationsService.createNewUser(userInfo, _a.generateUserSessionToken());
    if (response.statusCode !== 200) {
        return response;
    }
    return yield _a.getUserSessionInfo(userInfo.email, 201, "user created");
});
UsersController.updateOptionalInfo = (userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const isValid = (0, apiResponses_1.verifyFormDataValidity)(userInfo, ["email"]);
    if (isValid.statusCode !== 200) {
        return isValid;
    }
    const isRegistered = yield service_queries_1.UsersQueriesService.getUserByEmail(userInfo.email);
    if (isRegistered.statusCode !== 200) {
        return isRegistered;
    }
    const response = yield service_mutations_1.UsersMutationsService.updateUserOptionalData(userInfo);
    return response;
});
UsersController.updateMail = (userInfo, dbUser) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield _a.comparePassword(dbUser.password, userInfo.password))) {
        return {
            statusCode: 400,
            response: "Mot de passe incorrect.",
        };
    }
    const isSecure = _a.verifyUserSignupConformity(userInfo);
    if (isSecure.statusCode !== 200) {
        return Object.assign(Object.assign({}, isSecure), { response: "Le nouveau mail n'est pas conforme" });
    }
    const modifiedMail = yield service_mutations_1.UsersMutationsService.updateUserMail(userInfo.email, dbUser.id);
    if (modifiedMail.statusCode !== 200) {
        return {
            statusCode: 400,
            response: "Erreur lors du traitement. Veuillez réessayer plus tard",
        };
    }
    return yield _a.login(userInfo);
});
UsersController.updatePassword = (userInfo, dbUser) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield _a.comparePassword(dbUser.password, userInfo.password))) {
        return {
            statusCode: 400,
            response: "Mot de passe incorrect.",
        };
    }
    const isSecure = _a.verifyUserSignupConformity({
        email: dbUser.email,
        password: userInfo.newPassword,
    });
    if (isSecure.statusCode !== 200) {
        return Object.assign(Object.assign({}, isSecure), { response: "Le nouveau mot de passe n'est pas conforme" });
    }
    const modifiedPassword = yield service_mutations_1.UsersMutationsService.updateUserPassword(userInfo.newPassword, dbUser.id);
    if (modifiedPassword.statusCode !== 200) {
        return {
            statusCode: 400,
            response: "Erreur lors du traitement. Veuillez réessayer plus tard",
        };
    }
    return modifiedPassword;
});
UsersController.login = (userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const retreivedUser = yield service_queries_1.UsersQueriesService.getUserByEmail(userInfo.email);
    if (retreivedUser.statusCode != 200 || !retreivedUser.data) {
        return retreivedUser;
    }
    if (retreivedUser.data[0].isAdmin === 1) {
        return yield controller_1.AdminController.protectedLogin(userInfo);
    }
    if (!(yield _a.comparePassword(retreivedUser.data[0].password, userInfo.password))) {
        return (0, apiResponses_1.databaseQueryResponse)([], "user");
    }
    const updatedUser = yield service_mutations_1.UsersMutationsService.updateUserToken(userInfo.email, _a.generateUserSessionToken());
    if (updatedUser.statusCode !== 200) {
        return updatedUser;
    }
    return yield _a.getUserSessionInfo(userInfo.email, 200, "user logged in");
});
// QUERIES
UsersController.getUserOptionalInfo = (authentifiedUser) => __awaiter(void 0, void 0, void 0, function* () {
    return {
        statusCode: 200,
        data: {
            email: authentifiedUser.email,
            defaultGuestNumber: authentifiedUser.defaultGuestNumber,
            defaultAllergies: authentifiedUser.defaultAllergies,
        },
        response: "user data found successfully",
    };
});
UsersController.getUserRole = (userSessionInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const retreivedUser = yield _a.getAuthenticatedUserFromSession(userSessionInfo);
    if (retreivedUser.statusCode !== 200) {
        return retreivedUser;
    }
    return {
        statusCode: 200,
        data: {
            role: retreivedUser.data[0].isAdmin,
        },
        response: "user role found successfully",
    };
});
UsersController.getAuthenticatedUserFromSession = (userSessionInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const isValid = (0, apiResponses_1.verifyFormDataValidity)(userSessionInfo, ["id", "token"]);
    if (isValid.statusCode !== 200) {
        return isValid;
    }
    const retreivedUser = yield service_queries_1.UsersQueriesService.getUserBySessionToken(userSessionInfo.token);
    if (retreivedUser.statusCode !== 200) {
        return retreivedUser;
    }
    const sessionInfoIsValid = yield _a.verifyUserSessionInfoValidity(userSessionInfo, retreivedUser.data[0]);
    if (!sessionInfoIsValid) {
        return (0, apiResponses_1.databaseQueryError)("get user info");
    }
    return retreivedUser;
});
// PRIVATE
UsersController.getUserSessionInfo = (email, statusCode, context) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield service_queries_1.UsersQueriesService.getUserByEmail(email);
    if (user.statusCode !== 200 || !user.data) {
        return user;
    }
    const hashedId = yield bcrypt_1.default.hash(user.data[0].id, 10);
    return {
        statusCode: statusCode,
        data: { session: `${hashedId}:${user.data[0].sessionToken}` },
        response: context + " successfully",
    };
});
UsersController.verifyUserSessionInfoValidity = (sessionItem, userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = yield bcrypt_1.default.compare(userInfo.id, sessionItem.id);
        if (id && sessionItem.token === userInfo.sessionToken) {
            return true;
        }
    }
    catch (error) {
        return false;
    }
    return false;
});
UsersController.comparePassword = (dbPass, userPass) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const passwordCheck = yield bcrypt_1.default.compare(userPass, dbPass);
        return passwordCheck;
    }
    catch (error) {
        return false;
    }
});
/*
  mail regex :
^ -> beginning of string
  [\w-\.]+ ->  (matches any word (a-zA-Z0-9_), '-', '.') multiple times
@ -> matches @
([\w-]+\.)+ -> ((matches any word char or '-' multiple times) matches '.') multiple times
[\w-]{2,4} -> (matches any word char or '-') between 2 to 4 times
$ -> matches end of string

password regex :
  ^ -> beginning of string
  (?=.*[]) -> matches a group without including in result
  [a-zA-Z] -> matches any letter
  [0-9] -> matches any number
  [!@#\$%\^&\*] -> matches any of those special characters

*/
UsersController.verifyUserSignupConformity = (userInfo) => {
    if (userInfo.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
        if (userInfo.password.length > 7 &&
            userInfo.password.length < 100 &&
            userInfo.password.match(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/)) {
            return {
                statusCode: 200,
                response: "user info are conform",
            };
        }
    }
    return {
        statusCode: 400,
        response: "email or password is not conform",
    };
};
UsersController.generateUserSessionToken = () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let token = "";
    for (let i = 0; i < 500; i++) {
        token += chars[Math.floor(Math.random() * chars.length)];
    }
    return token;
};
