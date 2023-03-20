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
exports.DishesGalleryController = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const fs_1 = require("fs");
const __1 = require("../..");
const apiResponses_1 = require("../common/apiResponses");
const service_mutations_1 = require("./service.mutations");
const service_queries_1 = require("./service.queries");
class DishesGalleryController {
}
exports.DishesGalleryController = DishesGalleryController;
_a = DishesGalleryController;
DishesGalleryController.getAllDishesGallery = () => __awaiter(void 0, void 0, void 0, function* () {
    const dishes = yield service_queries_1.DishesGalleryQueriesService.getAllDishesGallery();
    if (dishes.statusCode !== 200) {
        return dishes;
    }
    const formattedDishes = [];
    for (const dish of dishes.data) {
        formattedDishes.push({
            id: dish.id,
            image: dish.image,
            title: dish.title,
            position: dish.position,
        });
    }
    return {
        statusCode: 200,
        response: dishes.response,
        data: formattedDishes,
    };
});
DishesGalleryController.verifyIfDuplicateTitleOrImage = (dish) => __awaiter(void 0, void 0, void 0, function* () {
    const isValid = (0, apiResponses_1.verifyFormDataValidity)(dish, ['title', 'image']);
    if (isValid.statusCode !== 200) {
        return isValid;
    }
    const isDuplicate = yield service_queries_1.DishesGalleryQueriesService.getGalleryDishDuplicate(dish);
    if (isDuplicate.statusCode === 200) {
        return {
            statusCode: 400,
            data: isDuplicate.data,
            response: 'title or image already exists',
        };
    }
    return (0, apiResponses_1.databaseQueryResponse)(['a', 'b'], 'new item is not a duplicate');
});
// PROTECTED
DishesGalleryController.saveDishGalleryImage = (dishImage) => __awaiter(void 0, void 0, void 0, function* () {
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: 'dishesGallery/DISHESGALLERY_' + dishImage.originalname,
        Body: dishImage.buffer,
        ACL: 'public-read',
    };
    try {
        yield __1.storage.send(new client_s3_1.PutObjectCommand(params));
        return { statusCode: 201, response: 'dish gallery image saved' };
    }
    catch (error) {
        return (0, apiResponses_1.databaseMutationError)('save dish gallery image' + error);
    }
});
DishesGalleryController.deleteDishGalleryImage = (imageName) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: 'dishesGallery/DISHESGALLERY_' + imageName,
    };
    try {
        yield __1.storage.send(new client_s3_1.DeleteObjectCommand(deleteParams));
        return { statusCode: 200, response: 'dish gallery image deleted' };
    }
    catch (error) {
        return (0, apiResponses_1.databaseMutationError)('delete dish gallery image' + error);
    }
});
DishesGalleryController.createDishGalleryItem = (dish) => __awaiter(void 0, void 0, void 0, function* () {
    const isValid = (0, apiResponses_1.verifyFormDataValidity)(dish, ['title', 'image']);
    if (isValid.statusCode !== 200) {
        return isValid;
    }
    const createdDish = yield service_mutations_1.DishesGalleryMutationsService.createDishGalleryItem(dish);
    if (createdDish.statusCode !== 200) {
        return createdDish;
    }
    return Object.assign(Object.assign({}, createdDish), { statusCode: 201 });
});
DishesGalleryController.modifyDishGalleryItem = (dish) => __awaiter(void 0, void 0, void 0, function* () {
    const isValid = (0, apiResponses_1.verifyFormDataValidity)(dish, ['id', 'title', 'image']);
    if (!dish.id || isValid.statusCode !== 200) {
        return isValid;
    }
    const modifiedDish = yield service_mutations_1.DishesGalleryMutationsService.modifyDishGalleryItemById(dish);
    return modifiedDish;
});
DishesGalleryController.deleteDishGalleryItem = (dish) => __awaiter(void 0, void 0, void 0, function* () {
    const isValid = (0, apiResponses_1.verifyFormDataValidity)(dish, ['id', 'title', 'image']);
    if (!dish.id || isValid.statusCode !== 200) {
        return isValid;
    }
    const deletedDish = yield service_mutations_1.DishesGalleryMutationsService.deleteDishGalleryItemById(dish.id);
    if (deletedDish.statusCode !== 200) {
        return deletedDish;
    }
    yield _a.modifyGalleryDishesPosition(dish.position);
    return deletedDish;
});
DishesGalleryController.deleteImage = (imageName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield fs_1.promises.unlink(__1.rootDirectory + '/public/dishesGallery/' + imageName);
    }
    catch (error) {
        return (0, apiResponses_1.databaseMutationError)('delete dish gallery image');
    }
    return (0, apiResponses_1.databaseMutationResponse)({ affectedRows: 1 }, 'delete dish gallery image');
});
DishesGalleryController.modifyGalleryDishesPosition = (position) => __awaiter(void 0, void 0, void 0, function* () {
    const modifiedDishes = yield service_mutations_1.DishesGalleryMutationsService.modifyGalleryDishesPosition(position);
    return modifiedDishes;
});
