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
exports.FormulasQueriesService = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
const __1 = require("../..");
const apiResponses_1 = require("../common/apiResponses");
const constants_1 = require("./constants");
class FormulasQueriesService {
}
exports.FormulasQueriesService = FormulasQueriesService;
_a = FormulasQueriesService;
FormulasQueriesService.getAllFormulasFromMenuId = (menuId) => __awaiter(void 0, void 0, void 0, function* () {
    const query = mysql2_1.default.format(`SELECT * FROM ${constants_1.FORMULAS_TABLE.name} WHERE ${constants_1.FORMULAS_TABLE.name}.${constants_1.FORMULAS_TABLE.columns.menuId} = ?`, [menuId]);
    try {
        const [rows] = yield __1.dbConnexion.execute(query);
        return (0, apiResponses_1.databaseQueryResponse)(rows, 'get all formulas by menu ID');
    }
    catch (error) {
        return (0, apiResponses_1.databaseQueryError)('get all formulas by menu ID');
    }
});
