import mysql2 from 'mysql2';
import { dbConnexion } from '../..';
import {
  databaseQueryError,
  databaseQueryResponse,
} from '../common/apiResponses';
import { QueryResponse } from '../common/constants';
import { FORMULAS_TABLE } from './constants';

export const FormulasQueriesService = {
  getAllFormulasFromMenuId: async (menuId: string): Promise<QueryResponse> => {
    const query = mysql2.format(
      `SELECT ${FORMULAS_TABLE.columns.formulaTitle} as title, ${FORMULAS_TABLE.columns.description}, ${FORMULAS_TABLE.columns.price} FROM ${FORMULAS_TABLE.name} WHERE ${FORMULAS_TABLE.name}.${FORMULAS_TABLE.columns.menuId} = ?`,
      [menuId]
    );
    try {
      const [rows] = await dbConnexion.execute(query);
      return databaseQueryResponse(rows, 'get all formulas by menu ID');
    } catch (error) {
      return databaseQueryError('get all formulas by menu ID');
    }
  },
};
