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
const constants_1 = require("../src/entities/users/constants");
const database_1 = require("../src/testUtils/database");
const apiResponse = __importStar(require("../src/entities/common/apiResponses"));
const userSignUp = {
    email: 'test@mail.com',
    password: 'sup3rsecretp@ssword',
};
const userOptionalData = {
    email: 'test@mail.com',
    defaultGuestNumber: 3,
    defaultAllergies: '',
};
const userDuplicateSignup = {
    email: 'test@mail.com',
    password: 'oth3r@wesomepassword',
};
describe('Users verify authorization for protected endpoints', () => {
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        src_1.server === null || src_1.server === void 0 ? void 0 : src_1.server.close();
    }));
    it('endpoint: updateOptionalInfo', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(src_1.server)
            .post(constants_1.USERS_ROUTES.updateOptionalInfo)
            .send(userOptionalData);
        expect(res.statusCode).toEqual(401);
    }));
    it('endpoint: getOptionalInfo', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(src_1.server).get(constants_1.USERS_ROUTES.getOptionalInfo);
        expect(res.statusCode).toEqual(401);
    }));
    it('endpoint: getRole', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(src_1.server).get(constants_1.USERS_ROUTES.getRole);
        expect(res.statusCode).toEqual(401);
    }));
    it('endpoint: updateMail', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(src_1.server).post(constants_1.USERS_ROUTES.updateMail);
        expect(res.statusCode).toEqual(401);
    }));
    it('endpoint: updatePassword', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(src_1.server).post(constants_1.USERS_ROUTES.updatePassword);
        expect(res.statusCode).toEqual(401);
    }));
});
describe('Users endpoints: signup', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, database_1.emptyTestDatabase)();
        jest.spyOn(apiResponse, 'verifyUserAuthorization').mockImplementation(() => Promise.resolve({
            statusCode: 200,
            data: [{ placeholder: 'placeholder' }],
            response: 'user logged in',
        }));
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        src_1.server === null || src_1.server === void 0 ? void 0 : src_1.server.close();
    }));
    it('should create a new user', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(src_1.server)
            .post(constants_1.USERS_ROUTES.signup)
            .send(userSignUp);
        expect(res.statusCode).toEqual(201);
    }));
    it('should not create a second user with the same email', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(src_1.server)
            .post(constants_1.USERS_ROUTES.signup)
            .send(userDuplicateSignup);
        expect(res.statusCode).toEqual(400);
    }));
    it('should return a token', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(src_1.server)
            .post(constants_1.USERS_ROUTES.signup)
            .send(Object.assign(Object.assign({}, userSignUp), { email: 'newuser@mail.com' }));
        expect(res.statusCode).toEqual(201);
        expect(res.body.session.length).toBeGreaterThan(0);
    }));
    it('should add optional data to the user', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(src_1.server)
            .post(constants_1.USERS_ROUTES.updateOptionalInfo)
            .send(userOptionalData);
        expect(res.statusCode).toEqual(200);
    }));
    it('should not add optional data with wrong mail', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(src_1.server)
            .post(constants_1.USERS_ROUTES.updateOptionalInfo)
            .send(Object.assign(Object.assign({}, userOptionalData), { email: 'fake@mail.com' }));
        expect(res.statusCode).toEqual(400);
    }));
    it('should not add optional data with wrong value type', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(src_1.server)
            .post(constants_1.USERS_ROUTES.updateOptionalInfo)
            .send(Object.assign(Object.assign({}, userOptionalData), { defaultGuestNumber: 'toto' }));
        expect(res.statusCode).toEqual(400);
    }));
    it('should create a new user with a 8 character long conform password', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(src_1.server).post(constants_1.USERS_ROUTES.signup).send({
            email: 'test@eightpass.com',
            password: '12#%$ert',
        });
        expect(res.statusCode).toEqual(201);
    }));
    it('should create a new user with a 99 character long conform password', () => __awaiter(void 0, void 0, void 0, function* () {
        let longPass = '123$%@';
        for (let i = 0; i < 93; i++) {
            longPass += 'a';
        }
        const res = yield (0, supertest_1.default)(src_1.server).post(constants_1.USERS_ROUTES.signup).send({
            email: 'test@longpassword.com',
            password: longPass,
        });
        expect(res.statusCode).toEqual(201);
    }));
    it('should not create a user with an invalid email', () => __awaiter(void 0, void 0, void 0, function* () {
        const firstTry = yield (0, supertest_1.default)(src_1.server).post(constants_1.USERS_ROUTES.signup).send({
            email: 'test',
            password: 'sup3rsecretp@ssword',
        });
        expect(firstTry.statusCode).toEqual(400);
        const secondTry = yield (0, supertest_1.default)(src_1.server).post(constants_1.USERS_ROUTES.signup).send({
            email: 'test@test',
            password: 'sup3rsecretp@ssword',
        });
        expect(secondTry.statusCode).toEqual(400);
        const thirdTry = yield (0, supertest_1.default)(src_1.server).post(constants_1.USERS_ROUTES.signup).send({
            email: 'test@test.coooom',
            password: 'sup3rsecretp@ssword',
        });
        expect(thirdTry.statusCode).toEqual(400);
        const fourthTry = yield (0, supertest_1.default)(src_1.server).post(constants_1.USERS_ROUTES.signup).send({
            email: '@test.com',
            password: 'sup3rsecretp@ssword',
        });
        expect(fourthTry.statusCode).toEqual(400);
        const fifthTry = yield (0, supertest_1.default)(src_1.server).post(constants_1.USERS_ROUTES.signup).send({
            email: 'test.com',
            password: 'sup3rsecretp@ssword',
        });
        expect(fifthTry.statusCode).toEqual(400);
        const sixthTry = yield (0, supertest_1.default)(src_1.server).post(constants_1.USERS_ROUTES.signup).send({
            email: 'test@.com',
            password: 'sup3rsecretp@ssword',
        });
        expect(sixthTry.statusCode).toEqual(400);
    }));
    it('should not create a user with an invalid password', () => __awaiter(void 0, void 0, void 0, function* () {
        const firstTry = yield (0, supertest_1.default)(src_1.server).post(constants_1.USERS_ROUTES.signup).send({
            email: 'test@firsttest.com',
            password: 'su@3rte',
        });
        expect(firstTry.statusCode).toEqual(400);
        let longPass = '3!';
        for (let i = 0; i < 98; i++) {
            longPass += 'a';
        }
        const secondTry = yield (0, supertest_1.default)(src_1.server).post(constants_1.USERS_ROUTES.signup).send({
            email: 'test@secondtest.com',
            password: longPass,
        });
        expect(secondTry.statusCode).toEqual(400);
        const thirdTry = yield (0, supertest_1.default)(src_1.server).post(constants_1.USERS_ROUTES.signup).send({
            email: 'test@thirdtest.com',
            password: 'sup3rsecretpassword',
        });
        expect(thirdTry.statusCode).toEqual(400);
        const fourthTry = yield (0, supertest_1.default)(src_1.server).post(constants_1.USERS_ROUTES.signup).send({
            email: 'test@fourthtest.com',
            password: 'supersecretp@ssword',
        });
        expect(fourthTry.statusCode).toEqual(400);
        const fifthTry = yield (0, supertest_1.default)(src_1.server).post(constants_1.USERS_ROUTES.signup).send({
            email: 'test@fifthtest.com',
            password: '12345@6789',
        });
        expect(fifthTry.statusCode).toEqual(400);
        const sixthTry = yield (0, supertest_1.default)(src_1.server).post(constants_1.USERS_ROUTES.signup).send({
            email: 'test@sixthtest.com',
            password: '@!$&password',
        });
        expect(sixthTry.statusCode).toEqual(400);
    }));
});
describe('Users endpoints: login', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, database_1.emptyTestDatabase)();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        src_1.server === null || src_1.server === void 0 ? void 0 : src_1.server.close();
    }));
    it('should find the user', () => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = yield (0, supertest_1.default)(src_1.server)
            .post(constants_1.USERS_ROUTES.signup)
            .send(userSignUp);
        expect(newUser.statusCode).toEqual(201);
        const login = yield (0, supertest_1.default)(src_1.server)
            .post(constants_1.USERS_ROUTES.login)
            .send(userSignUp);
        expect(login.statusCode).toEqual(200);
    }));
    it('should return a token', () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield (0, supertest_1.default)(src_1.server)
            .post(constants_1.USERS_ROUTES.login)
            .send(userSignUp);
        expect(login.statusCode).toEqual(200);
        expect(login.body.session.length).toBeGreaterThan(0);
    }));
    it('should return a different token every time', () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield (0, supertest_1.default)(src_1.server)
            .post(constants_1.USERS_ROUTES.login)
            .send(userSignUp);
        expect(login.statusCode).toEqual(200);
        const secondLogin = yield (0, supertest_1.default)(src_1.server)
            .post(constants_1.USERS_ROUTES.login)
            .send(userSignUp);
        expect(login.statusCode).toEqual(200);
        expect(login.text).not.toBe(secondLogin.text);
    }));
    it('should not find the user with an incorrect email', () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield (0, supertest_1.default)(src_1.server).post(constants_1.USERS_ROUTES.login).send({
            email: 'teste@mail.com',
            password: userSignUp.password,
        });
        expect(login.statusCode).toEqual(400);
    }));
    it('should not find the user with an incorrect password', () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield (0, supertest_1.default)(src_1.server).post(constants_1.USERS_ROUTES.login).send({
            email: userSignUp.email,
            password: 'sup3rsecretp@sswor',
        });
        expect(login.statusCode).toEqual(400);
    }));
});
describe('Users endpoints: updateMail', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, database_1.emptyTestDatabase)();
        jest.restoreAllMocks();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        src_1.server === null || src_1.server === void 0 ? void 0 : src_1.server.close();
    }));
    it('should update a user email', () => __awaiter(void 0, void 0, void 0, function* () {
        const userSignup = yield (0, supertest_1.default)(src_1.server)
            .post(constants_1.USERS_ROUTES.signup)
            .send(userSignUp);
        expect(userSignup.statusCode).toEqual(201);
        const res = yield (0, supertest_1.default)(src_1.server)
            .post(constants_1.USERS_ROUTES.updateMail)
            .set('Authorization', JSON.parse(userSignup.text).session)
            .send({ email: 'toto@gmail.com', password: userSignUp.password });
        expect(res.statusCode).toEqual(200);
        const loggedIn = yield (0, supertest_1.default)(src_1.server)
            .post(constants_1.USERS_ROUTES.login)
            .send({ email: 'toto@gmail.com', password: userSignUp.password });
        expect(loggedIn.statusCode).toEqual(200);
    }));
    it('should not update an invalid email', () => __awaiter(void 0, void 0, void 0, function* () {
        const userLogin = yield (0, supertest_1.default)(src_1.server)
            .post(constants_1.USERS_ROUTES.login)
            .send({ email: 'toto@gmail.com', password: userSignUp.password });
        const res = yield (0, supertest_1.default)(src_1.server)
            .post(constants_1.USERS_ROUTES.updateMail)
            .set('Authorization', JSON.parse(userLogin.text).session)
            .send({ email: 'toto.com', password: userSignUp.password });
        expect(res.statusCode).toEqual(400);
    }));
});
describe('Users endpoints: updatePassword', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, database_1.emptyTestDatabase)();
        jest.restoreAllMocks();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        src_1.server === null || src_1.server === void 0 ? void 0 : src_1.server.close();
    }));
    it('should update a user password', () => __awaiter(void 0, void 0, void 0, function* () {
        const userSignup = yield (0, supertest_1.default)(src_1.server)
            .post(constants_1.USERS_ROUTES.signup)
            .send(userSignUp);
        expect(userSignup.statusCode).toEqual(201);
        const res = yield (0, supertest_1.default)(src_1.server)
            .post(constants_1.USERS_ROUTES.updatePassword)
            .set('Authorization', JSON.parse(userSignup.text).session)
            .send({
            newPassword: 'newsecr3tp@ssword',
            password: userSignUp.password,
        });
        expect(res.statusCode).toEqual(200);
        const loggedIn = yield (0, supertest_1.default)(src_1.server)
            .post(constants_1.USERS_ROUTES.login)
            .send({ email: userSignUp.email, password: 'newsecr3tp@ssword' });
        expect(loggedIn.statusCode).toEqual(200);
    }));
    it('should not update an invalid password', () => __awaiter(void 0, void 0, void 0, function* () {
        const userLogin = yield (0, supertest_1.default)(src_1.server)
            .post(constants_1.USERS_ROUTES.login)
            .send({ email: userSignUp.email, password: 'newsecr3tp@ssword' });
        const res = yield (0, supertest_1.default)(src_1.server)
            .post(constants_1.USERS_ROUTES.updateMail)
            .set('Authorization', JSON.parse(userLogin.text).session)
            .send({ newPassword: 'totoestla', password: userSignUp.password });
        expect(res.statusCode).toEqual(400);
    }));
});
