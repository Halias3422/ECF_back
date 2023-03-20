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
exports.FormulasMutationsService = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
const __1 = require("../..");
const apiResponses_1 = require("../common/apiResponses");
const constants_1 = require("./constants");
const service_queries_1 = require("./service.queries");
class FormulasMutationsService {
}
exports.FormulasMutationsService = FormulasMutationsService;
_a = FormulasMutationsService;
FormulasMutationsService.createNewFormula = (formula, menuId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const DEFAULT = {
            toSqlString: function () {
                return 'DEFAULT';
            },
        };
        const query = yield service_queries_1.FormulasQueriesService.getAllFormulasFromMenuId(menuId);
        const mutation = mysql2_1.default.format(`INSERT INTO ${constants_1.FORMULAS_TABLE.name} VALUES (?, ?, ?, ?, ?, ?)`, [
            DEFAULT,
            menuId,
            formula.title,
            formula.description,
            formula.price,
            query.data
                ? query.data.length > 0
                    ? query.data[query.data.length - 1].position + 1
                    : 1
                : 0,
        ]);
        const [rows] = yield __1.dbConnexion.execute(mutation);
        return (0, apiResponses_1.databaseMutationResponse)(rows, 'create formula');
    }
    catch (error) {
        return (0, apiResponses_1.databaseMutationError)('create formula');
    }
});
FormulasMutationsService.deleteFormulaById = (formulaId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mutation = mysql2_1.default.format(`DELETE FROM ${constants_1.FORMULAS_TABLE.name} WHERE ${constants_1.FORMULAS_TABLE.columns.id} = ?`, [formulaId]);
        const [rows] = yield __1.dbConnexion.execute(mutation);
        return (0, apiResponses_1.databaseMutationResponse)(rows, 'delete formula by ID');
    }
    catch (error) {
        return (0, apiResponses_1.databaseMutationError)('delete formula by ID');
    }
});
FormulasMutationsService.modifyFormulaById = (formula) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mutation = mysql2_1.default.format(`UPDATE ${constants_1.FORMULAS_TABLE.name} SET ${constants_1.FORMULAS_TABLE.columns.title} = ?, ${constants_1.FORMULAS_TABLE.columns.description} = ?, ${constants_1.FORMULAS_TABLE.columns.price} = ?, ${constants_1.FORMULAS_TABLE.columns.position} = ? WHERE ${constants_1.FORMULAS_TABLE.columns.id} = ?`, [
            formula.title,
            formula.description,
            formula.price,
            formula.position,
            formula.id,
        ]);
        const [rows] = yield __1.dbConnexion.execute(mutation);
        return (0, apiResponses_1.databaseMutationResponse)(rows, 'modify formula by ID');
    }
    catch (error) {
        return (0, apiResponses_1.databaseMutationError)('modify formula by ID');
    }
});
