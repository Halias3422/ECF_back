import mysql2 from 'mysql2';
import { dbConnexion } from '../..';
import {
  databaseQueryError,
  databaseQueryResponse,
} from '../common/apiResponses';
import { ApiResponse } from '../common/constants';
import { USERS_TABLE } from '../users/constants';

export class AdminQueriesService {
  static getProtectedUserByEmail = async (
    email: string
  ): Promise<ApiResponse> => {
    try {
      const query = mysql2.format(
        `SELECT * FROM ${USERS_TABLE.name} WHERE ${USERS_TABLE.columns.email} = ?`,
        [email]
      );
      const [rows] = await dbConnexion.execute(query);
      return databaseQueryResponse(rows, 'user');
    } catch (error) {
      return databaseQueryError('get user');
    }
  };

  static getProtectedUserBySessionToken = async (
    token: string
  ): Promise<ApiResponse> => {
    try {
      const query = mysql2.format(
        `SELECT * FROM ${USERS_TABLE.name} WHERE ${USERS_TABLE.columns.sessionToken} = ?`,
        [token]
      );
      const [rows] = await dbConnexion.execute(query);
      return databaseQueryResponse(rows, 'protected user');
    } catch (error) {
      return databaseQueryError('get protected user');
    }
  };
}
