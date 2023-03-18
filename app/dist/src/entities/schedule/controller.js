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
exports.ScheduleController = void 0;
const apiResponses_1 = require("../common/apiResponses");
const service_mutations_1 = require("./service.mutations");
const service_queries_1 = require("./service.queries");
class ScheduleController {
}
exports.ScheduleController = ScheduleController;
_a = ScheduleController;
ScheduleController.getWeekSchedule = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield service_queries_1.ScheduleQueriesService.getWeekSchedule();
});
ScheduleController.modifyWeekSchedule = (weekSchedule) => __awaiter(void 0, void 0, void 0, function* () {
    for (const daySchedule of weekSchedule) {
        const isValid = (0, apiResponses_1.verifyFormDataValidity)(daySchedule, [
            "id",
            "dayOfWeek",
            "morningOpening",
            "morningClosing",
            "afternoonOpening",
            "afternoonClosing",
        ]);
        if (isValid.statusCode !== 200) {
            return isValid;
        }
        const response = yield service_mutations_1.ScheduleMutationsService.modifyDaySchedule(daySchedule);
        if (response.statusCode !== 200) {
            return response;
        }
    }
    return (0, apiResponses_1.databaseMutationResponse)({ affectedRows: 1 }, "modify week schedule");
});
