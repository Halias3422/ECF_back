import bcrypt from 'bcrypt';
import {
  databaseQueryResponse,
  isDuplicateResponse,
  verifyFormDataValidity,
} from '../common/apiResponses';
import { MutationResponse, QueryResponse } from '../common/constants';
import { UserLoginData, UserSignupData } from './constants';
import { UsersMutationsService } from './service.mutations';
import { UsersQueriesService } from './service.queries';

export class UsersController {
  // MUTATIONS
  static signup = async (
    userInfo: UserSignupData
  ): Promise<MutationResponse> => {
    const isValid = verifyFormDataValidity(userInfo, ['email', 'password']);
    if (isValid.statusCode !== 200) {
      return isValid;
    }
    const isSecure = this.verifyUserSignupConformity(userInfo);
    if (isSecure.statusCode !== 200) {
      return isSecure;
    }
    const isDuplicate = await UsersQueriesService.getUserByEmail(
      userInfo.email
    );
    if (isDuplicate.statusCode === 200) {
      return isDuplicateResponse('signup');
    }
    const response = await UsersMutationsService.createNewUser(userInfo);
    return response;
  };
  // QUERIES

  static login = async (userInfo: UserLoginData): Promise<QueryResponse> => {
    const retreivedUser = await UsersQueriesService.getUserByEmail(
      userInfo.email
    );
    if (retreivedUser.statusCode != 200) {
      return retreivedUser;
    }
    if (
      !(await this.comparePassword(
        retreivedUser.rows[0].password,
        userInfo.password
      ))
    ) {
      return databaseQueryResponse([], 'any user matching the provided data');
    }
    return databaseQueryResponse([1, 1], 'login');
  };

  // PRIVATE

  private static comparePassword = async (
    dbPass: string,
    userPass: string
  ): Promise<boolean> => {
    try {
      const passwordCheck = await bcrypt.compare(userPass, dbPass);
      return passwordCheck;
    } catch (error) {
      return false;
    }
  };

  /*
	mail regex :
  ^ -> beginning of string
	[\w-\.]+ ->  (matches any word (a-zA-Z0-9_), '-', '.') multiple times
  @ -> matches @
  ([\w-]+\.)+ -> ((matches any word char or '-' multiple times) matches '.') multiple times
  [\w-]{2,4} -> (matches any word char or '-') between 2 to 4 times
  $ -> matches end of string

  password regex :
	^ -> beginning of string
	(?=.*[]) -> matches a group without including in result
	[a-zA-Z] -> matches any letter
	[0-9] -> matches any number
	[!@#\$%\^&\*] -> matches any of those special characters

*/
  private static verifyUserSignupConformity = (
    userInfo: UserSignupData
  ): MutationResponse => {
    if (userInfo.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      if (
        userInfo.password.length > 7 &&
        userInfo.password.length < 100 &&
        userInfo.password.match(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/)
      ) {
        return {
          statusCode: 200,
          response: 'user info are conform',
        };
      }
    }
    return {
      statusCode: 400,
      response: 'email or password is not conform',
    };
  };
}
