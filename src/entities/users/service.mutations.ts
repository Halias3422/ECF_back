import mysql2 from 'mysql2';
import bcrypt from 'bcrypt';
import { MutationResponse } from '../common/constants';
import { UserSignupData, USERS_TABLE } from './constants';
import { dbConnexion } from '../..';
import {
  databaseMutationError,
  databaseMutationResponse,
} from '../common/apiResponses';

export class UsersMutationsService {
  static createNewUser = async (
    userInfo: UserSignupData
  ): Promise<MutationResponse> => {
    const hashedPassword = await bcrypt.hash(userInfo.password, 10);
    const DEFAULT = {
      toSqlString: function () {
        return 'DEFAULT';
      },
    };

    const mutation = mysql2.format(
      `INSERT INTO ${USERS_TABLE.name} VALUES (?, ?, ?, ?, ?, ?)`,
      [
        DEFAULT,
        userInfo.email,
        hashedPassword,
        userInfo.defaultGuestNumber,
        userInfo.defaultAllergies,
        0,
      ]
    );
    try {
      const [rows] = await dbConnexion.execute(mutation);
      return databaseMutationResponse(rows, 'create new user');
    } catch (error) {
      console.log('error = ' + error);
      return databaseMutationError('create new user');
    }
  };
}
