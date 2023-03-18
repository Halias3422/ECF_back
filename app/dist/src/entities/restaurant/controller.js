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
exports.RestaurantController = void 0;
const service_mutations_1 = require("./service.mutations");
const service_queries_1 = require("./service.queries");
class RestaurantController {
}
exports.RestaurantController = RestaurantController;
_a = RestaurantController;
// QUERIES
RestaurantController.getSeatsCapacity = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield service_queries_1.RestaurantQueriesService.getSeatsCapacity();
    return response;
});
// MUTATIONS
RestaurantController.modifySeatsCapacity = (newNumber) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield service_mutations_1.RestaurantMutationsService.modifySeatsCapacity(newNumber);
    return response;
});
