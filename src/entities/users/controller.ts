import bcrypt from 'bcrypt';
import { createHash } from 'crypto';
import {
  databaseQueryError,
  databaseQueryResponse,
  isDuplicateResponse,
  verifyFormDataValidity,
} from '../common/apiResponses';
import { ApiResponse } from '../common/constants';
import {
  ProtectedUserSessionData,
  UserAuthData,
  UserOptionalData,
  UserSessionData,
} from './constants';
import { UsersMutationsService } from './service.mutations';
import { UsersQueriesService } from './service.queries';

export class UsersController {
  // MUTATIONS
  static signup = async (userInfo: UserAuthData): Promise<ApiResponse> => {
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
    const response = await UsersMutationsService.createNewUser(
      userInfo,
      this.generateUserSessionToken()
    );
    if (response.statusCode !== 200) {
      return response;
    }
    return await this.getUserSessionInfo(userInfo.email, 201, 'user created');
  };

  static updateOptionalInfo = async (
    userInfo: UserOptionalData
  ): Promise<ApiResponse> => {
    const isValid = verifyFormDataValidity(userInfo, ['email']);
    if (isValid.statusCode !== 200) {
      return isValid;
    }
    const isRegistered = await UsersQueriesService.getUserByEmail(
      userInfo.email
    );
    if (isRegistered.statusCode !== 200) {
      return isRegistered;
    }
    const response = await UsersMutationsService.updateUserOptionalData(
      userInfo
    );
    return response;
  };

  static login = async (userInfo: UserAuthData): Promise<ApiResponse> => {
    const retreivedUser = await UsersQueriesService.getUserByEmail(
      userInfo.email
    );
    if (retreivedUser.statusCode != 200 || !retreivedUser.data) {
      return retreivedUser;
    }
    if (
      !(await this.comparePassword(
        retreivedUser.data[0].password,
        userInfo.password
      ))
    ) {
      return databaseQueryResponse([], 'user');
    }
    const updatedUser = await UsersMutationsService.updateUserToken(
      userInfo.email,
      this.generateUserSessionToken()
    );
    if (updatedUser.statusCode !== 200) {
      return updatedUser;
    }
    return await this.getUserSessionInfo(userInfo.email, 200, 'user logged in');
  };

  static protectedLogin = async (
    userInfo: UserAuthData
  ): Promise<ApiResponse> => {
    const retreivedUser = await UsersQueriesService.getProtectedUserByEmail(
      userInfo.email
    );
    let needPasswordReset = false;
    if (retreivedUser.statusCode != 200 || !retreivedUser.data) {
      return retreivedUser;
    }
    if (
      !(await this.comparePassword(
        retreivedUser.data[0].password,
        userInfo.password
      ))
    ) {
      if (
        !(await this.compareDefaultAdminPassword(
          retreivedUser.data[0].password,
          userInfo.password
        ))
      ) {
        return databaseQueryResponse([], 'user');
      }
      needPasswordReset = true;
    }
    const updatedUser = await UsersMutationsService.updateUserToken(
      userInfo.email,
      this.generateUserSessionToken()
    );
    if (updatedUser.statusCode !== 200) {
      return updatedUser;
    }
    return await this.getProtectedUserSessionInfo(
      userInfo.email,
      needPasswordReset ? 303 : 200,
      needPasswordReset ? 'password reset needed' : 'user logged in'
    );
  };

  // 303 -> See other (not redirecting to requested resource but another page)

