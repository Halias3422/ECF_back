"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CATEGORIES_TABLE = exports.CATEGORIES_ROUTES = void 0;
exports.CATEGORIES_ROUTES = {
    createNewCategory: '/api/create-new-category',
    getAllCategories: '/api/get-all-categories',
    deleteCategory: '/api/delete-category',
    modifyCategory: '/api/modify-category',
};
exports.CATEGORIES_TABLE = {
    name: 'Categories',
    columns: {
        id: 'id',
        name: 'name',
    },
};
