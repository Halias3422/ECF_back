import mysql2 from 'mysql2';
import { dbConnexion } from '../..';
import {
  databaseQueryError,
  databaseQueryResponse,
} from '../common/apiResponses';
import { ApiResponse } from '../common/constants';
import { FORMULAS_TABLE } from './constants';

export class FormulasQueriesService {
  static getAllFormulasFromMenuId = async (
    menuId: string
  ): Promise<ApiResponse> => {
    const query = mysql2.format(
      `SELECT * FROM ${FORMULAS_TABLE.name} WHERE ${FORMULAS_TABLE.name}.${FORMULAS_TABLE.columns.menuId} = ? ORDER BY ${FORMULAS_TABLE.columns.position} ASC`,
      [menuId]
    );
    try {
      const [rows] = await dbConnexion.execute(query);
      return databaseQueryResponse(rows, 'get all formulas by menu ID');
    } catch (error) {
      return databaseQueryError('get all formulas by menu ID');
    }
  };
}
