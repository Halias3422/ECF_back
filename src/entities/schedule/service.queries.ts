import { dbConnexion } from '../..';
import { QueryResponse } from '../globalConstants';
import { SCHEDULE_TABLE } from './constants';

export const ScheduleQueriesService = {
  getWeekSchedule: async (): Promise<QueryResponse> => {
    const query = `SELECT *  FROM ${SCHEDULE_TABLE.name}`;

    try {
      const [rows] = await dbConnexion.execute(query);
      if (rows.length > 0) {
        return {
          statusCode: 200,
          rows,
          response: 'Week schedule successfully retreived.',
        };
      }
    } catch (error) {
      return {
        statusCode: 500,
        rows: [],
        response:
          "Error: could not execute the query to retreive the week's schedule",
      };
    }
    return {
      statusCode: 200,
      rows: [],
      response: 'Warning: no entries in the Schedule table.',
    };
  },
};
