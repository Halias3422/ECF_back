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
const constant_1 = require("../src/entities/categories/constant");
const database_1 = require("../src/testUtils/database");
const apiResponse = __importStar(require("../src/entities/common/apiResponses"));
const categoryForm = {
    name: "Dessert",
};
describe("Categories verify authorization for protected endpoints", () => {
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        src_1.server === null || src_1.server === void 0 ? void 0 : src_1.server.close();
    }));
    it("create new category", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(src_1.server)
            .post(constant_1.CATEGORIES_ROUTES.createNewCategory)
            .send(categoryForm);
        expect(res.statusCode).toEqual(401);
    }));
    it("deleteCategory", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(src_1.server)
            .post(constant_1.CATEGORIES_ROUTES.deleteCategory)
            .send(categoryForm);
        expect(res.statusCode).toEqual(401);
    }));
    it("modifyCategory", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(src_1.server)
            .post(constant_1.CATEGORIES_ROUTES.modifyCategory)
            .send(categoryForm);
        expect(res.statusCode).toEqual(401);
    }));
});
describe("Categories endpoints: createNewCategory", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, database_1.emptyTestDatabase)();
        jest.spyOn(apiResponse, "verifyAuthorization").mockImplementation(() => Promise.resolve({
            statusCode: 200,
            data: [{ placeholder: "placeholder" }],
            response: "user logged in",
        }));
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        src_1.server === null || src_1.server === void 0 ? void 0 : src_1.server.close();
    }));
    it("should create a new category", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(src_1.server)
            .post(constant_1.CATEGORIES_ROUTES.createNewCategory)
            .send(categoryForm);
        expect(res.statusCode).toEqual(201);
    }));
    it("should not create a category with wrong data", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(src_1.server)
            .post(constant_1.CATEGORIES_ROUTES.createNewCategory)
            .send({ wrong: "data", fake: "property" });
        expect(res.statusCode).toEqual(400);
    }));
    it("should not create a new category with an existing name", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(src_1.server)
            .post(constant_1.CATEGORIES_ROUTES.createNewCategory)
            .send(categoryForm);
        expect(res.statusCode).toEqual(400);
    }));
});
describe("Categories endpoints: getAllCategories", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, database_1.emptyTestDatabase)();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        src_1.server === null || src_1.server === void 0 ? void 0 : src_1.server.close();
    }));
    it("should retreive all the categories", () => __awaiter(void 0, void 0, void 0, function* () {
        const categoryOne = yield (0, supertest_1.default)(src_1.server)
            .post(constant_1.CATEGORIES_ROUTES.createNewCategory)
            .send(categoryForm);
        expect(categoryOne.statusCode).toEqual(201);
        const categoryTwo = yield (0, supertest_1.default)(src_1.server)
            .post(constant_1.CATEGORIES_ROUTES.createNewCategory)
            .send({ name: "Burger" });
        expect(categoryTwo.statusCode).toEqual(201);
        const categoryThree = yield (0, supertest_1.default)(src_1.server)
            .post(constant_1.CATEGORIES_ROUTES.createNewCategory)
            .send({ name: "Plat principal" });
        expect(categoryThree.statusCode).toEqual(201);
        const res = yield (0, supertest_1.default)(src_1.server).get(constant_1.CATEGORIES_ROUTES.getAllCategories);
        expect(res.statusCode).toEqual(200);
        const categories = JSON.parse(res.text).data;
        expect(categories.length).toEqual(3);
        expect(categories[0].name).toEqual("Dessert");
        expect(categories[1].name).toEqual("Burger");
        expect(categories[2].name).toEqual("Plat principal");
    }));
});
describe("Categories endpoints: ModifyCategory", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, database_1.emptyTestDatabase)();
        jest.spyOn(apiResponse, "verifyAuthorization").mockImplementation(() => Promise.resolve({
            statusCode: 200,
            data: [{ placeholder: "placeholder" }],
            response: "user logged in",
        }));
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        src_1.server === null || src_1.server === void 0 ? void 0 : src_1.server.close();
    }));
    it("should modify the category", () => __awaiter(void 0, void 0, void 0, function* () {
        const newCategory = yield (0, supertest_1.default)(src_1.server)
            .post(constant_1.CATEGORIES_ROUTES.createNewCategory)
            .send(categoryForm);
        expect(newCategory.statusCode).toEqual(201);
        const retreived = yield (0, supertest_1.default)(src_1.server).get(constant_1.CATEGORIES_ROUTES.getAllCategories);
        const foundCategory = JSON.parse(retreived.text).data[0];
        expect(retreived.statusCode).toEqual(200);
        const modified = yield (0, supertest_1.default)(src_1.server)
            .post(constant_1.CATEGORIES_ROUTES.modifyCategory)
            .send({ id: foundCategory.id, name: "Burger" });
        expect(modified.statusCode).toEqual(200);
        const finalRetreived = yield (0, supertest_1.default)(src_1.server).get(constant_1.CATEGORIES_ROUTES.getAllCategories);
        expect(finalRetreived.statusCode).toEqual(200);
        const finalCategory = JSON.parse(finalRetreived.text).data[0];
        expect(finalCategory.name).toEqual("Burger");
    }));
    it("should not modify the category if duplicate", () => __awaiter(void 0, void 0, void 0, function* () {
        const retreived = yield (0, supertest_1.default)(src_1.server).get(constant_1.CATEGORIES_ROUTES.getAllCategories);
        const foundCategory = JSON.parse(retreived.text).data[0];
        expect(retreived.statusCode).toEqual(200);
        const newCategory = yield (0, supertest_1.default)(src_1.server)
            .post(constant_1.CATEGORIES_ROUTES.createNewCategory)
            .send({ name: "Dessert" });
        expect(newCategory.statusCode).toEqual(201);
        const res = yield (0, supertest_1.default)(src_1.server)
            .post(constant_1.CATEGORIES_ROUTES.modifyCategory)
            .send({ id: foundCategory.id, name: "Dessert" });
        expect(res.statusCode).toEqual(400);
    }));
    it("should not modify if wrong id", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(src_1.server)
            .post(constant_1.CATEGORIES_ROUTES.modifyCategory)
            .send({ id: "1243", name: "Salade" });
        expect(res.statusCode).toEqual(500);
    }));
});
describe("Categories endpoints: DeleteCategory", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, database_1.emptyTestDatabase)();
        jest.spyOn(apiResponse, "verifyAuthorization").mockImplementation(() => Promise.resolve({
            statusCode: 200,
            data: [{ placeholder: "placeholder" }],
            response: "user logged in",
        }));
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        src_1.server === null || src_1.server === void 0 ? void 0 : src_1.server.close();
    }));
    it("should delete the category", () => __awaiter(void 0, void 0, void 0, function* () {
        const newCategory = yield (0, supertest_1.default)(src_1.server)
            .post(constant_1.CATEGORIES_ROUTES.createNewCategory)
            .send({ name: "Dessert" });
        expect(newCategory.statusCode).toEqual(201);
        const retreived = yield (0, supertest_1.default)(src_1.server).get(constant_1.CATEGORIES_ROUTES.getAllCategories);
        const foundCategory = JSON.parse(retreived.text).data[0];
        expect(retreived.statusCode).toEqual(200);
        const res = yield (0, supertest_1.default)(src_1.server)
            .post(constant_1.CATEGORIES_ROUTES.deleteCategory)
            .send(foundCategory);
        expect(res.statusCode).toEqual(200);
        const finalRetreive = yield (0, supertest_1.default)(src_1.server).get(constant_1.CATEGORIES_ROUTES.getAllCategories);
        expect(JSON.parse(finalRetreive.text).data.length).toEqual(0);
    }));
    it("should not delete a category with wrong ID", () => __awaiter(void 0, void 0, void 0, function* () {
        const newCategory = yield (0, supertest_1.default)(src_1.server)
            .post(constant_1.CATEGORIES_ROUTES.createNewCategory)
            .send({ name: "Dessert" });
        expect(newCategory.statusCode).toEqual(201);
        const retreived = yield (0, supertest_1.default)(src_1.server).get(constant_1.CATEGORIES_ROUTES.getAllCategories);
        const foundCategory = JSON.parse(retreived.text).data[0];
        expect(retreived.statusCode).toEqual(200);
        const res = yield (0, supertest_1.default)(src_1.server)
            .post(constant_1.CATEGORIES_ROUTES.deleteCategory)
            .send({ id: "123", name: foundCategory.name });
        expect(res.statusCode).toEqual(500);
        const finalRetreive = yield (0, supertest_1.default)(src_1.server).get(constant_1.CATEGORIES_ROUTES.getAllCategories);
        expect(JSON.parse(finalRetreive.text).data.length).toEqual(1);
    }));
});
