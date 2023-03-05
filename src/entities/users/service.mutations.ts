import mysql2 from 'mysql2';
import bcrypt from 'bcrypt';
import { MutationResponse } from '../common/constants';
import { UserAuthData, UserOptionalData, USERS_TABLE } from './constants';
import { dbConnexion } from '../..';
import {
  databaseMutationError,
  databaseMutationResponse,
} from '../common/apiResponses';

export class UsersMutationsService {
  static createNewUser = async (
    userInfo: UserAuthData
  ): Promise<MutationResponse> => {
    const hashedPassword = await bcrypt.hash(userInfo.password, 10);
    const DEFAULT = {
      toSqlString: function () {
        return 'DEFAULT';
      },
    };

    const mutation = mysql2.format(
      `INSERT INTO ${USERS_TABLE.name} VALUES (?, ?, ?, ?, ?, ?)`,
      [DEFAULT, userInfo.email, hashedPassword, 1, null, 0]
    );
    try {
      const [rows] = await dbConnexion.execute(mutation);
      return databaseMutationResponse(rows, 'create new user');
    } catch (error) {
      return databaseMutationError('create new user');
    }
  };

  static updateUserOptionalData = async (userInfo: UserOptionalData) => {
    const mutation = mysql2.format(
      `UPDATE ${USERS_TABLE.name} SET ${USERS_TABLE.columns.defaultGuestNumber} = ?, ${USERS_TABLE.columns.defaultAllergies} = ? WHERE ${USERS_TABLE.columns.email} = ?`,
      [userInfo.defaultGuestNumber, userInfo.defaultAllergies, userInfo.email]
    );
    try {
      const [rows] = await dbConnexion.execute(mutation);
      return databaseMutationResponse(rows, 'update user optional data');
    } catch (error) {
      return databaseMutationError('update user optional data');
    }
  };
}