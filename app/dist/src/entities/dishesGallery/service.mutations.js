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
exports.DishesGalleryMutationsService = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
const __1 = require("../..");
const apiResponses_1 = require("../common/apiResponses");
const constants_1 = require("./constants");
class DishesGalleryMutationsService {
}
exports.DishesGalleryMutationsService = DishesGalleryMutationsService;
_a = DishesGalleryMutationsService;
DishesGalleryMutationsService.createDishGalleryItem = (dish) => __awaiter(void 0, void 0, void 0, function* () {
    const DEFAULT = {
        toSqlString: function () {
            return "DEFAULT";
        },
    };
    try {
        const mutation = mysql2_1.default.format(`INSERT INTO ${constants_1.DISHES_GALLERY_TABLE.name} VALUES (?, ?, ?)`, [DEFAULT, dish.title, dish.image]);
        const [rows] = yield __1.dbConnexion.execute(mutation);
        return (0, apiResponses_1.databaseMutationResponse)(rows, "create gallery dish item");
    }
    catch (error) {
        return (0, apiResponses_1.databaseMutationError)("create gallery dish item");
    }
});
DishesGalleryMutationsService.modifyDishGalleryItemById = (dish) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mutation = mysql2_1.default.format(`UPDATE ${constants_1.DISHES_GALLERY_TABLE.name} SET ${constants_1.DISHES_GALLERY_TABLE.columns.title} = ?, ${constants_1.DISHES_GALLERY_TABLE.columns.image} = ? WHERE ${constants_1.DISHES_GALLERY_TABLE.columns.id} = ?`, [dish.title, dish.image, dish.id]);
        const [rows] = yield __1.dbConnexion.execute(mutation);
        return (0, apiResponses_1.databaseMutationResponse)(rows, "modify gallery dish item");
    }
    catch (error) {
        return (0, apiResponses_1.databaseMutationError)("modify gallery dish item");
    }
});
DishesGalleryMutationsService.deleteDishGalleryItemById = (dishId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mutation = mysql2_1.default.format(`DELETE FROM ${constants_1.DISHES_GALLERY_TABLE.name} WHERE ${constants_1.DISHES_GALLERY_TABLE.columns.id} = ?`, [dishId]);
        const [rows] = yield __1.dbConnexion.execute(mutation);
        return (0, apiResponses_1.databaseMutationResponse)(rows, "delete gallery dish item");
    }
    catch (error) {
        return (0, apiResponses_1.databaseMutationError)("delete gallery dish item");
    }
});