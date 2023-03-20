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
const constants_1 = require("../src/entities/menus/constants");
const database_1 = require("../src/testUtils/database");
const apiResponse = __importStar(require("../src/entities/common/apiResponses"));
const newMenu = {
    title: 'new menu',
    position: 0,
    formulas: [
        {
            title: 'formula 1',
            description: 'description 1',
            price: '5.99',
            position: 0,
        },
        {
            title: 'formula 2',
            description: 'description 2',
            price: '199.99',
            position: 1,
        },
    ],
};
describe('Verify Menus endpoints authorization', () => {
    afterAll(() => {
        src_1.server === null || src_1.server === void 0 ? void 0 : src_1.server.close();
    });
    it('endpoint: createNewMenu', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(src_1.server)
            .post(constants_1.MENUS_ROUTES.createNewMenu)
            .send(newMenu);
        expect(res.statusCode).toEqual(401);
    }));
    it('endpoint: modifyMenu', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(src_1.server)
            .post(constants_1.MENUS_ROUTES.modifyMenu)
            .send(newMenu);
        expect(res.statusCode).toEqual(401);
    }));
    it('endpoint: deleteMenu', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(src_1.server)
            .post(constants_1.MENUS_ROUTES.deleteMenu)
            .send(newMenu);
        expect(res.statusCode).toEqual(401);
    }));
});
describe('Menus endpoints: createNewMenu', () => {
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
    it('should create a new Menu with formulas', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(src_1.server)
            .post(constants_1.MENUS_ROUTES.createNewMenu)
            .send(newMenu);
        expect(res.statusCode).toEqual(201);
        const retreivedMenu = yield (0, supertest_1.default)(src_1.server).get(constants_1.MENUS_ROUTES.getAllMenus);
        expect(JSON.parse(retreivedMenu.text).data.length).toEqual(1);
        const menu = JSON.parse(retreivedMenu.text).data[0];
        expect(menu.title).toEqual(newMenu.title);
        expect(menu.formulas[0].title).toEqual(newMenu.formulas[0].title);
        expect(menu.formulas[1].title).toEqual(newMenu.formulas[1].title);
    }));
    it("shouldn't create a new Menu with wrong data", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(src_1.server)
            .post(constants_1.MENUS_ROUTES.createNewMenu)
            .send({
            name: 'menu amazing',
            dishes: [{ title: 'dish1' }],
        });
        expect(res.statusCode).toEqual(400);
    }));
    it('should create a menu with no formula', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(src_1.server)
            .post(constants_1.MENUS_ROUTES.createNewMenu)
            .send({ title: 'another menu', formulas: [] });
        expect(res.statusCode).toEqual(201);
    }));
    it("shouldn't create a duplicate menu", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(src_1.server)
            .post(constants_1.MENUS_ROUTES.createNewMenu)
            .send(newMenu);
        expect(res.statusCode).toEqual(400);
    }));
});
describe('Menus endpoints: modifyMenu', () => {
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
    it('should modify an existing menu', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(src_1.server)
            .post(constants_1.MENUS_ROUTES.createNewMenu)
            .send(newMenu);
        expect(res.statusCode).toEqual(201);
        const retreivedMenu = yield (0, supertest_1.default)(src_1.server).get(constants_1.MENUS_ROUTES.getAllMenus);
        const menu = JSON.parse(retreivedMenu.text).data[0];
        const modifiedMenu = yield (0, supertest_1.default)(src_1.server)
            .post(constants_1.MENUS_ROUTES.modifyMenu)
            .send(Object.assign(Object.assign({}, menu), { title: 'new title', formulas: [
                Object.assign(Object.assign({}, menu.formulas[0]), { title: 'modified formula', description: 'modified description', price: 200.99 }),
            ] }));
        expect(modifiedMenu.statusCode).toEqual(200);
        const finalMenu = yield (0, supertest_1.default)(src_1.server).get(constants_1.MENUS_ROUTES.getAllMenus);
        const formattedMenu = JSON.parse(finalMenu.text).data[0];
        expect(formattedMenu.title).toEqual('new title');
        expect(formattedMenu.formulas.length).toEqual(1);
        expect(formattedMenu.formulas[0].title).toEqual('modified formula');
    }));
    it('should not allow for a duplicate', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(src_1.server)
            .post(constants_1.MENUS_ROUTES.createNewMenu)
            .send({ title: 'another new menu', formulas: [] });
        expect(res.statusCode).toEqual(201);
        const modify = yield (0, supertest_1.default)(src_1.server)
            .post(constants_1.MENUS_ROUTES.modifyMenu)
            .send(Object.assign(Object.assign({}, newMenu), { title: 'another new menu' }));
        expect(modify.statusCode).toEqual(400);
    }));
    it("shouldn't modify a non existing menu", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(src_1.server)
            .post(constants_1.MENUS_ROUTES.modifyMenu)
            .send(Object.assign(Object.assign({}, newMenu), { id: '123' }));
        expect(res.statusCode).toEqual(400);
    }));
});
describe('Menu endpoints: deleteMenu', () => {
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
    it('should delete an existing menu', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(src_1.server)
            .post(constants_1.MENUS_ROUTES.createNewMenu)
            .send(newMenu);
        expect(res.statusCode).toEqual(201);
        const retreivedMenu = yield (0, supertest_1.default)(src_1.server).get(constants_1.MENUS_ROUTES.getAllMenus);
        const menu = JSON.parse(retreivedMenu.text).data[0];
        const deletedMenu = yield (0, supertest_1.default)(src_1.server)
            .post(constants_1.MENUS_ROUTES.deleteMenu)
            .send(menu);
        expect(deletedMenu.statusCode).toEqual(200);
        const finalMenus = yield (0, supertest_1.default)(src_1.server).get(constants_1.MENUS_ROUTES.getAllMenus);
        expect(JSON.parse(finalMenus.text).data.length).toEqual(0);
    }));
    it('should not delete a non existing menu', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(src_1.server)
            .post(constants_1.MENUS_ROUTES.createNewMenu)
            .send(newMenu);
        expect(res.statusCode).toEqual(201);
        const retreivedMenu = yield (0, supertest_1.default)(src_1.server).get(constants_1.MENUS_ROUTES.getAllMenus);
        const menu = JSON.parse(retreivedMenu.text).data[0];
        const deleteMenu = yield (0, supertest_1.default)(src_1.server)
            .post(constants_1.MENUS_ROUTES.deleteMenu)
            .send(Object.assign(Object.assign({}, menu), { id: '123' }));
        expect(deleteMenu.statusCode).toEqual(500);
    }));
});
