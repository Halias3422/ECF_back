import mysql2 from 'mysql2';
import { dbConnexion } from '../..';
import {
  databaseMutationError,
  databaseMutationResponse,
} from '../common/apiResponses';
import { DISHES_GALLERY_TABLE } from './constants';

export class DishesGalleryMutationsService {
  static deleteGalleryDishItemById = async (dishId: any) => {
    try {
      const mutation = mysql2.format(
        `DELETE FROM ${DISHES_GALLERY_TABLE.name} WHERE ${DISHES_GALLERY_TABLE.columns.id} = ?`,
        [dishId]
      );
      const [rows] = await dbConnexion.execute(mutation);
      return databaseMutationResponse(rows, 'delete gallery dish item');
    } catch (error: any) {
      return databaseMutationError('delete gallery dish item');
    }
  };
}
