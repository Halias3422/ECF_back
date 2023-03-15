import mysql2 from 'mysql2';
import { dbConnexion } from '../..';
import {
  databaseQueryError,
  databaseQueryResponse,
} from '../common/apiResponses';
import { ApiResponse } from '../common/constants';
import { RESERVATIONS_TABLE } from './constants';

export class ReservationsQueriesService {
  static getAllPartialReservationsByDate = async (
    date: string
  ): Promise<ApiResponse> => {
    try {
      const query = mysql2.format(
        `SELECT * FROM ${RESERVATIONS_TABLE.name} WHERE ${RESERVATIONS_TABLE.columns.date} = ?`,
        [date]
      );

      const [rows] = await dbConnexion.execute(query);
      if (rows.length === 0) {
        return {
          statusCode: 200,
          response: 'No reservation scheduled on that day',
          data: [],
        };
      }
      return databaseQueryResponse(rows, 'get partial reservation info by day');
    } catch (error) {
      return databaseQueryError('get partial reservation info by day');
    }
  };

  static getUserReservations = async (userId: string): Promise<ApiResponse> => {
    try {
      const query = mysql2.format(
        `SELECT * FROM ${RESERVATIONS_TABLE.name} WHERE ${RESERVATIONS_TABLE.columns.userId} = ?`,
        [userId]
      );

      const [rows] = await dbConnexion.execute(query);
      return databaseQueryResponse(rows, 'get user reservations');
    } catch (error) {
      return databaseQueryError('get user reservations');
    }
  };
}
