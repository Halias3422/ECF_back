import mysql2 from 'mysql2';
import { dbConnexion } from '../..';
import {
  databaseQueryError,
  databaseQueryResponse,
} from '../common/apiResponses';
import { ApiResponse } from '../common/constants';
import { DISHES_TABLE, DishFormData } from './constants';

export class DishesQueriesService {
  static getDishByTitle = async (dishTitle: string): Promise<ApiResponse> => {
    try {
      const query = mysql2.format(
        `SELECT * FROM ${DISHES_TABLE.name} WHERE ${DISHES_TABLE.name}.${DISHES_TABLE.columns.title} = ?`,
        [dishTitle]
      );
      const [rows] = await dbConnexion.execute(query);
      return databaseQueryResponse(rows, 'get dish by title');
    } catch (error) {
      return databaseQueryError('get dish by title');
    }
  };

  static getAllDishes = async (): Promise<ApiResponse> => {
    try {
      const query = `SELECT * FROM ${DISHES_TABLE.name} ORDER BY ${DISHES_TABLE.columns.position} ASC`;
      const [rows] = await dbConnexion.execute(query);
      return databaseQueryResponse(rows, 'get all dishes');
    } catch (error) {
      return databaseQueryError('get all dishes');
    }
  };

  static getAllDishesByCategoryId = async (
    dishId: string
  ): Promise<ApiResponse> => {
    try {
      const query = mysql2.format(
        `SELECT * FROM ${DISHES_TABLE.name} WHERE ${DISHES_TABLE.columns.categoryId} = ? ORDER BY ${DISHES_TABLE.columns.position} ASC`,
        [dishId]
      );
      const [rows] = await dbConnexion.execute(query);
      return databaseQueryResponse(rows, 'get all dishes by ID');
    } catch (error) {
      return databaseQueryError('get all dishes by ID');
    }
  };

  static getDishDuplicate = async (
    dish: DishFormData
  ): Promise<ApiResponse> => {
    try {
      let query = mysql2.format(
        `SELECT * FROM ${DISHES_TABLE.name} WHERE (${DISHES_TABLE.columns.image} = ? OR ${DISHES_TABLE.columns.title} = ?) `,
        [dish.image, dish.title]
      );
      if (dish.id) {
        query += mysql2.format(` AND ${DISHES_TABLE.columns.id} != ?`, [
          dish.id,
        ]);
      }

      const [rows] = await dbConnexion.execute(query);
      if (rows.length > 0) {
      }
      return databaseQueryResponse(rows, 'get dish by image or title');
    } catch (error) {
      return databaseQueryError('get gallery dish by image or title');
    }
  };
}
