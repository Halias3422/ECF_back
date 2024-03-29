import mysql2 from 'mysql2';
import { dbConnexion } from '../..';
import {
  databaseMutationError,
  databaseMutationResponse,
} from '../common/apiResponses';
import { ApiResponse } from '../common/constants';
import { DishesGalleryFormData, DISHES_GALLERY_TABLE } from './constants';
import { DishesGalleryQueriesService } from './service.queries';

export class DishesGalleryMutationsService {
  static createDishGalleryItem = async (
    dish: DishesGalleryFormData
  ): Promise<ApiResponse> => {
    const DEFAULT = {
      toSqlString: function () {
        return 'DEFAULT';
      },
    };
    try {
      const query = await DishesGalleryQueriesService.getAllDishesGallery();
      const mutation = mysql2.format(
        `INSERT INTO ${DISHES_GALLERY_TABLE.name} VALUES (?, ?, ?, ?)`,
        [
          DEFAULT,
          dish.title,
          dish.image,
          query.data && query.data.length > 0
            ? query.data[query.data.length - 1].position + 1
            : 0,
        ]
      );
      const [rows] = await dbConnexion.execute(mutation);
      return databaseMutationResponse(rows, 'create gallery dish item');
    } catch (error: any) {
      return databaseMutationError('create gallery dish item');
    }
  };

  static modifyDishGalleryItemById = async (
    dish: DishesGalleryFormData
  ): Promise<ApiResponse> => {
    try {
      const mutation = mysql2.format(
        `UPDATE ${DISHES_GALLERY_TABLE.name} SET ${DISHES_GALLERY_TABLE.columns.title} = ?, ${DISHES_GALLERY_TABLE.columns.image} = ?, ${DISHES_GALLERY_TABLE.columns.position} = ? WHERE ${DISHES_GALLERY_TABLE.columns.id} = ?`,
        [dish.title, dish.image, dish.position, dish.id]
      );
      const [rows] = await dbConnexion.execute(mutation);
      return databaseMutationResponse(rows, 'modify gallery dish item');
    } catch (error: any) {
      return databaseMutationError('modify gallery dish item');
    }
  };

  static modifyGalleryDishesPosition = async (
    position: number
  ): Promise<ApiResponse> => {
    try {
      const mutation = mysql2.format(
        `UPDATE ${DISHES_GALLERY_TABLE.name} SET ${DISHES_GALLERY_TABLE.columns.position} = ${DISHES_GALLERY_TABLE.columns.position} - 1 WHERE ${DISHES_GALLERY_TABLE.columns.position} > ?`,
        [position]
      );
      const [rows] = await dbConnexion.execute(mutation);
      return databaseMutationResponse(rows, 'modify gallery dishes position');
    } catch (error: any) {
      return databaseMutationError('modify gallery dishes position');
    }
  };

  static deleteDishGalleryItemById = async (
    dishId: any
  ): Promise<ApiResponse> => {
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
