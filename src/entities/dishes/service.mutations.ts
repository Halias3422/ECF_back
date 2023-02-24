import mysql2 from 'mysql2';
import { dbConnexion } from '../..';
import { MutationResponse } from '../globalConstants';
import { DISHES_TABLE, DishFormData } from './constants';

export class DishesMutationService {
  static async createNewDish(newDish: DishFormData): Promise<MutationResponse> {
    //necessary to set DEFAULT value for id
    const DEFAULT = {
      toSqlString: function () {
        return 'DEFAULT';
      },
    };

    try {
      const mutation = mysql2.format(
        `INSERT INTO ${DISHES_TABLE.name} VALUES (?, ?, ?, ?)`,
        [
          DEFAULT,
          newDish.title,
          newDish.description,
          newDish.price,
          newDish.category,
        ]
      );
      const [rows] = await dbConnexion.execute(mutation);
      if (rows.length === 0) {
        return {
          statusCode: 500,
          response: 'Error creating new dish: cannot insert row into database',
        };
      }
    } catch (error: any) {
      return {
        statusCode: 500,
        response:
          'Error creating new ingredient: ' + JSON.stringify(error.message),
      };
    }
    return {
      statusCode: 200,
      response: 'New dish successfully created',
    };
  }
}
