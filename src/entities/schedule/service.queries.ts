import { dbConnexion } from '../..';
import {
  databaseQueryError,
  databaseQueryResponse,
} from '../common/apiResponses';
import { QueryResponse } from '../common/constants';
import { SCHEDULE_TABLE } from './constants';

export const ScheduleQueriesService = {
  getWeekSchedule: async (): Promise<QueryResponse> => {
    const query = `SELECT *  FROM ${SCHEDULE_TABLE.name}`;

    try {
      const [rows] = await dbConnexion.execute(query);
      return databaseQueryResponse(rows, 'get week schedule');
    } catch (error) {
      return databaseQueryError('get week schedule');
    }
  },
};
