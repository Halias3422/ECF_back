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
exports.CategoriesQueriesService = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
const __1 = require("../..");
const apiResponses_1 = require("../common/apiResponses");
const constant_1 = require("./constant");
class CategoriesQueriesService {
}
exports.CategoriesQueriesService = CategoriesQueriesService;
_a = CategoriesQueriesService;
CategoriesQueriesService.getCategoryById = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = mysql2_1.default.format(`SELECT * FROM ${constant_1.CATEGORIES_TABLE.name} WHERE ${constant_1.CATEGORIES_TABLE.columns.id} = ?`, [categoryId]);
        const [rows] = yield __1.dbConnexion.execute(query);
        return (0, apiResponses_1.databaseQueryResponse)(rows, 'category by ID');
    }
    catch (error) {
        return (0, apiResponses_1.databaseQueryError)('get category by ID');
    }
});
CategoriesQueriesService.getCategoryByName = (categoryName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = mysql2_1.default.format(`SELECT * FROM ${constant_1.CATEGORIES_TABLE.name} WHERE ${constant_1.CATEGORIES_TABLE.columns.name} = ?`, [categoryName]);
        const [rows] = yield __1.dbConnexion.execute(query);
        return (0, apiResponses_1.databaseQueryResponse)(rows, 'category by name');
    }
    catch (error) {
        return (0, apiResponses_1.databaseQueryError)('category by name');
    }
});
CategoriesQueriesService.getAllCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = `SELECT * FROM ${constant_1.CATEGORIES_TABLE.name} ORDER BY ${constant_1.CATEGORIES_TABLE.columns.position} ASC`;
        const [rows] = yield __1.dbConnexion.execute(query);
        return (0, apiResponses_1.databaseQueryResponse)(rows, 'get all categories');
    }
    catch (error) {
        return (0, apiResponses_1.databaseQueryError)('get all categories');
    }
});
