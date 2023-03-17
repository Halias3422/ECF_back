import {
  databaseMutationResponse,
  verifyFormDataValidity,
} from "../common/apiResponses";
import { ApiResponse } from "../common/constants";
import { DaySchedule } from "./constants";
import { ScheduleMutationsService } from "./service.mutations";
import { ScheduleQueriesService } from "./service.queries";

export class ScheduleController {
  static getWeekSchedule = async (): Promise<ApiResponse> => {
    return await ScheduleQueriesService.getWeekSchedule();
  };

  static modifyWeekSchedule = async (
    weekSchedule: DaySchedule[]
  ): Promise<ApiResponse> => {
    for (const daySchedule of weekSchedule) {
      const isValid = verifyFormDataValidity(daySchedule, [
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
      const response = await ScheduleMutationsService.modifyDaySchedule(
        daySchedule
      );
      if (response.statusCode !== 200) {
        return response;
      }
    }
    return databaseMutationResponse(
      { affectedRows: 1 },
      "modify week schedule"
    );
  };
}
