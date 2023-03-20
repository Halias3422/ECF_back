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
exports.MenuController = void 0;
const apiResponses_1 = require("../common/apiResponses");
const controller_1 = require("../formulas/controller");
const service_queries_1 = require("../formulas/service.queries");
const service_mutations_1 = require("./service.mutations");
const service_queries_2 = require("./service.queries");
class MenuController {
}
exports.MenuController = MenuController;
_a = MenuController;
// QUERIES
MenuController.getAllMenus = () => __awaiter(void 0, void 0, void 0, function* () {
    const retreivedMenus = yield service_queries_2.MenusQueriesService.getAllMenus();
    if (retreivedMenus.statusCode === 200 && retreivedMenus.data) {
        const formattedMenus = yield Promise.all(retreivedMenus.data.map((menu) => __awaiter(void 0, void 0, void 0, function* () {
            let formattedMenu = {
                id: menu.id,
                title: menu.title,
                position: menu.position,
                formulas: [],
            };
            const retreivedFormulas = yield service_queries_1.FormulasQueriesService.getAllFormulasFromMenuId(menu.id);
            if (retreivedFormulas.statusCode === 200 && retreivedFormulas.data) {
                return _a.addFormulasToMenu(formattedMenu, retreivedFormulas.data);
            }
            return retreivedFormulas;
        })));
        return {
            statusCode: retreivedMenus.statusCode,
            data: formattedMenus,
            response: retreivedMenus.response,
        };
    }
    return retreivedMenus;
});
MenuController.getMenuByTitle = (menu) => __awaiter(void 0, void 0, void 0, function* () {
    const isValid = (0, apiResponses_1.verifyFormDataValidity)(menu, ['title', 'formulas']);
    if (isValid.statusCode !== 200) {
        return isValid;
    }
    const retreivedMenu = yield service_queries_2.MenusQueriesService.getMenuByTitle(menu.title);
    return retreivedMenu;
});
MenuController.verifyDuplicateMenuByTitleAndId = (menu) => __awaiter(void 0, void 0, void 0, function* () {
    const isValid = (0, apiResponses_1.verifyFormDataValidity)(menu, ['title', 'formulas']);
    if (isValid.statusCode !== 200) {
        return isValid;
    }
    const retreivedMenu = yield service_queries_2.MenusQueriesService.verifyDuplicateMenuByTitleAndId(menu.title, menu.id);
    return retreivedMenu;
});
// MUTATIONS
MenuController.createNewMenu = (menu) => __awaiter(void 0, void 0, void 0, function* () {
    const isValid = (0, apiResponses_1.verifyFormDataValidity)(menu, ['title', 'formulas']);
    if (isValid.statusCode !== 200) {
        return isValid;
    }
    const isDuplicate = yield _a.getMenuByTitle(menu);
    if (isDuplicate.statusCode === 200) {
        return (0, apiResponses_1.isDuplicateResponse)('create new menu');
    }
    const createdMenu = yield service_mutations_1.MenuMutationsService.createNewMenu(menu);
    if (createdMenu.statusCode !== 200) {
        return createdMenu;
    }
    const retreivedMenu = yield _a.getMenuByTitle(menu);
    if (retreivedMenu.statusCode !== 200) {
        return retreivedMenu;
    }
    for (const formula of menu.formulas) {
        const newFormula = yield controller_1.FormulasController.createNewFormula(formula, retreivedMenu.data[0].id);
        if (newFormula.statusCode !== 200) {
            return newFormula;
        }
    }
    return Object.assign(Object.assign({}, createdMenu), { statusCode: 201 });
});
MenuController.modifyMenu = (menu) => __awaiter(void 0, void 0, void 0, function* () {
    const isValid = (0, apiResponses_1.verifyFormDataValidity)(menu, ['id', 'title', 'formulas']);
    if (isValid.statusCode !== 200) {
        return isValid;
    }
    const isDuplicate = yield _a.verifyDuplicateMenuByTitleAndId(menu);
    if (isDuplicate.statusCode === 200) {
        return (0, apiResponses_1.isDuplicateResponse)('modify menu');
    }
    const modifiedFormulas = yield _a.handleModifiedMenuFormulas(menu);
    if (modifiedFormulas.statusCode !== 200) {
        return modifiedFormulas;
    }
    const modifiedMenu = yield service_mutations_1.MenuMutationsService.modifyMenu(menu);
    return modifiedMenu;
});
MenuController.deleteMenu = (menu) => __awaiter(void 0, void 0, void 0, function* () {
    const isValid = (0, apiResponses_1.verifyFormDataValidity)(menu, ['id', 'title', 'formulas']);
    if (isValid.statusCode !== 200) {
        return isValid;
    }
    for (const formula of menu.formulas) {
        const deletedFormula = yield controller_1.FormulasController.deleteFormula(formula);
        if (deletedFormula.statusCode !== 200) {
            return deletedFormula;
        }
    }
    const deletedMenu = yield service_mutations_1.MenuMutationsService.deleteMenu(menu);
    yield _a.modifyMenusPosition(menu.position);
    return deletedMenu;
});
// PRIVATE
MenuController.addFormulasToMenu = (menu, formulas) => {
    for (const formula of formulas) {
        menu.formulas.push(formula);
    }
    return menu;
};
MenuController.handleModifiedMenuFormulas = (menu) => __awaiter(void 0, void 0, void 0, function* () {
    const retreiveOriginalFormulas = yield service_queries_1.FormulasQueriesService.getAllFormulasFromMenuId(menu.id);
    const originalFormulas = retreiveOriginalFormulas.data;
    const deletedFormulas = originalFormulas.filter((originalFormula) => {
        return !menu.formulas.some((newFormula) => {
            return originalFormula.id === newFormula.id;
        });
    });
    for (const deletedFormula of deletedFormulas) {
        const deletionResponse = yield controller_1.FormulasController.deleteFormula(deletedFormula);
        if (deletionResponse.statusCode !== 200) {
            return deletionResponse;
        }
    }
    for (const modifiedFormula of menu.formulas) {
        if (modifiedFormula.id) {
            const modificationResponse = yield controller_1.FormulasController.modifyFormula(modifiedFormula);
            if (modificationResponse.statusCode !== 200) {
                return modificationResponse;
            }
        }
        else {
            const newFormula = yield controller_1.FormulasController.createNewFormula(modifiedFormula, menu.id);
            if (newFormula.statusCode !== 201) {
                return newFormula;
            }
        }
    }
    return {
        statusCode: 200,
        data: [],
        response: 'formula updated successfully',
    };
});
MenuController.modifyMenusPosition = (position) => __awaiter(void 0, void 0, void 0, function* () {
    return yield service_mutations_1.MenuMutationsService.modifyMenusPosition(position);
});
