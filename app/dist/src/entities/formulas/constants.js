"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FORMULAS_TABLE = exports.FORMULAS_ROUTES = void 0;
exports.FORMULAS_ROUTES = {
    deleteFormula: "/api/delete-formula",
    modifyFormula: "/api/modify-formula",
    createNewFormula: "/api/create-formula",
};
exports.FORMULAS_TABLE = {
    name: "Formulas",
    columns: {
        id: "id",
        menuId: "menuId",
        title: "title",
        description: "description",
        price: "price",
    },
};
