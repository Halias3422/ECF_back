"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DISHES_TABLE = exports.DISHES_ROUTES = void 0;
exports.DISHES_ROUTES = {
    createNewDish: "/api/create-new-dish",
    getAllDishesByCategories: "/api/get-all-dishes-by-categories",
    deleteDishItem: "/api/delete-dish",
    deleteImage: "/api/delete-dish-image",
    verifyIfDuplicateTitleOrImage: "/api/dish-verify-duplicate-title-or-image",
    saveDishImage: "/api/save-dish-image",
    modifyDishItem: "/api/modify-dish-item",
};
exports.DISHES_TABLE = {
    name: "Dishes",
    columns: {
        id: "id",
        categoryId: "categoryId",
        title: "title",
        image: "image",
        description: "description",
        price: "price",
    },
};
