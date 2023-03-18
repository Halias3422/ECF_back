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
exports.emptyTestDatabase = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
const __1 = require("..");
const emptyTestDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    if (process.env.ENVIRONMENT === "test") {
        const tablesQuery = mysql2_1.default.format(`SELECT table_name FROM information_schema.tables WHERE TABLE_SCHEMA = (?)`, process.env.DB_NAME);
        const tables = yield __1.dbConnexion.execute(tablesQuery);
        yield __1.dbConnexion.execute("SET foreign_key_checks = 0");
        for (const table of tables[0]) {
            for (const key in table) {
                yield __1.dbConnexion.execute(`TRUNCATE TABLE ${table[key]}`);
            }
        }
        yield __1.dbConnexion.execute("SET foreign_key_checks = 1");
    }
});
exports.emptyTestDatabase = emptyTestDatabase;
