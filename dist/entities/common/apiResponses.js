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
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUserAuthorization = exports.verifyAuthorization = exports.verifyFormDataValidity = exports.isDuplicateResponse = exports.databaseMutationError = exports.databaseMutationResponse = exports.databaseQueryError = exports.databaseQueryResponse = void 0;
const controller_1 = require("../admin/controller");
const controller_2 = require("../users/controller");
const databaseQueryResponse = (rows, queryName) => {
    if (rows.length > 0) {
        return {
            statusCode: 200,
            data: rows,
            response: "Query " + queryName + " successfully executed.",
        };
    }
    return {
        statusCode: 400,
        data: [],
        response: "Error: did not find " + queryName + ".",
    };
};
exports.databaseQueryResponse = databaseQueryResponse;
const databaseQueryError = (queryName) => {
    return {
        statusCode: 500,
        data: [],
        response: "Error: could not execute the query " + queryName + ".",
    };
};
exports.databaseQueryError = databaseQueryError;
const databaseMutationResponse = (rows, mutationName) => {
    if (rows.affectedRows > 0) {
        return {
            statusCode: 200,
            response: "Mutation " + mutationName + " successfully executed.",
        };
    }
    return {
        statusCode: 500,
        response: "Error: could not execute the mutation " + mutationName + ".",
    };
};
exports.databaseMutationResponse = databaseMutationResponse;
const databaseMutationError = (mutationName) => {
    return {
        statusCode: 400,
        response: "Error: could not execute the mutation " + mutationName + ".",
    };
};
exports.databaseMutationError = databaseMutationError;
const isDuplicateResponse = (mutationName) => {
    return {
        statusCode: 400,
        response: "Error: could not execute the mutation " +
            mutationName +
            " because duplicate was found in the database.",
    };
};
exports.isDuplicateResponse = isDuplicateResponse;
const verifyFormDataValidity = (formData, formAttributes) => {
    for (const attribute of formAttributes) {
        if (formData[attribute] === undefined) {
            return {
                statusCode: 400,
                response: "Error: wrong data sent. " +
                    attribute +
                    " atttribute is not defined.",
            };
        }
    }
    return {
        statusCode: 200,
        response: "Form data is valid.",
    };
};
exports.verifyFormDataValidity = verifyFormDataValidity;
const verifyAuthorization = (req) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.headers && req.headers.authorization) {
        const auth = req.headers.authorization.split(":");
        if (auth.length === 3) {
            const isAuth = yield controller_1.AdminController.getAuthenticatedProtectedUserFromSession({
                id: auth[0],
                email: auth[1],
                token: auth[2],
            });
            return isAuth;
        }
    }
    return (0, exports.databaseQueryError)("Unauthorized");
});
exports.verifyAuthorization = verifyAuthorization;
const verifyUserAuthorization = (req) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.headers && req.headers.authorization) {
        const auth = req.headers.authorization.split(":");
        if (auth.length === 2) {
            const isAuth = controller_2.UsersController.getAuthenticatedUserFromSession({
                id: auth[0],
                token: auth[1],
            });
            return isAuth;
        }
    }
    return (0, exports.databaseQueryError)("Unauthorized");
});
exports.verifyUserAuthorization = verifyUserAuthorization;
