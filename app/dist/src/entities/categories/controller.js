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
exports.CategoriesController = void 0;
const apiResponses_1 = require("../common/apiResponses");
const service_mutations_1 = require("./service.mutations");
const service_queries_1 = require("./service.queries");
class CategoriesController {
}
exports.CategoriesController = CategoriesController;
_a = CategoriesController;
// MUTATIONS
CategoriesController.createNewCategory = (newCategory) => __awaiter(void 0, void 0, void 0, function* () {
    const isValid = (0, apiResponses_1.verifyFormDataValidity)(newCategory, ['name']);
    if (isValid.statusCode !== 200) {
        return isValid;
    }
    const isDuplicate = yield service_queries_1.CategoriesQueriesService.getCategoryByName(newCategory.name);
    if (isDuplicate.statusCode === 200) {
        return (0, apiResponses_1.isDuplicateResponse)('create new category');
    }
    const response = yield service_mutations_1.CategoriesMutationsService.createNewCategory(newCategory);
    if (response.statusCode !== 200) {
        return response;
    }
    return Object.assign(Object.assign({}, response), { statusCode: 201 });
});
CategoriesController.deleteCategory = (category) => __awaiter(void 0, void 0, void 0, function* () {
    const isValid = (0, apiResponses_1.verifyFormDataValidity)(category, ['id', 'name']);
    if (isValid.statusCode !== 200) {
        return isValid;
    }
    const response = yield service_mutations_1.CategoriesMutationsService.deleteCategoryById(category.id);
    yield _a.modifyCategoriesPosition(category.position);
    return response;
});
CategoriesController.modifyCategory = (category) => __awaiter(void 0, void 0, void 0, function* () {
    const isValid = (0, apiResponses_1.verifyFormDataValidity)(category, ['id', 'name']);
    if (isValid.statusCode !== 200) {
        return isValid;
    }
    const isDuplicate = yield _a.getCategoryByName(category.name);
    if (isDuplicate.statusCode === 200 &&
        isDuplicate.data[0].id !== category.id) {
        return (0, apiResponses_1.isDuplicateResponse)('modify category');
    }
    const response = yield service_mutations_1.CategoriesMutationsService.modifyCategoryById(category);
    return response;
});
// QUERIES
CategoriesController.getCategoryByName = (categoryName) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield service_queries_1.CategoriesQueriesService.getCategoryByName(categoryName);
    return response;
});
CategoriesController.getAllCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield service_queries_1.CategoriesQueriesService.getAllCategories();
    response.data = _a.formatCategoriesResponse(response.data);
    return response;
});
CategoriesController.formatCategoriesResponse = (categories) => {
    const formattedCategories = [];
    for (const category of categories) {
        formattedCategories.push({
            id: category.id,
            name: category.name,
            position: category.position,
        });
    }
    return formattedCategories;
};
CategoriesController.modifyCategoriesPosition = (position) => __awaiter(void 0, void 0, void 0, function* () {
    return yield service_mutations_1.CategoriesMutationsService.modifyCategoriesPosition(position);
});
