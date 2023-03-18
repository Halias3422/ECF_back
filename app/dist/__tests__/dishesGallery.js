"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const src_1 = require("../src");
const constants_1 = require("../src/entities/dishesGallery/constants");
const database_1 = require("../src/testUtils/database");
const apiResponse = __importStar(require("../src/entities/common/apiResponses"));
const fakeDishGallery = {
    image: "fake-image.jpg",
    title: "fake title",
};
describe("Verify dishesGallery protected endpoints", () => {
    afterAll(() => {
        src_1.server === null || src_1.server === void 0 ? void 0 : src_1.server.close();
    });
    it("endpoint: deleteDishGalleryItem", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(src_1.server)
            .post(constants_1.DISHES_GALLERY_ROUTES.deleteDishGalleryItem)
            .send(Object.assign({ id: "123" }, fakeDishGallery));
        expect(res.statusCode).toEqual(401);
    }));
    it("endpoint: saveDishGalleryImage", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(src_1.server)
            .post(constants_1.DISHES_GALLERY_ROUTES.saveDishGalleryImage)
            .send({ image: "fake-image.jpg" });
        expect(res.statusCode).toEqual(401);
    }));
    it("endpoint: deleteImage", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(src_1.server)
            .post(constants_1.DISHES_GALLERY_ROUTES.deleteImage)
            .send({ image: "fake-image.jpg" });
        expect(res.statusCode).toEqual(401);
    }));
    it("endpoint: createNewDishGalleryItem", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(src_1.server)
            .post(constants_1.DISHES_GALLERY_ROUTES.createNewDishGalleryItem)
            .send(fakeDishGallery);
        expect(res.statusCode).toEqual(401);
    }));
    it("endpoint: modigyDishGalleryItem", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(src_1.server)
            .post(constants_1.DISHES_GALLERY_ROUTES.modifyDishGalleryItem)
            .send(fakeDishGallery);
        expect(res.statusCode).toEqual(401);
    }));
});
describe("DishesGallery endpoint: createNewDishGalleryItem", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, database_1.emptyTestDatabase)();
        jest.spyOn(apiResponse, "verifyAuthorization").mockImplementation(() => Promise.resolve({
            statusCode: 200,
            data: [{ placeholder: "placeholder" }],
            response: "user logged in",
        }));
    }));
    afterAll(() => {
        src_1.server === null || src_1.server === void 0 ? void 0 : src_1.server.close();
    });
    it("should create a new dish gallery item", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(src_1.server)
            .post(constants_1.DISHES_GALLERY_ROUTES.createNewDishGalleryItem)
            .send(fakeDishGallery);
        expect(res.statusCode).toEqual(201);
    }));
    it("should not create a new dish gallery item with wrong data", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(src_1.server)
            .post(constants_1.DISHES_GALLERY_ROUTES.createNewDishGalleryItem)
            .send({ name: "toto", image: "image.jpg" });
        expect(res.statusCode).toEqual(400);
    }));
});
describe("DishesGallery endpoint: getAllDishesGallery", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, database_1.emptyTestDatabase)();
    }));
    afterAll(() => {
        src_1.server === null || src_1.server === void 0 ? void 0 : src_1.server.close();
    });
    it("should retreive all the dishes", () => __awaiter(void 0, void 0, void 0, function* () {
        const dishOne = yield (0, supertest_1.default)(src_1.server)
            .post(constants_1.DISHES_GALLERY_ROUTES.createNewDishGalleryItem)
            .send(fakeDishGallery);
        expect(dishOne.statusCode).toEqual(201);
        const dishTwo = yield (0, supertest_1.default)(src_1.server)
            .post(constants_1.DISHES_GALLERY_ROUTES.createNewDishGalleryItem)
            .send({ title: "second dish", image: "second-image.jpg" });
        expect(dishTwo.statusCode).toEqual(201);
        const dishThree = yield (0, supertest_1.default)(src_1.server)
            .post(constants_1.DISHES_GALLERY_ROUTES.createNewDishGalleryItem)
            .send({ title: "third dish", image: "third-image.jpg" });
        expect(dishThree.statusCode).toEqual(201);
        const res = yield (0, supertest_1.default)(src_1.server).get(constants_1.DISHES_GALLERY_ROUTES.getAllDishesGallery);
        expect(res.statusCode).toEqual(200);
        expect(JSON.parse(res.text).data.length).toEqual(3);
    }));
});
describe("DishesGallery endpoint: modifyDishGalleryItem", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, database_1.emptyTestDatabase)();
        jest.spyOn(apiResponse, "verifyAuthorization").mockImplementation(() => Promise.resolve({
            statusCode: 200,
            data: [{ placeholder: "placeholder" }],
            response: "user logged in",
        }));
    }));
    afterAll(() => {
        src_1.server === null || src_1.server === void 0 ? void 0 : src_1.server.close();
    });
    it("should modify an existing dish gallery item", () => __awaiter(void 0, void 0, void 0, function* () {
        const newDish = yield (0, supertest_1.default)(src_1.server)
            .post(constants_1.DISHES_GALLERY_ROUTES.createNewDishGalleryItem)
            .send(fakeDishGallery);
        expect(newDish.statusCode).toEqual(201);
        const retreivedDish = yield (0, supertest_1.default)(src_1.server).get(constants_1.DISHES_GALLERY_ROUTES.getAllDishesGallery);
        expect(retreivedDish.statusCode).toEqual(200);
        const dish = JSON.parse(retreivedDish.text).data[0];
        const res = yield (0, supertest_1.default)(src_1.server)
            .post(constants_1.DISHES_GALLERY_ROUTES.modifyDishGalleryItem)
            .send(Object.assign(Object.assign({}, dish), { title: "new title", image: "new-image.jpg" }));
        expect(res.statusCode).toEqual(200);
        const newRetreivedDish = yield (0, supertest_1.default)(src_1.server).get(constants_1.DISHES_GALLERY_ROUTES.getAllDishesGallery);
        expect(newRetreivedDish.statusCode).toEqual(200);
        const finalDish = JSON.parse(newRetreivedDish.text).data[0];
        expect(finalDish.title).toEqual("new title");
        expect(finalDish.image).toContain("new-image.jpg");
    }));
    it("should not modify a non-existing gallery item", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(src_1.server)
            .post(constants_1.DISHES_GALLERY_ROUTES.modifyDishGalleryItem)
            .send({ id: "123", title: "anything", image: "whatever.jpg" });
        expect(res.statusCode).toEqual(500);
    }));
});
describe("DishesGallery endpoint: deleteDishGalleryItem", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, database_1.emptyTestDatabase)();
        jest.spyOn(apiResponse, "verifyAuthorization").mockImplementation(() => Promise.resolve({
            statusCode: 200,
            data: [{ placeholder: "placeholder" }],
            response: "user logged in",
        }));
    }));
    afterAll(() => {
        src_1.server === null || src_1.server === void 0 ? void 0 : src_1.server.close();
    });
    it("should not delete a non existing item", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(src_1.server)
            .post(constants_1.DISHES_GALLERY_ROUTES.deleteDishGalleryItem)
            .send({ id: "123", title: "anything", image: "image.jpg" });
        expect(res.statusCode).toEqual(500);
    }));
    it("should delete an existing item", () => __awaiter(void 0, void 0, void 0, function* () {
        const newDish = yield (0, supertest_1.default)(src_1.server)
            .post(constants_1.DISHES_GALLERY_ROUTES.createNewDishGalleryItem)
            .send(fakeDishGallery);
        expect(newDish.statusCode).toEqual(201);
        const retreivedDish = yield (0, supertest_1.default)(src_1.server).get(constants_1.DISHES_GALLERY_ROUTES.getAllDishesGallery);
        expect(retreivedDish.statusCode).toEqual(200);
        const dish = JSON.parse(retreivedDish.text).data[0];
        const deletedDish = yield (0, supertest_1.default)(src_1.server)
            .post(constants_1.DISHES_GALLERY_ROUTES.deleteDishGalleryItem)
            .send(dish);
        expect(deletedDish.statusCode).toEqual(200);
        const finalDishes = yield (0, supertest_1.default)(src_1.server).get(constants_1.DISHES_GALLERY_ROUTES.getAllDishesGallery);
        expect(finalDishes.statusCode).toEqual(400);
    }));
});
