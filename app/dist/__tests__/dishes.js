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
const constants_1 = require("../src/entities/dishes/constants");
const database_1 = require("../src/testUtils/database");
const apiResponse = __importStar(require("../src/entities/common/apiResponses"));
const categoryForm = {
    name: 'Dessert',
};
const dishForm = {
    category: 'Dessert',
    image: 'glace-menthe.jpg',
    title: 'glace à la menthe',
    description: 'un généreux dessert pour les plus gourmands',
    price: '19.99',
};
describe('Dishes verify authorization for protected endpoints', () => {
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        src_1.server === null || src_1.server === void 0 ? void 0 : src_1.server.close();
    }));
    it('endpoint: create new dish', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(src_1.server)
            .post(constants_1.DISHES_ROUTES.createNewDish)
            .send(dishForm);
        expect(res.statusCode).toEqual(401);
    }));
    it('endpoint: delete dish item', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(src_1.server)
            .post(constants_1.DISHES_ROUTES.deleteDishItem)
            .send('123');
        expect(res.statusCode).toEqual(401);
    }));
    it('endpoint: save dish image', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(src_1.server)
            .post(constants_1.DISHES_ROUTES.saveDishImage)
            .send('toto');
        expect(res.statusCode).toEqual(401);
    }));
    it('endpoint: delete image', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(src_1.server)
            .post(constants_1.DISHES_ROUTES.deleteDishImage)
            .send('toto');
        expect(res.statusCode).toEqual(401);
    }));
    it('endpoint: modify dish item', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(src_1.server)
            .post(constants_1.DISHES_ROUTES.modifyDishItem)
            .send('toto');
        expect(res.statusCode).toEqual(401);
    }));
});
describe('Dishes endpoints: createNewDish', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, database_1.emptyTestDatabase)();
        jest.spyOn(apiResponse, 'verifyAuthorization').mockImplementation(() => Promise.resolve({
            statusCode: 200,
            data: [{ placeholder: 'placeholder' }],
            response: 'user logged in',
        }));
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        src_1.server === null || src_1.server === void 0 ? void 0 : src_1.server.close();
    }));
    it('should create a new dish', () => __awaiter(void 0, void 0, void 0, function* () {
        const newCategory = yield (0, supertest_1.default)(src_1.server)
            .post(constant_1.CATEGORIES_ROUTES.createNewCategory)
            .send(categoryForm);
        expect(newCategory.statusCode).toEqual(201);
        const res = yield (0, supertest_1.default)(src_1.server)
            .post(constants_1.DISHES_ROUTES.createNewDish)
            .send(dishForm);
        expect(res.statusCode).toEqual(201);
    }));
    it("shouldn't create a dish with wrong data", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(src_1.server).post(constants_1.DISHES_ROUTES.createNewDish).send({
            category: 'Dessert',
            title: 'dish title',
            price: 19.99,
            something: 'wrong',
        });
        expect(res.statusCode).toEqual(400);
    }));
    it("shouldn't create a dish with non-existing category", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(src_1.server)
            .post(constants_1.DISHES_ROUTES.createNewDish)
            .send(Object.assign(Object.assign({}, dishForm), { category: 'Fake' }));
        expect(res.statusCode).toEqual(400);
    }));
    it("shouldn't create a dish with duplicate name", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(src_1.server)
            .post(constants_1.DISHES_ROUTES.createNewDish)
            .send(Object.assign(Object.assign({}, dishForm), { image: 'pizza.jpg' }));
        expect(res.statusCode).toEqual(400);
    }));
    it("shouldn't create a dish with duplicate image", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(src_1.server)
            .post(constants_1.DISHES_ROUTES.createNewDish)
            .send(Object.assign(Object.assign({}, dishForm), { title: 'another dish' }));
        expect(res.statusCode).toEqual(400);
    }));
});
const categories = [
    {
        name: 'Dessert',
    },
    {
        name: 'Entree',
    },
    {
        name: 'Plat principal',
    },
];
const dishes = [
    {
        category: 'Dessert',
        image: 'image-dish-1.jpg',
        title: 'dish 1 title',
        description: 'dish 1 description',
        price: '19.99',
    },
    {
        category: 'Dessert',
        image: 'image-dish-2.jpg',
        title: 'dish 2 title',
        description: 'dish 2 description',
        price: '24.99',
    },
    {
        category: 'Entree',
        image: 'image-dish-3.jpg',
        title: 'dish 3 title',
        description: 'dish 3 description',
        price: '14.99',
    },
];
describe('Dishes endpoints: getAllDishesByCategories', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, database_1.emptyTestDatabase)();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        src_1.server === null || src_1.server === void 0 ? void 0 : src_1.server.close();
    }));
    it('should return an error if there are no dishes', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(src_1.server).get(constants_1.DISHES_ROUTES.getAllDishesByCategories);
        expect(res.statusCode).toEqual(400);
    }));
    it('should return all dishes with correct information sorted by category', () => __awaiter(void 0, void 0, void 0, function* () {
        for (const category of categories) {
            const newCategory = yield (0, supertest_1.default)(src_1.server)
                .post(constant_1.CATEGORIES_ROUTES.createNewCategory)
                .send(category);
            expect(newCategory.statusCode).toEqual(201);
        }
        for (const dish of dishes) {
            const newDish = yield (0, supertest_1.default)(src_1.server)
                .post(constants_1.DISHES_ROUTES.createNewDish)
                .send(dish);
            expect(newDish.statusCode).toEqual(201);
        }
        const res = yield (0, supertest_1.default)(src_1.server).get(constants_1.DISHES_ROUTES.getAllDishesByCategories);
        const entries = res.body.data;
        expect(entries.length).toEqual(2);
        expect(entries[0].category.name).toEqual('Dessert');
        expect(entries[0].dishes.length).toEqual(2);
        expect(entries[0].dishes[0].title).toEqual('dish 1 title');
        expect(entries[0].dishes[0].image).toContain('image-dish-1.jpg');
        expect(entries[0].dishes[0].description).toEqual('dish 1 description');
        expect(entries[0].dishes[0].price).toEqual('19.99');
        expect(entries[0].dishes[1].title).toEqual('dish 2 title');
        expect(entries[0].dishes[1].image).toContain('image-dish-2.jpg');
        expect(entries[0].dishes[1].description).toEqual('dish 2 description');
        expect(entries[0].dishes[1].price).toEqual('24.99');
        expect(entries[1].category.name).toEqual('Entree');
        expect(entries[1].dishes.length).toEqual(1);
        expect(entries[1].dishes[0].title).toEqual('dish 3 title');
        expect(entries[1].dishes[0].image).toContain('image-dish-3.jpg');
        expect(entries[1].dishes[0].description).toEqual('dish 3 description');
        expect(entries[1].dishes[0].price).toEqual('14.99');
    }));
});
describe('Dishes endpoints: deleteDishItem', () => {
    let retreivedDish;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, database_1.emptyTestDatabase)();
        const newCategory = yield (0, supertest_1.default)(src_1.server)
            .post(constant_1.CATEGORIES_ROUTES.createNewCategory)
            .send(categoryForm);
        expect(newCategory.statusCode).toEqual(201);
        const newDish = yield (0, supertest_1.default)(src_1.server)
            .post(constants_1.DISHES_ROUTES.createNewDish)
            .send(dishForm);
        expect(newDish.statusCode).toEqual(201);
        const allDishes = yield (0, supertest_1.default)(src_1.server).get(constants_1.DISHES_ROUTES.getAllDishesByCategories);
        for (const category of allDishes.body.data) {
            for (const dish of category.dishes) {
                if (dish.title === dishForm.title) {
                    retreivedDish = dish;
                }
            }
        }
        expect(retreivedDish.title).toEqual(dishForm.title);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        src_1.server === null || src_1.server === void 0 ? void 0 : src_1.server.close();
    }));
    it('should not delete a dish with wrong format', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(src_1.server)
            .post(constants_1.DISHES_ROUTES.deleteDishItem)
            .send(Object.assign(Object.assign({}, retreivedDish), { id: '123' }));
        expect(res.statusCode).toEqual(500);
    }));
    it('should delete a dish', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(src_1.server)
            .post(constants_1.DISHES_ROUTES.deleteDishItem)
            .send(retreivedDish);
        expect(res.statusCode).toEqual(200);
    }));
});
describe('Dishes endpoints: modifyDishItem', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, database_1.emptyTestDatabase)();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        src_1.server === null || src_1.server === void 0 ? void 0 : src_1.server.close();
    }));
    it('should modify a dish', () => __awaiter(void 0, void 0, void 0, function* () {
        const newCategory = yield (0, supertest_1.default)(src_1.server)
            .post(constant_1.CATEGORIES_ROUTES.createNewCategory)
            .send(categoryForm);
        expect(newCategory.statusCode).toEqual(201);
        const newDish = yield (0, supertest_1.default)(src_1.server)
            .post(constants_1.DISHES_ROUTES.createNewDish)
            .send(dishForm);
        expect(newDish.statusCode).toEqual(201);
        const allDishes = yield (0, supertest_1.default)(src_1.server).get(constants_1.DISHES_ROUTES.getAllDishesByCategories);
        let retreivedDish;
        for (const category of allDishes.body.data) {
            for (const dish of category.dishes) {
                if (dish.title === dishForm.title) {
                    retreivedDish = dish;
                }
            }
        }
        expect(retreivedDish.title).toEqual(dishForm.title);
        const modify = yield (0, supertest_1.default)(src_1.server)
            .post(constants_1.DISHES_ROUTES.modifyDishItem)
            .send(Object.assign(Object.assign({}, retreivedDish), { title: 'title modified' }));
        expect(modify.statusCode).toEqual(200);
        let retreivedFinalDish;
        const modifiedDish = yield (0, supertest_1.default)(src_1.server).get(constants_1.DISHES_ROUTES.getAllDishesByCategories);
        for (const category of modifiedDish.body.data) {
            for (const dish of category.dishes) {
                if (dish.title === 'titleModified') {
                    retreivedFinalDish = dish;
                }
            }
        }
        expect(retreivedFinalDish).not.toBeNull();
    }));
});
describe('Dishes endpoints: verifyIfDuplicateTitleOrImage', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, database_1.emptyTestDatabase)();
        const newCategory = yield (0, supertest_1.default)(src_1.server)
            .post(constant_1.CATEGORIES_ROUTES.createNewCategory)
            .send(categoryForm);
        expect(newCategory.statusCode).toEqual(201);
        const newDish = yield (0, supertest_1.default)(src_1.server)
            .post(constants_1.DISHES_ROUTES.createNewDish)
            .send(dishForm);
        expect(newDish.statusCode).toEqual(201);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        src_1.server === null || src_1.server === void 0 ? void 0 : src_1.server.close();
    }));
    it('should find the duplicate by title', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(src_1.server)
            .get(constants_1.DISHES_ROUTES.verifyIfDuplicateTitleOrImage)
            .query(Object.assign(Object.assign({}, dishForm), { image: 'image-fake.jpg' }));
        expect(res.statusCode).toEqual(400);
    }));
    it('should find the duplicate by image', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(src_1.server)
            .get(constants_1.DISHES_ROUTES.verifyIfDuplicateTitleOrImage)
            .query(Object.assign(Object.assign({}, dishForm), { title: 'new fake title' }));
        expect(res.statusCode).toEqual(400);
    }));
    it('should not find any duplicate', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(src_1.server)
            .get(constants_1.DISHES_ROUTES.verifyIfDuplicateTitleOrImage)
            .query(Object.assign(Object.assign({}, dishForm), { title: 'new fake title', image: 'image-fake.jpg' }));
        expect(res.statusCode).toEqual(200);
    }));
});
