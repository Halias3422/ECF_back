import mysql2 from 'mysql2';
import { dbConnexion } from '../..';
import {
  databaseQueryError,
  databaseQueryResponse,
} from '../common/apiResponses';
import { ApiResponse } from '../common/constants';
import { MENUS_TABLE } from './constants';

export class MenusQueriesService {
  static getAllMenus = async (): Promise<ApiResponse> => {
    try {
      const query = `SELECT * FROM ${MENUS_TABLE.name} ORDER BY ${MENUS_TABLE.columns.position} ASC`;

      const [rows] = await dbConnexion.execute(query);
      return databaseQueryResponse(rows, 'get all menus');
    } catch (error) {
      return databaseQueryError('get all menus');
    }
  };

  static getMenuByTitle = async (menuTitle: string): Promise<ApiResponse> => {
    try {
      const query = mysql2.format(
        `SELECT * FROM ${MENUS_TABLE.name} WHERE ${MENUS_TABLE.columns.title} = ?`,
        [menuTitle]
      );

      const [rows] = await dbConnexion.execute(query);
      return databaseQueryResponse(rows, 'get menu by title');
    } catch (error) {
      return databaseQueryError('get menu by title');
    }
  };

  static verifyDuplicateMenuByTitleAndId = async (
    menuTitle: string,
    menuId: string
  ): Promise<ApiResponse> => {
    try {
      const query = mysql2.format(
        `SELECT * WHERE ${MENUS_TABLE.columns.title} = ? AND ${MENUS_TABLE.columns.id} != ?`,
        [menuTitle, menuId]
      );

      const [rows] = await dbConnexion.execute(query);
      return databaseQueryResponse(
        rows,
        'verify menu duplicate by title and id'
      );
    } catch (error) {
      return databaseQueryError('verify meny duplicate by title and id');
    }
  };
}
