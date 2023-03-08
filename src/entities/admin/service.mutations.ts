import mysql2 from 'mysql2';
import { dbConnexion } from '../..';
import {
  databaseMutationError,
  databaseMutationResponse,
} from '../common/apiResponses';
import { ApiResponse } from '../common/constants';
import { USERS_TABLE } from '../users/constants';

export class AdminMutationsService {
  static updateProtectedDefaultPassword = async (
    email: string,
    newPassword: string
  ): Promise<ApiResponse> => {
    try {
      const mutation = mysql2.format(
        `UPDATE ${USERS_TABLE.name} SET ${USERS_TABLE.columns.password} = ? WHERE ${USERS_TABLE.columns.email} = ?`,
        [newPassword, email]
      );
      const [rows] = await dbConnexion.execute(mutation);
      return databaseMutationResponse(rows, 'update protected user credential');
    } catch (error) {
      return databaseMutationError('update protected user credential');
    }
  };
}
