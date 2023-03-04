import mysql2 from 'mysql2';
import { dbConnexion } from '../..';
import {
  databaseMutationError,
  databaseMutationResponse,
} from '../databaseResponse';
import { MutationResponse } from '../globalConstants';
import { DISHES_TABLE, DishFormData } from './constants';

export class DishesMutationService {
  static async createNewDish(
    newDish: DishFormData,
    dishCategoryId: string
  ): Promise<MutationResponse> {
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
  }
}
