import mysql2 from 'mysql2';
import { dbConnexion } from '../..';
import { QueryResponse } from '../globalConstants';
import { FORMULAS_TABLE } from './constants';

export const FormulasQueriesService = {
  getAllFormulasFromMenuId: async (menuId: string): Promise<QueryResponse> => {
    const query = mysql2.format(
      `SELECT ${FORMULAS_TABLE.columns.formulaTitle} as title, ${FORMULAS_TABLE.columns.description}, ${FORMULAS_TABLE.columns.price} FROM ${FORMULAS_TABLE.name} WHERE ${FORMULAS_TABLE.name}.${FORMULAS_TABLE.columns.menuId} = ?`,
      [menuId]
    );
    try {
      const [rows] = await dbConnexion.execute(query);
      if (rows.length > 0) {
        return {
          statusCode: 200,
          rows,
          response: 'Formulas successfully retreived from Menu ID.',
        };
      }
    } catch (error) {
      return {
        statusCode: 500,
        rows: [],
        response:
          'Error: could not execute the query to retreive the formulas from Menu ID',
      };
    }
    return {
      statusCode: 200,
      rows: [],
      response: 'Warning: did not find any formulas for Menu ID: ' + menuId,
    };
  },
};
