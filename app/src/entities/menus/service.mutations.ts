import mysql2 from 'mysql2';
import { dbConnexion } from '../..';
import {
  databaseMutationError,
  databaseMutationResponse,
} from '../common/apiResponses';
import { ApiResponse } from '../common/constants';
import { FormattedMenu, MENUS_TABLE } from './constants';
import { MenusQueriesService } from './service.queries';

export class MenuMutationsService {
  static createNewMenu = async (menu: FormattedMenu): Promise<ApiResponse> => {
    try {
      const DEFAULT = {
        toSqlString: function () {
          return 'DEFAULT';
        },
      };
      const query = await MenusQueriesService.getAllMenus();
      const mutation = mysql2.format(
        `INSERT INTO ${MENUS_TABLE.name} VALUES (?, ?, ?)`,
        [
          DEFAULT,
          menu.title,
          query.data && query.data.length > 0
            ? query.data[query.data.length - 1].position + 1
            : 0,
        ]
      );
      const [rows] = await dbConnexion.execute(mutation);
      return databaseMutationResponse(rows, 'create new menu');
    } catch (error) {
      return databaseMutationError('create new menu');
    }
  };

  static modifyMenu = async (menu: FormattedMenu): Promise<ApiResponse> => {
    try {
      const mutation = mysql2.format(
        `UPDATE ${MENUS_TABLE.name} SET ${MENUS_TABLE.columns.title} = ?, ${MENUS_TABLE.columns.position} = ? WHERE ${MENUS_TABLE.columns.id} = ?`,
        [menu.title, menu.position, menu.id]
      );
      const [rows] = await dbConnexion.execute(mutation);
      return databaseMutationResponse(rows, 'modify menu');
    } catch (error) {
      return databaseMutationError('modify menu');
    }
  };

  static deleteMenu = async (menu: FormattedMenu): Promise<ApiResponse> => {
    try {
      const mutation = mysql2.format(
        `DELETE FROM ${MENUS_TABLE.name} WHERE ${MENUS_TABLE.columns.id} = ?`,
        [menu.id]
      );
      const [rows] = await dbConnexion.execute(mutation);
      return databaseMutationResponse(rows, 'delete menu');
    } catch (error) {
      return databaseMutationError('delete menu');
    }
  };

  static modifyMenusPosition = async (
    position: number
  ): Promise<ApiResponse> => {
    try {
      const mutation = mysql2.format(
        `UPDATE ${MENUS_TABLE.name} SET ${MENUS_TABLE.columns.position} = ${MENUS_TABLE.columns.position} - 1 WHERE ${MENUS_TABLE.columns.position} > ?`,
        [position]
      );
      const [rows] = await dbConnexion.execute(mutation);
      return databaseMutationResponse(rows, 'modify menus position');
    } catch (error: any) {
      return databaseMutationError('modify menus position');
    }
  };
}
