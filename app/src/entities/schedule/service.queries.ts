import { dbConnexion } from "../..";
import {
  databaseQueryError,
  databaseQueryResponse,
} from "../common/apiResponses";
import { ApiResponse } from "../common/constants";
import { SCHEDULE_TABLE } from "./constants";

export class ScheduleQueriesService {
  static getWeekSchedule = async (): Promise<ApiResponse> => {
    const query = `SELECT * FROM ${SCHEDULE_TABLE.name}`;

    try {
      const [rows] = await dbConnexion.execute(query);
      return databaseQueryResponse(rows, "get week schedule");
    } catch (error) {
      return databaseQueryError("get week schedule");
    }
  };
}
