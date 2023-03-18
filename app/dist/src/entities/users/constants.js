"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USERS_TABLE = exports.USERS_ROUTES = void 0;
exports.USERS_ROUTES = {
    login: "/api/user-login",
    signup: "/api/user-signup",
    updateOptionalInfo: "/api/user-update-optional-info",
    getOptionalInfo: "/api/user-get-optional-info",
    getRole: "/api/user-get-role",
    updateMail: "/api/user-update-mail",
    updatePassword: "/api/user-update-password",
};
exports.USERS_TABLE = {
    name: "Users",
    columns: {
        id: "id",
        email: "email",
        password: "password",
        defaultGuestNumber: "defaultGuestNumber",
        defaultAllergies: "defaultAllergies",
        sessionToken: "sessionToken",
        isAdmin: "isAdmin",
    },
};
