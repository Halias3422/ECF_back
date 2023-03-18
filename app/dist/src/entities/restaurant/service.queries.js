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
exports.RestaurantQueriesService = void 0;
const __1 = require("../..");
const apiResponses_1 = require("../common/apiResponses");
const constants_1 = require("./constants");
class RestaurantQueriesService {
}
exports.RestaurantQueriesService = RestaurantQueriesService;
_a = RestaurantQueriesService;
RestaurantQueriesService.getSeatsCapacity = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = `SELECT * FROM ${constants_1.RESTAURANT_TABLE.name}`;
        const [rows] = yield __1.dbConnexion.execute(query);
        return (0, apiResponses_1.databaseQueryResponse)(rows, "get seats capacity");
    }
    catch (error) {
        return (0, apiResponses_1.databaseQueryError)("get seats capacity");
    }
});
