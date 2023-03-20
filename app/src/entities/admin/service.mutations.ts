import mysql2 from 'mysql2';
import * as bcrypt from 'bcrypt';
import { dbConnexion } from '../..';
import {
  databaseMutationError,
  databaseMutationResponse,
} from '../common/apiResponses';
import { ApiResponse } from '../common/constants';
import { USERS_TABLE } from '../users/constants';

export class AdminMutationsService {
  static updateAdminMail = async (
    newMail: string,
    userId: string
  ): Promise<ApiResponse> => {
    try {
      const mutation = mysql2.format(
        `UPDATE ${USERS_TABLE.name} SET ${USERS_TABLE.columns.email} = ? WHERE ${USERS_TABLE.columns.id} = ? AND ${USERS_TABLE.columns.isAdmin} = 1`,
        [newMail, userId]
      );
      const [rows] = await dbConnexion.execute(mutation);
      return databaseMutationResponse(rows, 'update user mail');
    } catch (error) {
      return databaseMutationError('update user mail');
    }
  };

  static updateAdminPassword = async (
    newPassword: string,
    userId: string
  ): Promise<ApiResponse> => {
    try {
      const newHashedPassword = await bcrypt.hash(newPassword, 10);
      const mutation = mysql2.format(
        `UPDATE ${USERS_TABLE.name} SET ${USERS_TABLE.columns.password} = ? WHERE ${USERS_TABLE.columns.id} = ? AND ${USERS_TABLE.columns.isAdmin} = 1`,
        [newHashedPassword, userId]
      );
      const [rows] = await dbConnexion.execute(mutation);
      return databaseMutationResponse(rows, 'update user password');
    } catch (error) {
      return databaseMutationError('update user password');
    }
  };
}
