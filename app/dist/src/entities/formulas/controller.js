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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormulasController = void 0;
const apiResponses_1 = require("../common/apiResponses");
const service_mutations_1 = require("./service.mutations");
class FormulasController {
}
exports.FormulasController = FormulasController;
_a = FormulasController;
// MUTATIONS
FormulasController.createNewFormula = (formula, menuId) => __awaiter(void 0, void 0, void 0, function* () {
    const isValid = (0, apiResponses_1.verifyFormDataValidity)(formula, [
        'title',
        'description',
        'price',
    ]);
    if (isValid.statusCode !== 200) {
        return isValid;
    }
    const createdFormula = yield service_mutations_1.FormulasMutationsService.createNewFormula(formula, menuId);
    return createdFormula;
});
FormulasController.deleteFormula = (formula) => __awaiter(void 0, void 0, void 0, function* () {
    const isValid = (0, apiResponses_1.verifyFormDataValidity)(formula, [
        'id',
        'title',
        'description',
        'price',
    ]);
    if (isValid.statusCode !== 200) {
        return isValid;
    }
    const deletedFormula = yield service_mutations_1.FormulasMutationsService.deleteFormulaById(formula.id);
    return deletedFormula;
});
FormulasController.modifyFormula = (formula) => __awaiter(void 0, void 0, void 0, function* () {
    const isValid = (0, apiResponses_1.verifyFormDataValidity)(formula, [
        'id',
        'title',
        'description',
        'price',
    ]);
    if (isValid.statusCode !== 200) {
        return isValid;
    }
    const modifiedFormula = yield service_mutations_1.FormulasMutationsService.modifyFormulaById(formula);
    return modifiedFormula;
});
