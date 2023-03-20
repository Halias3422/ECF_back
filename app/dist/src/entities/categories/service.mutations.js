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
exports.CategoriesMutationsService = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
const __1 = require("../..");
const apiResponses_1 = require("../common/apiResponses");
const constant_1 = require("./constant");
const service_queries_1 = require("./service.queries");
class CategoriesMutationsService {
}
exports.CategoriesMutationsService = CategoriesMutationsService;
_a = CategoriesMutationsService;
CategoriesMutationsService.createNewCategory = (newCategory) => __awaiter(void 0, void 0, void 0, function* () {
    const DEFAULT = {
        toSqlString: function () {
            return 'DEFAULT';
        },
    };
    const query = yield service_queries_1.CategoriesQueriesService.getAllCategories();
    const mutation = mysql2_1.default.format(`INSERT INTO ${constant_1.CATEGORIES_TABLE.name} VALUES (?, ?, ?)`, [
        DEFAULT,
        newCategory.name,
        query.data && query.data.length > 0
            ? query.data[query.data.length - 1].position + 1
            : 0,
    ]);
    try {
        const [rows] = yield __1.dbConnexion.execute(mutation);
        return (0, apiResponses_1.databaseMutationResponse)(rows, 'create new category');
    }
    catch (error) {
        return (0, apiResponses_1.databaseMutationError)('create new category');
    }
});
CategoriesMutationsService.deleteCategoryById = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mutation = mysql2_1.default.format(`DELETE FROM ${constant_1.CATEGORIES_TABLE.name} WHERE ${constant_1.CATEGORIES_TABLE.columns.id} = ?`, [categoryId]);
        const [rows] = yield __1.dbConnexion.execute(mutation);
        return (0, apiResponses_1.databaseMutationResponse)(rows, 'delete category by ID');
    }
    catch (error) {
        return (0, apiResponses_1.databaseMutationError)('delete category by ID');
    }
});
CategoriesMutationsService.modifyCategoriesPosition = (position) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mutation = mysql2_1.default.format(`UPDATE ${constant_1.CATEGORIES_TABLE.name} SET ${constant_1.CATEGORIES_TABLE.columns.position} = ${constant_1.CATEGORIES_TABLE.columns.position} - 1 WHERE ${constant_1.CATEGORIES_TABLE.columns.position} > ?`, [position]);
        const [rows] = yield __1.dbConnexion.execute(mutation);
        return (0, apiResponses_1.databaseMutationResponse)(rows, 'modify categories position');
    }
    catch (error) {
        return (0, apiResponses_1.databaseMutationError)('modify categories position');
    }
});
CategoriesMutationsService.modifyCategoryById = (category) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mutation = mysql2_1.default.format(`UPDATE ${constant_1.CATEGORIES_TABLE.name} SET ${constant_1.CATEGORIES_TABLE.columns.name} = ?, ${constant_1.CATEGORIES_TABLE.columns.position} = ? WHERE ${constant_1.CATEGORIES_TABLE.columns.id} = ?`, [category.name, category.position, category.id]);
        const [rows] = yield __1.dbConnexion.execute(mutation);
        return (0, apiResponses_1.databaseMutationResponse)(rows, 'delete category by ID');
    }
    catch (error) {
        return (0, apiResponses_1.databaseMutationError)('delete category by ID');
    }
});
