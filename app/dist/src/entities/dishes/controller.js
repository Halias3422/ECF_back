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
exports.DishesController = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const fs_1 = require("fs");
const __1 = require("../..");
const controller_1 = require("../categories/controller");
const service_queries_1 = require("../categories/service.queries");
const apiResponses_1 = require("../common/apiResponses");
const service_mutations_1 = require("./service.mutations");
const service_queries_2 = require("./service.queries");
class DishesController {
}
exports.DishesController = DishesController;
_a = DishesController;
// MUTATIONS
DishesController.createNewDish = (dish) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    const isValid = _a.verifyDishFormDataValidity(dish);
    if (isValid.statusCode !== 200) {
        return isValid;
    }
    if ((yield service_queries_2.DishesQueriesService.getDishDuplicate(dish)).statusCode === 200) {
        return (0, apiResponses_1.isDuplicateResponse)('create new dish');
    }
    const dishCategory = yield service_queries_1.CategoriesQueriesService.getCategoryByName(dish.category);
    if (dishCategory.statusCode !== 200 || ((_b = dishCategory.data) === null || _b === void 0 ? void 0 : _b.length) === 0) {
        return dishCategory;
    }
    const response = yield service_mutations_1.DishesMutationsService.createNewDish(dish, (_c = dishCategory.data) === null || _c === void 0 ? void 0 : _c[0].id);
    if (response.statusCode !== 200) {
        return response;
    }
    return Object.assign(Object.assign({}, response), { statusCode: 201 });
});
DishesController.deleteDishItem = (dish) => __awaiter(void 0, void 0, void 0, function* () {
    const isValid = _a.verifyDishFormDataValidity(dish);
    if (!dish.id || isValid.statusCode !== 200) {
        return { statusCode: 400, response: 'data is invalid', data: [] };
    }
    const deletedDish = yield service_mutations_1.DishesMutationsService.deleteDishItemById(dish.id);
    return deletedDish;
});
DishesController.saveDishImage = (dishImage) => __awaiter(void 0, void 0, void 0, function* () {
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: 'dishes/DISHES_' + dishImage.originalname,
        Body: dishImage.buffer,
        ACL: 'public-read',
    };
    try {
        yield __1.storage.send(new client_s3_1.PutObjectCommand(params));
        return { statusCode: 201, response: 'dish image saved' };
    }
    catch (error) {
        return (0, apiResponses_1.databaseMutationError)('save dish image' + error);
    }
});
DishesController.deleteDishImage = (imageName) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: 'dishes/DISHES_' + imageName,
    };
    try {
        yield __1.storage.send(new client_s3_1.DeleteObjectCommand(deleteParams));
        return { statusCode: 200, response: 'dish image deleted' };
    }
    catch (error) {
        return (0, apiResponses_1.databaseMutationError)('delete dish image' + error);
    }
});
// QUERIES
DishesController.getDishByTitle = (dish) => __awaiter(void 0, void 0, void 0, function* () {
    const retreivedDish = yield service_queries_2.DishesQueriesService.getDishByTitle(dish.title);
    return retreivedDish;
});
DishesController.getAllDishesByCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    const retreivedDishes = yield service_queries_2.DishesQueriesService.getAllDishes();
    if (retreivedDishes.statusCode === 200 && retreivedDishes.data) {
        const retreivedCategories = yield _a.getDishesCategoriesById(retreivedDishes.data);
        if (retreivedCategories.length > 0) {
            const response = yield _a.formatGetDishesByCategoriesResponse(retreivedDishes.data, retreivedCategories);
            return {
                statusCode: 200,
                data: response,
                response: 'All dishes retreived successfully by categories',
            };
        }
    }
    return retreivedDishes;
});
DishesController.verifyIfDuplicateTitleOrImage = (dish) => __awaiter(void 0, void 0, void 0, function* () {
    const isValid = _a.verifyDishFormDataValidity(dish);
    if (isValid.statusCode !== 200) {
        isValid;
    }
    const isDuplicate = yield service_queries_2.DishesQueriesService.getDishDuplicate(dish);
    if (isDuplicate.statusCode === 200) {
        return {
            statusCode: 400,
            data: isDuplicate.data,
            response: 'title or image already exists',
        };
    }
    return (0, apiResponses_1.databaseQueryResponse)(['a', 'b'], 'new item is not a duplicate');
});
DishesController.modifyDishItem = (dish) => __awaiter(void 0, void 0, void 0, function* () {
    const isValid = _a.verifyDishFormDataValidity(dish);
    if (!dish.id || isValid.statusCode !== 200) {
        return { statusCode: 400, response: 'data is invalid', data: [] };
    }
    const dishCategory = yield controller_1.CategoriesController.getCategoryByName(dish.category);
    if (dishCategory.statusCode !== 200) {
        return dishCategory;
    }
    const modifiedDish = yield service_mutations_1.DishesMutationsService.modifyDishItemById(dish, dishCategory.data[0].id);
    return modifiedDish;
});
DishesController.deleteImage = (imageName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield fs_1.promises.unlink(__1.rootDirectory + '/public/dishes/' + imageName);
    }
    catch (error) {
        return (0, apiResponses_1.databaseMutationError)('delete dish image');
    }
    return (0, apiResponses_1.databaseMutationResponse)({ affectedRows: 1 }, 'delete dish image');
});
// PRIVATE METHODS
DishesController.verifyDishFormDataValidity = (dish) => {
    const isValid = (0, apiResponses_1.verifyFormDataValidity)(dish, [
        'title',
        'image',
        'description',
        'price',
        'category',
    ]);
    if (isValid.statusCode !== 200) {
        return isValid;
    }
    return (0, apiResponses_1.databaseQueryResponse)([{ valid: 'isvalid' }], 'form data valid');
};
DishesController.getDishesCategoriesById = (dishes) => __awaiter(void 0, void 0, void 0, function* () {
    const response = [];
    const retreivedCategoriesId = [];
    for (const dish of dishes) {
        if (!retreivedCategoriesId.includes(JSON.stringify(dish.categoryId))) {
            retreivedCategoriesId.push(JSON.stringify(dish.categoryId));
            const retreivedCategory = yield service_queries_1.CategoriesQueriesService.getCategoryById(dish.categoryId);
            if (retreivedCategory.statusCode === 200 && retreivedCategory.data) {
                response.push({
                    category: {
                        id: retreivedCategory.data[0].id,
                        name: retreivedCategory.data[0].name,
                        position: retreivedCategory.data[0].position,
                    },
                    dishes: [],
                });
            }
        }
    }
    return response;
});
DishesController.formatGetDishesByCategoriesResponse = (dishes, retreivedCategories) => __awaiter(void 0, void 0, void 0, function* () {
    retreivedCategories = retreivedCategories.sort((a, b) => a.category.position > b.category.position ? 1 : -1);
    for (let i = 0; i < retreivedCategories.length; i++) {
        for (const dish of dishes) {
            if (JSON.stringify(dish.categoryId) ===
                JSON.stringify(retreivedCategories[i].category.id)) {
                retreivedCategories[i].dishes.push({
                    id: dish.id,
                    title: dish.title,
                    image: dish.image,
                    description: dish.description,
                    price: dish.price,
                    position: dish.position,
                    category: retreivedCategories[i].category.name,
                });
            }
        }
    }
    return retreivedCategories;
});
