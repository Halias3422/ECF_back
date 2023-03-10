import mysql2 from 'mysql2';
import { dbConnexion } from '../..';
import {
  databaseMutationError,
  databaseMutationResponse,
} from '../common/apiResponses';
import { ApiResponse } from '../common/constants';
import { DISHES_TABLE, DishFormData } from './constants';

export class DishesMutationService {
  static createNewDish = async (
    newDish: DishFormData,
    dishCategoryId: string
  ): Promise<ApiResponse> => {
    //necessary to set DEFAULT value for id
    const DEFAULT = {
      toSqlString: function () {
        return 'DEFAULT';
      },
    };

    try {
      const mutation = mysql2.format(
        `INSERT INTO ${DISHES_TABLE.name} VALUES (?, ?, ?, ?, ?, ?)`,
        [
          DEFAULT,
          dishCategoryId,
          newDish.image,
          newDish.title,
          newDish.description,
          newDish.price,
        ]
      );
      const [rows] = await dbConnexion.execute(mutation);
      return databaseMutationResponse(rows, 'create new dish');
    } catch (error: any) {
      return databaseMutationError('create new dish');
    }
  };

  static deleteDishItem = async (dishId: any) => {
    try {
      const mutation = mysql2.format(
        `DELETE FROM ${DISHES_TABLE.name} WHERE ${DISHES_TABLE.columns.id} = ?`,
        [dishId]
      );
      const [rows] = await dbConnexion.execute(mutation);
      return databaseMutationResponse(rows, 'create new dish');
    } catch (error: any) {
      return databaseMutationError('create new dish');
    }
  };
}
