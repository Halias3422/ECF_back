import mysql2 from 'mysql2';
import { dbConnexion } from '../..';
import { MutationResponse } from '../globalConstants';
import { CATEGORIES_TABLE, CategoryFormData } from './constant';

export class CategoriesMutationsService {
  static createNewCategory = async (
    newCategory: CategoryFormData
  ): Promise<MutationResponse> => {
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
      if (rows.length === 0) {
        return {
          statusCode: 500,
          response:
            'Error creating new category: cannot insert row into database',
        };
      }
    } catch (error: any) {
      return {
        statusCode: 500,
        response:
          'Error creating new category: ' + JSON.stringify(error.message),
      };
    }
    return {
      statusCode: 200,
      response: 'New category successfully created',
    };
  };
}
