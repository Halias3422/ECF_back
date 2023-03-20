"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MENUS_TABLE = exports.MENUS_ROUTES = void 0;
exports.MENUS_ROUTES = {
    getAllMenus: '/api/get-all-menus',
    createNewMenu: '/api/create-new-menu',
    deleteMenu: '/api/delete-menu',
    modifyMenu: '/api/modify-menu',
};
exports.MENUS_TABLE = {
    name: 'Menus',
    columns: {
        id: 'id',
        title: 'title',
        position: 'position',
    },
};
