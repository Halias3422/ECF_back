import mysql2 from 'mysql2';
import { dbConnexion } from '../..';
import {
  databaseMutationError,
  databaseMutationResponse,
} from '../common/apiResponses';
import { ApiResponse } from '../common/constants';
import { DISHES_TABLE, DishFormData } from './constants';
import { DishesQueriesService } from './service.queries';

export class DishesMutationsService {
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
      const query = await DishesQueriesService.getAllDishes();
      const mutation = mysql2.format(
        `INSERT INTO ${DISHES_TABLE.name} VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          DEFAULT,
          dishCategoryId,
          newDish.image,
          newDish.title,
          newDish.description,
          newDish.price,
          query.data
            ? query.data.length > 0
              ? query.data[query.data.length - 1].position + 1
              : 1
            : 0,
        ]
      );
      const [rows] = await dbConnexion.execute(mutation);
      return databaseMutationResponse(rows, 'create new dish');
    } catch (error: any) {
      return databaseMutationError('create new dish');
    }
  };

  static modifyDishItemById = async (
    dish: DishFormData,
    categoryId: string
  ) => {
    try {
      const mutation = mysql2.format(
        `UPDATE ${DISHES_TABLE.name} SET ${DISHES_TABLE.columns.title} = ?, ${DISHES_TABLE.columns.image} = ?, ${DISHES_TABLE.columns.description} = ?, ${DISHES_TABLE.columns.price} = ?, ${DISHES_TABLE.columns.categoryId} = ?, ${DISHES_TABLE.columns.position} = ? WHERE ${DISHES_TABLE.columns.id} = ?`,
        [
          dish.title,
          dish.image,
          dish.description,
          dish.price,
          categoryId,
          dish.position,
          dish.id,
        ]
      );
      const [rows] = await dbConnexion.execute(mutation);
      return databaseMutationResponse(rows, 'modify dish item');
    } catch (error: any) {
      return databaseMutationError('modify dish item');
    }
  };

  static deleteDishItemById = async (dishId: any) => {
    try {
      const mutation = mysql2.format(
        `DELETE FROM ${DISHES_TABLE.name} WHERE ${DISHES_TABLE.columns.id} = ?`,
        [dishId]
      );
      const [rows] = await dbConnexion.execute(mutation);
      return databaseMutationResponse(rows, 'delete dish by ID');
    } catch (error: any) {
      return databaseMutationError('delete dish by ID');
    }
  };
}
