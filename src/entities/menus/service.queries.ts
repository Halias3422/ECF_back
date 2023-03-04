import { dbConnexion } from '../..';
import { databaseQueryError, databaseQueryResponse } from '../databaseResponse';
import { QueryResponse } from '../globalConstants';
import { MENUS_TABLE } from './constants';

export const MenusQueriesService = {
  getAllMenus: async (): Promise<QueryResponse> => {
    const query = `SELECT ${MENUS_TABLE.columns.id}, ${MENUS_TABLE.columns.menuTitle} as title FROM ${MENUS_TABLE.name}`;

    try {
      const [rows] = await dbConnexion.execute(query);
      return databaseQueryResponse(rows, 'get all menus');
    } catch (error) {
      return databaseQueryError('get all menus');
    }
  },
};
