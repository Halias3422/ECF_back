import { dbConnexion } from '../..';
import { QueryResponse } from '../globalConstants';
import { MENUS_TABLE } from './constants';

export const MenusQueriesService = {
  getAllMenus: async (): Promise<QueryResponse> => {
    const query = `SELECT ${MENUS_TABLE.columns.id}, ${MENUS_TABLE.columns.menuTitle} as title FROM ${MENUS_TABLE.name}`;

    console.log('query = ' + query);
    try {
      const [rows] = await dbConnexion.execute(query);
      if (rows.length > 0) {
        return {
          statusCode: 200,
          rows,
          response: 'Menus successfully retreived.',
        };
      }
    } catch (error) {
      return {
        statusCode: 500,
        rows: [],
        response: 'Error: could not execute the query to retreive the menus',
      };
    }
    return {
      statusCode: 200,
      rows: [],
      response: 'Warning: did not find any menu',
    };
  },
};
