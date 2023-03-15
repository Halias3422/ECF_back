import mysql2 from 'mysql2';
import { dbConnexion } from '../..';
import {
  databaseQueryError,
  databaseQueryResponse,
} from '../common/apiResponses';
import { ApiResponse } from '../common/constants';
import { USERS_TABLE } from '../users/constants';
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

  static getAllReservationsWithAssociatedMail =
    async (): Promise<ApiResponse> => {
      try {
        const query = `SELECT ${RESERVATIONS_TABLE.name}.*, ${USERS_TABLE.name}.${USERS_TABLE.columns.email} as userMail FROM ${RESERVATIONS_TABLE.name} LEFT JOIN ${USERS_TABLE.name} ON ${RESERVATIONS_TABLE.name}.${RESERVATIONS_TABLE.columns.userId} = ${USERS_TABLE.name}.${USERS_TABLE.columns.id}`;

        const [rows] = await dbConnexion.execute(query);
        if (rows.length === 0) {
          return {
            statusCode: 200,
            data: [],
            response: 'No reservations found',
          };
        }
        return databaseQueryResponse(
          rows,
          'get all reservations with associated user mail'
        );
      } catch (error) {
        return databaseQueryError(
          'get all reservations with associated user mail '
        );
      }
    };
}
