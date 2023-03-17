import mysql2 from "mysql2";
import { dbConnexion } from "../..";
import {
  databaseQueryError,
  databaseQueryResponse,
} from "../common/apiResponses";
import { ApiResponse } from "../common/constants";
import { CATEGORIES_TABLE } from "./constant";

export class CategoriesQueriesService {
  static getCategoryById = async (categoryId: string): Promise<ApiResponse> => {
    try {
      const query = mysql2.format(
        `SELECT * FROM ${CATEGORIES_TABLE.name} WHERE ${CATEGORIES_TABLE.columns.id} = ?`,
        [categoryId]
      );
      const [rows] = await dbConnexion.execute(query);
      return databaseQueryResponse(rows, "category by ID");
    } catch (error) {
      return databaseQueryError("get category by ID");
    }
  };

  static getCategoryByName = async (
    categoryName: string
  ): Promise<ApiResponse> => {
    try {
      const query = mysql2.format(
        `SELECT * FROM ${CATEGORIES_TABLE.name} WHERE ${CATEGORIES_TABLE.columns.name} = ?`,
        [categoryName]
      );
      const [rows] = await dbConnexion.execute(query);
      return databaseQueryResponse(rows, "category by name");
    } catch (error) {
      return databaseQueryError("category by name");
    }
  };

  static getAllCategories = async (): Promise<ApiResponse> => {
    try {
      const query = `SELECT * FROM ${CATEGORIES_TABLE.name}`;
      const [rows] = await dbConnexion.execute(query);
      return databaseQueryResponse(rows, "get all categories");
    } catch (error) {
      return databaseQueryError("get all categories");
    }
  };
}
