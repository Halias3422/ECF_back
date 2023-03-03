import { dbConnexion } from '../..';
import { QueryResponse } from '../globalConstants';
import { DISHES_TABLE } from './constants';

export class DishesQueriesService {
  // MUTATIONS

  // QUERIES

  static getAllDishes = async (): Promise<QueryResponse> => {
    const query = `SELECT * FROM ${DISHES_TABLE.name}`;

    try {
      const [rows] = await dbConnexion.execute(query);
      if (rows.length > 0) {
        return {
          statusCode: 200,
          rows,
          response: 'Dishes successfully retreived.',
        };
      }
    } catch (error) {
      return {
        statusCode: 500,
        rows: [],
        response: 'Error: could not execute the query to retreive the dishes',
      };
    }
    return {
      statusCode: 200,
      rows: [],
      response: 'Warning: did not find any dish',
    };
  };
}
