import bcrypt from "bcrypt";
import {
  databaseQueryError,
  databaseQueryResponse,
  verifyFormDataValidity,
} from "../common/apiResponses";
import { ApiResponse } from "../common/constants";
import { UserAuthData, UserData } from "../users/constants";
import { UsersController } from "../users/controller";
import { UsersMutationsService } from "../users/service.mutations";
import { AdminAuthData, AdminSessionData } from "./constants";
import { AdminMutationsService } from "./service.mutations";
import { AdminQueriesService } from "./service.queries";

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
      return databaseQueryResponse([], "user");
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
      needPasswordReset ? "password reset needed" : "user logged in"
    );
  };

  static getAuthenticatedProtectedUserFromSession = async (
    userSessionInfo: AdminSessionData
  ): Promise<ApiResponse> => {
    const isValid = verifyFormDataValidity(userSessionInfo, [
      "id",
      "email",
      "token",
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
      retreivedUser.data[0].id
    );
    if (!idIsValid) {
      return databaseQueryError("get protected user info");
    }
    const emailIsValid = await this.verifyUserSessionItemValidity(
      userSessionInfo.email,
      retreivedUser.data[0].email
    );
    if (!emailIsValid) {
      return databaseQueryError("get protected user info");
    }
    return retreivedUser;
  };

  static updateMail = async (
    userInfo: UserAuthData,
    dbUser: UserData
  ): Promise<ApiResponse> => {
    if (!(await this.comparePassword(dbUser.password, userInfo.password))) {
      return {
        statusCode: 400,
        response: "Mot de passe incorrect.",
      };
    }
    const isSecure = UsersController.verifyUserSignupConformity(userInfo);
    if (isSecure.statusCode !== 200) {
      return { ...isSecure, response: "Le nouveau mail n'est pas conforme" };
    }
    const modifiedMail = await AdminMutationsService.updateAdminMail(
      userInfo.email,
      dbUser.id
    );
    if (modifiedMail.statusCode !== 200) {
      return {
        statusCode: 400,
        response: "Erreur lors du traitement. Veuillez réessayer plus tard",
      };
    }
    return await this.protectedLogin(userInfo);
  };

  static updatePassword = async (
    userInfo: any,
    dbUser: UserData
  ): Promise<ApiResponse> => {
    if (!(await this.comparePassword(dbUser.password, userInfo.password))) {
      return {
        statusCode: 400,
        response: "Mot de passe incorrect.",
      };
    }
    const isSecure = UsersController.verifyUserSignupConformity({
      email: dbUser.email,
      password: userInfo.newPassword,
    });
    if (isSecure.statusCode !== 200) {
      return {
        ...isSecure,
        response: "Le nouveau mot de passe n'est pas conforme",
      };
    }
    const modifiedPassword = await AdminMutationsService.updateAdminPassword(
      userInfo.newPassword,
      dbUser.id
    );
    if (modifiedPassword.statusCode !== 200) {
      return {
        statusCode: 400,
        response: "Erreur lors du traitement. Veuillez réessayer plus tard",
      };
    }
    return modifiedPassword;
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
      const hashedId = await bcrypt.hash(user.data[0].id, 10);
      const hashedMail = await bcrypt.hash(user.data[0].email, 10);
      return {
        statusCode: statusCode,
        data: {
          session: `${hashedId}:${hashedMail}:${user.data[0].sessionToken}`,
        },
        response: context + " successfully",
      };
    } catch (error) {
      return databaseQueryError("get session info");
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
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let token = "";
    for (let i = 0; i < 500; i++) {
      token += chars[Math.floor(Math.random() * chars.length)];
    }
    return token;
  };
}
