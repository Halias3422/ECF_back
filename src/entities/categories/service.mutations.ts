import mysql2 from 'mysql2';
import { dbConnexion } from '../..';
import {
  databaseMutationError,
  databaseMutationResponse,
} from '../common/apiResponses';
import { ApiResponse } from '../common/constants';
import { CATEGORIES_TABLE, CategoryFormData } from './constant';

export class CategoriesMutationsService {
  static createNewCategory = async (
    newCategory: CategoryFormData
  ): Promise<ApiResponse> => {
    const DEFAULT = {
      toSqlString: function () {
        return 'DEFAULT';
      },
    };
    const mutation = mysql2.format(
      `INSERT INTO ${CATEGORIES_TABLE.name} VALUES (?, ?)`,
      [DEFAULT, newCategory.name]
    );
    try {
      const [rows] = await dbConnexion.execute(mutation);
      return databaseMutationResponse(rows, 'create new category');
    } catch (error: any) {
      return databaseMutationError('create new category');
    }
  };
}
