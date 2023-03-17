import mysql2 from "mysql2";
import { dbConnexion } from "../..";
import {
  databaseMutationError,
  databaseMutationResponse,
} from "../common/apiResponses";
import { DaySchedule, SCHEDULE_TABLE } from "./constants";

export class ScheduleMutationsService {
  static modifyDaySchedule = async (daySchedule: DaySchedule) => {
    try {
      const mutation = mysql2.format(
        `UPDATE ${SCHEDULE_TABLE.name} SET ${SCHEDULE_TABLE.columns.morningOpening} = ?, ${SCHEDULE_TABLE.columns.morningClosing} = ?, ${SCHEDULE_TABLE.columns.afternoonOpening} = ?, ${SCHEDULE_TABLE.columns.afternoonClosing} = ? WHERE ${SCHEDULE_TABLE.columns.id} = ?`,
        [
          daySchedule.morningOpening,
          daySchedule.morningClosing,
          daySchedule.afternoonOpening,
          daySchedule.afternoonClosing,
          daySchedule.id,
        ]
      );
      const [rows] = await dbConnexion.execute(mutation);
      return databaseMutationResponse(rows, "modify day schedule");
    } catch (error) {
      return databaseMutationError("modify day capacity");
    }
  };
}
