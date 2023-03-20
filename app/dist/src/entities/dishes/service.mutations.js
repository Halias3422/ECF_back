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
exports.DishesMutationsService = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
const __1 = require("../..");
const apiResponses_1 = require("../common/apiResponses");
const constants_1 = require("./constants");
class DishesMutationsService {
}
exports.DishesMutationsService = DishesMutationsService;
_a = DishesMutationsService;
DishesMutationsService.createNewDish = (newDish, dishCategoryId) => __awaiter(void 0, void 0, void 0, function* () {
    //necessary to set DEFAULT value for id
    const DEFAULT = {
        toSqlString: function () {
            return 'DEFAULT';
        },
    };
    try {
        const mutation = mysql2_1.default.format(`INSERT INTO ${constants_1.DISHES_TABLE.name} VALUES (?, ?, ?, ?, ?, ?)`, [
            DEFAULT,
            dishCategoryId,
            newDish.image,
            newDish.title,
            newDish.description,
            newDish.price,
        ]);
        const [rows] = yield __1.dbConnexion.execute(mutation);
        return (0, apiResponses_1.databaseMutationResponse)(rows, 'create new dish');
    }
    catch (error) {
        return (0, apiResponses_1.databaseMutationError)('create new dish');
    }
});
DishesMutationsService.modifyDishItemById = (dish, categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mutation = mysql2_1.default.format(`UPDATE ${constants_1.DISHES_TABLE.name} SET ${constants_1.DISHES_TABLE.columns.title} = ?, ${constants_1.DISHES_TABLE.columns.image} = ?, ${constants_1.DISHES_TABLE.columns.description} = ?, ${constants_1.DISHES_TABLE.columns.price} = ?, ${constants_1.DISHES_TABLE.columns.categoryId} = ? WHERE ${constants_1.DISHES_TABLE.columns.id} = ?`, [
            dish.title,
            dish.image,
            dish.description,
            dish.price,
            categoryId,
            dish.id,
        ]);
        const [rows] = yield __1.dbConnexion.execute(mutation);
        return (0, apiResponses_1.databaseMutationResponse)(rows, 'modify dish item');
    }
    catch (error) {
        return (0, apiResponses_1.databaseMutationError)('modify dish item');
    }
});
DishesMutationsService.deleteDishItemById = (dishId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mutation = mysql2_1.default.format(`DELETE FROM ${constants_1.DISHES_TABLE.name} WHERE ${constants_1.DISHES_TABLE.columns.id} = ?`, [dishId]);
        const [rows] = yield __1.dbConnexion.execute(mutation);
        return (0, apiResponses_1.databaseMutationResponse)(rows, 'delete dish by ID');
    }
    catch (error) {
        return (0, apiResponses_1.databaseMutationError)('delete dish by ID');
    }
});
