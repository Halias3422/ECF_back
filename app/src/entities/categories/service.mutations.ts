import mysql2 from 'mysql2';
import { dbConnexion } from '../..';
import {
  databaseMutationError,
  databaseMutationResponse,
} from '../common/apiResponses';
import { ApiResponse } from '../common/constants';
import { CATEGORIES_TABLE, CategoryFormData } from './constant';
import { CategoriesQueriesService } from './service.queries';

export class CategoriesMutationsService {
  static createNewCategory = async (
    newCategory: CategoryFormData
  ): Promise<ApiResponse> => {
    const DEFAULT = {
      toSqlString: function () {
        return 'DEFAULT';
      },
    };
    const query = await CategoriesQueriesService.getAllCategories();
    const mutation = mysql2.format(
      `INSERT INTO ${CATEGORIES_TABLE.name} VALUES (?, ?, ?)`,
      [
        DEFAULT,
        newCategory.name,
        query.data && query.data.length > 0
          ? query.data[query.data.length - 1].position + 1
          : 0,
      ]
    );
    try {
      const [rows] = await dbConnexion.execute(mutation);
      return databaseMutationResponse(rows, 'create new category');
    } catch (error: any) {
      return databaseMutationError('create new category');
    }
  };

  static deleteCategoryById = async (
    categoryId: string
  ): Promise<ApiResponse> => {
    try {
      const mutation = mysql2.format(
        `DELETE FROM ${CATEGORIES_TABLE.name} WHERE ${CATEGORIES_TABLE.columns.id} = ?`,
        [categoryId]
      );
      const [rows] = await dbConnexion.execute(mutation);
      return databaseMutationResponse(rows, 'delete category by ID');
    } catch (error: any) {
      return databaseMutationError('delete category by ID');
    }
  };

  static modifyCategoriesPosition = async (
    position: number
  ): Promise<ApiResponse> => {
    try {
      const mutation = mysql2.format(
        `UPDATE ${CATEGORIES_TABLE.name} SET ${CATEGORIES_TABLE.columns.position} = ${CATEGORIES_TABLE.columns.position} - 1 WHERE ${CATEGORIES_TABLE.columns.position} > ?`,
        [position]
      );
      const [rows] = await dbConnexion.execute(mutation);
      return databaseMutationResponse(rows, 'modify categories position');
    } catch (error: any) {
      return databaseMutationError('modify categories position');
    }
  };

  static modifyCategoryById = async (
    category: CategoryFormData
  ): Promise<ApiResponse> => {
    try {
      const mutation = mysql2.format(
        `UPDATE ${CATEGORIES_TABLE.name} SET ${CATEGORIES_TABLE.columns.name} = ?, ${CATEGORIES_TABLE.columns.position} = ? WHERE ${CATEGORIES_TABLE.columns.id} = ?`,
        [category.name, category.position, category.id]
      );
      const [rows] = await dbConnexion.execute(mutation);
      return databaseMutationResponse(rows, 'delete category by ID');
    } catch (error: any) {
      return databaseMutationError('delete category by ID');
    }
  };
}
