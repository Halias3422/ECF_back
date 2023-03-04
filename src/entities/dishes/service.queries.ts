import mysql2 from 'mysql2';
import { dbConnexion } from '../..';
import {
  databaseQueryError,
  databaseQueryResponse,
} from '../common/apiResponses';
import { QueryResponse } from '../common/constants';
import { DISHES_TABLE } from './constants';

export class DishesQueriesService {
  static getDishByTitle = async (dishTitle: string): Promise<QueryResponse> => {
    const query = mysql2.format(`SELECT * FROM ? WHERE ? = ?`, [
      DISHES_TABLE.name,
      DISHES_TABLE.columns.title,
      dishTitle,
    ]);
    try {
      const [rows] = await dbConnexion.execute(query);
      return databaseQueryResponse(rows, 'get dish by title');
    } catch (error) {
      return databaseQueryError('get dish by title');
    }
  };

  static getAllDishes = async (): Promise<QueryResponse> => {
    const query = `SELECT * FROM ${DISHES_TABLE.name}`;

    try {
      const [rows] = await dbConnexion.execute(query);
      return databaseQueryResponse(rows, 'get all dishes');
    } catch (error) {
      return databaseQueryError('get all dishes');
    }
  };
}
