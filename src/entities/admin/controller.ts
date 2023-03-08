import bcrypt from 'bcrypt';
import { createHash } from 'crypto';
import {
  databaseQueryError,
  databaseQueryResponse,
  verifyFormDataValidity,
} from '../common/apiResponses';
import { ApiResponse } from '../common/constants';
import { UsersMutationsService } from '../users/service.mutations';
import { AdminAuthData, AdminSessionData } from './constants';
import { AdminMutationsService } from './service.mutations';
import { AdminQueriesService } from './service.queries';

export class AdminController {
  static protectedLogin = async (
    userInfo: AdminAuthData
  ): Promise<ApiResponse> => {
    const retreivedUser = await AdminQueriesService.getProtectedUserByEmail(
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
    sessionInfo: AdminSessionData,
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
      await AdminMutationsService.updateProtectedDefaultPassword(
        retreivedUser.data[0].email,
        hashedPassword
      );
    return updatedPassword;
  };

  static getAuthenticatedProtectedUserFromSession = async (
    userSessionInfo: AdminSessionData
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
      await AdminQueriesService.getProtectedUserBySessionToken(
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

  private static getProtectedUserSessionInfo = async (
    email: string,
    statusCode: number,
    context: string
  ): Promise<ApiResponse> => {
    const user = await AdminQueriesService.getProtectedUserByEmail(email);
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
