import mysql2 from "mysql2";
import { dbConnexion } from "../..";
import {
  databaseQueryError,
  databaseQueryResponse,
} from "../common/apiResponses";
import { ApiResponse } from "../common/constants";
import { USERS_TABLE } from "./constants";

export class UsersQueriesService {
  static getUserByEmail = async (email: string): Promise<ApiResponse> => {
    try {
      const query = mysql2.format(
        `SELECT * FROM ${USERS_TABLE.name} WHERE ${USERS_TABLE.columns.email} = ?`,
        [email]
      );
      const [rows] = await dbConnexion.execute(query);
      return databaseQueryResponse(rows, "user");
    } catch (error) {
      return databaseQueryError("get user");
    }
  };

  static getUserBySessionToken = async (
    sessionToken: string
  ): Promise<ApiResponse> => {
    try {
      const query = mysql2.format(
        `SELECT * FROM ${USERS_TABLE.name} WHERE ${USERS_TABLE.columns.sessionToken} = ?`,
        [sessionToken]
      );
      const [rows] = await dbConnexion.execute(query);
      return databaseQueryResponse(rows, "user");
    } catch (error) {
      return databaseQueryError("get user");
    }
  };
}