  static updateProtectedDefaultPassword = async (
    sessionInfo: ProtectedUserSessionData,
    newPassword: string
  ): Promise<ApiResponse> => {
    const retreivedUser = await this.getAuthenticatedProtectedUserFromSession(
      sessionInfo
    );
    if (retreivedUser.statusCode !== 200) {
      return retreivedUser;
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updatedPassword =
      await UsersMutationsService.updateProtectedDefaultPassword(
        retreivedUser.data[0].email,
        hashedPassword
      );
    return updatedPassword;
  };

  // QUERIES

  static getUserOptionalInfo = async (
    userSessionInfo: UserSessionData
  ): Promise<ApiResponse> => {
    const retreivedUser = await this.getAuthenticatedUserFromSession(
      userSessionInfo
    );
    if (retreivedUser.statusCode !== 200) {
      return retreivedUser;
    }
    return {
      statusCode: 200,
      data: {
        defaultGuestNumber: retreivedUser.data[0].default_guests_number,
        defaultAllergies: retreivedUser.data[0].default_allergies,
      },
      response: 'user data found successfully',
    };
  };

  static getUserRole = async (userSessionInfo: UserSessionData) => {
    const retreivedUser = await this.getAuthenticatedUserFromSession(
      userSessionInfo
    );
    if (retreivedUser.statusCode !== 200) {
      return retreivedUser;
    }
    return {
      statusCode: 200,
      data: {
        isAdmin: retreivedUser.data[0].is_admin,
      },
      response: 'user role found successfully',
    };
  };

  // PRIVATE

  private static getAuthenticatedUserFromSession = async (
    userSessionInfo: UserSessionData
  ): Promise<ApiResponse> => {
    const isValid = verifyFormDataValidity(userSessionInfo, ['id', 'token']);
    if (isValid.statusCode !== 200) {
      return isValid;
    }
    const retreivedUser =
      await UsersQueriesService.getUserOptionalInfoBySessionToken(
        userSessionInfo.token
      );
    if (retreivedUser.statusCode !== 200) {
      return retreivedUser;
    }
    const idIsValid = await this.verifyUserSessionItemValidity(
      userSessionInfo.id,
      retreivedUser.data[0].id_user
    );
    if (!idIsValid) {
      return databaseQueryError('get user info');
    }
    return retreivedUser;
  };

  private static getAuthenticatedProtectedUserFromSession = async (
    userSessionInfo: ProtectedUserSessionData
  ): Promise<ApiResponse> => {
    const isValid = verifyFormDataValidity(userSessionInfo, [
      'id',
      'email',
      'token',
    ]);
    if (isValid.statusCode !== 200) {
      return isValid;
    }
    const retreivedUser =
      await UsersQueriesService.getProtectedUserBySessionToken(
        userSessionInfo.token
      );
    if (retreivedUser.statusCode !== 200) {
      return retreivedUser;
    }
    const idIsValid = await this.verifyUserSessionItemValidity(
      userSessionInfo.id,
      retreivedUser.data[0].id_user
    );
    if (!idIsValid) {
      return databaseQueryError('get protected user info');
    }
    const emailIsValid = await this.verifyUserSessionItemValidity(
      userSessionInfo.email,
      retreivedUser.data[0].email
    );
    if (!emailIsValid) {
      return databaseQueryError('get protected user info');
    }
    return retreivedUser;
  };

  private static getUserSessionInfo = async (
    email: string,
    statusCode: number,
    context: string
  ): Promise<ApiResponse> => {
    const user = await UsersQueriesService.getUserByEmail(email);
    if (user.statusCode !== 200 || !user.data) {
      return user;
    }
    const hashedId = await bcrypt.hash(user.data[0].id_user, 10);
    return {
      statusCode: statusCode,
      data: { session: `${hashedId}:${user.data[0].session_token}` },
      response: context + ' successfully',
    };
  };

  private static getProtectedUserSessionInfo = async (
    email: string,
    statusCode: number,
    context: string
  ): Promise<ApiResponse> => {
    const user = await UsersQueriesService.getProtectedUserByEmail(email);
    if ((user.statusCode !== 200 && user.statusCode !== 303) || !user.data) {
      return user;
    }
    try {
      const hashedId = await bcrypt.hash(user.data[0].id_user, 10);
      const hashedMail = await bcrypt.hash(user.data[0].email, 10);
      return {
        statusCode: statusCode,
        data: {
          session: `${hashedId}:${hashedMail}:${user.data[0].session_token}`,
        },
        response: context + ' successfully',
      };
    } catch (error) {
      return databaseQueryError('get session info');
    }
  };

  private static verifyUserSessionItemValidity = async (
    sessionItem: string,
    userItem: string
  ): Promise<boolean> => {
    try {
      return await bcrypt.compare(userItem, sessionItem);
    } catch (error) {
      return false;
    }
  };

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

  private static compareDefaultAdminPassword = async (
    dbPass: string,
    userPass: string
  ): Promise<boolean> => {
    const hashedPass = createHash('sha256').update(userPass).digest('hex');
    if (hashedPass === dbPass) {
      return true;
    }
    return false;
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
    userInfo: UserAuthData
  ): ApiResponse => {
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

  private static generateUserSessionToken = (): string => {
    const chars =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let token = '';
    for (let i = 0; i < 500; i++) {
      token += chars[Math.floor(Math.random() * chars.length)];
    }
    return token;
  };
}
