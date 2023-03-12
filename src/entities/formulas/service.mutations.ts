import mysql2 from 'mysql2';
import { dbConnexion } from '../..';
import {
  databaseMutationError,
  databaseMutationResponse,
} from '../common/apiResponses';
import { FORMULAS_TABLE } from './constants';

export class FormulasMutationsService {
  static deleteFormulaById = async (formulaId: string) => {
    try {
      const mutation = mysql2.format(
        `DELETE FROM ${FORMULAS_TABLE.name} WHERE ${FORMULAS_TABLE.columns.id} = ?`,
        [formulaId]
      );
      const [rows] = await dbConnexion.execute(mutation);
      return databaseMutationResponse(rows, 'delete formula by ID');
    } catch (error: any) {
      return databaseMutationError('delete formula by ID');
    }
  };
}
