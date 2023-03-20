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
exports.DishesQueriesService = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
const __1 = require("../..");
const apiResponses_1 = require("../common/apiResponses");
const constants_1 = require("./constants");
class DishesQueriesService {
}
exports.DishesQueriesService = DishesQueriesService;
_a = DishesQueriesService;
DishesQueriesService.getDishByTitle = (dishTitle) => __awaiter(void 0, void 0, void 0, function* () {
    const query = mysql2_1.default.format(`SELECT * FROM ${constants_1.DISHES_TABLE.name} WHERE ${constants_1.DISHES_TABLE.name}.${constants_1.DISHES_TABLE.columns.title} = ?`, [dishTitle]);
    try {
        const [rows] = yield __1.dbConnexion.execute(query);
        return (0, apiResponses_1.databaseQueryResponse)(rows, 'get dish by title');
    }
    catch (error) {
        return (0, apiResponses_1.databaseQueryError)('get dish by title');
    }
});
DishesQueriesService.getAllDishes = () => __awaiter(void 0, void 0, void 0, function* () {
    const query = `SELECT * FROM ${constants_1.DISHES_TABLE.name} ORDER BY ${constants_1.DISHES_TABLE.columns.position} ASC`;
    try {
        const [rows] = yield __1.dbConnexion.execute(query);
        return (0, apiResponses_1.databaseQueryResponse)(rows, 'get all dishes');
    }
    catch (error) {
        return (0, apiResponses_1.databaseQueryError)('get all dishes');
    }
});
DishesQueriesService.getDishDuplicate = (dish) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let query = mysql2_1.default.format(`SELECT * FROM ${constants_1.DISHES_TABLE.name} WHERE (${constants_1.DISHES_TABLE.columns.image} = ? OR ${constants_1.DISHES_TABLE.columns.title} = ?) `, [dish.image, dish.title]);
        if (dish.id) {
            query += mysql2_1.default.format(` AND ${constants_1.DISHES_TABLE.columns.id} != ?`, [
                dish.id,
            ]);
        }
        const [rows] = yield __1.dbConnexion.execute(query);
        if (rows.length > 0) {
        }
        return (0, apiResponses_1.databaseQueryResponse)(rows, 'get dish by image or title');
    }
    catch (error) {
        return (0, apiResponses_1.databaseQueryError)('get gallery dish by image or title');
    }
});
