import { dbConnexion } from '../..';
import {
  databaseQueryError,
  databaseQueryResponse,
} from '../common/apiResponses';
import { ApiResponse } from '../common/constants';
import { SCHEDULE_TABLE } from './constants';

export class ScheduleQueriesService {
  static getWeekSchedule = async (): Promise<ApiResponse> => {
    const query = `SELECT ${SCHEDULE_TABLE.columns.id} as id, ${SCHEDULE_TABLE.columns.dayOfWeek} as dayOfWeek, ${SCHEDULE_TABLE.columns.morningOpening} as morningOpening, ${SCHEDULE_TABLE.columns.morningClosing} as morningClosing, ${SCHEDULE_TABLE.columns.afternoonOpening} as afternoonOpening, ${SCHEDULE_TABLE.columns.afternoonClosing} as afternoonClosing FROM ${SCHEDULE_TABLE.name}`;

    try {
      const [rows] = await dbConnexion.execute(query);
      return databaseQueryResponse(rows, 'get week schedule');
    } catch (error) {
      return databaseQueryError('get week schedule');
    }
  };
}
