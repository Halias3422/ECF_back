import { dbConnexion } from '../..';
import {
  databaseQueryError,
  databaseQueryResponse,
} from '../common/apiResponses';
import { ApiResponse } from '../common/constants';
import { MENUS_TABLE } from './constants';

export class MenusQueriesService {
  static getAllMenus = async (): Promise<ApiResponse> => {
    const query = `SELECT ${MENUS_TABLE.columns.id} as id, ${MENUS_TABLE.columns.menuTitle} as title FROM ${MENUS_TABLE.name}`;

    try {
      const [rows] = await dbConnexion.execute(query);
      return databaseQueryResponse(rows, 'get all menus');
    } catch (error) {
      return databaseQueryError('get all menus');
    }
  };
}
