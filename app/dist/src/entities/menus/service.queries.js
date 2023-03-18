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
exports.MenusQueriesService = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
const __1 = require("../..");
const apiResponses_1 = require("../common/apiResponses");
const constants_1 = require("./constants");
class MenusQueriesService {
}
exports.MenusQueriesService = MenusQueriesService;
_a = MenusQueriesService;
MenusQueriesService.getAllMenus = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = `SELECT * FROM ${constants_1.MENUS_TABLE.name}`;
        const [rows] = yield __1.dbConnexion.execute(query);
        return (0, apiResponses_1.databaseQueryResponse)(rows, "get all menus");
    }
    catch (error) {
        return (0, apiResponses_1.databaseQueryError)("get all menus");
    }
});
MenusQueriesService.getMenuByTitle = (menuTitle) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = mysql2_1.default.format(`SELECT * FROM ${constants_1.MENUS_TABLE.name} WHERE ${constants_1.MENUS_TABLE.columns.title} = ?`, [menuTitle]);
        const [rows] = yield __1.dbConnexion.execute(query);
        return (0, apiResponses_1.databaseQueryResponse)(rows, "get menu by title");
    }
    catch (error) {
        return (0, apiResponses_1.databaseQueryError)("get menu by title");
    }
});
MenusQueriesService.verifyDuplicateMenuByTitleAndId = (menuTitle, menuId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = mysql2_1.default.format(`SELECT * WHERE ${constants_1.MENUS_TABLE.columns.title} = ? AND ${constants_1.MENUS_TABLE.columns.id} != ?`, [menuTitle, menuId]);
        const [rows] = yield __1.dbConnexion.execute(query);
        return (0, apiResponses_1.databaseQueryResponse)(rows, "verify menu duplicate by title and id");
    }
    catch (error) {
        return (0, apiResponses_1.databaseQueryError)("verify meny duplicate by title and id");
    }
});
