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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDatabaseConnexion = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
const constants_1 = require("../entities/users/constants");
const testDatabaseConnexion = (dbConnexion) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield dbConnexion.execute(`SELECT * from ${constants_1.USERS_TABLE.name}`);
        console.log("Connexion to the database successfully established.");
    }
    catch (error) {
        throw new Error("Error: could not connect to the database: " + JSON.stringify(error));
    }
});
const addFirstUser = (dbConnexion) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = `SELECT * FROM ${constants_1.USERS_TABLE.name}`;
        const [rows] = yield dbConnexion.execute(users);
        if (rows.length === 0) {
            const insert = mysql2_1.default.format(`INSERT INTO ${constants_1.USERS_TABLE.name} VALUES (DEFAULT, 'admin@mail.com', '$2a$10$ibNTirYwGrrMwrJOq0GDje4lYAfKYaXaJV/TtLR4.7VBPHbhLu5eC', NULL, NULL, NULL, true)`);
            const [rows] = yield dbConnexion.execute(insert);
            if (rows.affectedRows !== 1) {
                throw new Error("Error creating first user");
            }
        }
    }
    catch (error) {
        throw new Error("Error creating first user" + JSON.stringify(error));
    }
});
const initDatabaseConnexion = () => {
    console.log("host = " + process.env.MYSQL_HOST);
    console.log("user = " + process.env.MYSQL_USER);
    console.log("pwd = " + process.env.MYSQL_PASSWORD);
    console.log("database = " + process.env.MYSQL_DATABASE);
    console.log("port = " + process.env.MYSQL_PORT);
    const dbConnexion = mysql2_1.default
        .createPool({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        port: parseInt(process.env.MYSQL_PORT),
    })
        .promise();
    testDatabaseConnexion(dbConnexion);
    addFirstUser(dbConnexion);
    return dbConnexion;
};
exports.initDatabaseConnexion = initDatabaseConnexion;
