import mysql2 from 'mysql2';
import { dbConnexion } from '../..';
import { databaseQueryError, databaseQueryResponse } from '../databaseResponse';
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
      return databaseQueryResponse(rows, 'category by ID');
    } catch (error) {
      return databaseQueryError('get category by ID');
    }
  };

  static getCategoryByName = async (categoryName: string) => {
    const query = mysql2.format(
      `SELECT * FROM ${CATEGORIES_TABLE.name} WHERE ${CATEGORIES_TABLE.columns.name} = ?`,
      [categoryName]
    );
    try {
      const [rows] = await dbConnexion.execute(query);
      return databaseQueryResponse(rows, 'category by name');
    } catch (error) {
      return databaseQueryError('category by name');
    }
  };
}
