import mysql2 from 'mysql2';
import { dbConnexion } from '../..';
import { CATEGORIES_TABLE } from './constant';

export class CategoriesQueriesService {
  // QUERIES

  static getCategoryById = async (categoryId: string) => {
    const query = mysql2.format(
      `SELECT * FROM ${CATEGORIES_TABLE.name} WHERE ${CATEGORIES_TABLE.columns.id} = ?`,
      [categoryId]
    );
    try {
      const [rows] = await dbConnexion.execute(query);
      if (rows.length > 0) {
        return {
          statusCode: 200,
          rows,
          response: 'Category successfully retreived from ID.',
        };
      }
    } catch (error) {
      return {
        statusCode: 500,
        rows: [],
        response:
          'Error: could not execute the query to retreive the Category from ID',
      };
    }
    return {
      statusCode: 200,
      rows: [],
      response: 'Warning: did not find any Category for ID: ' + categoryId,
    };
  };
}
