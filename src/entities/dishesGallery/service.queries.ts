import mysql2 from 'mysql2';
import { dbConnexion } from '../..';
import {
  databaseQueryError,
  databaseQueryResponse,
} from '../common/apiResponses';
import { ApiResponse } from '../common/constants';
import { DISHES_GALLERY_TABLE } from './constants';

export class DishesGalleryQueriesService {
  static getAllDishesGallery = async (): Promise<ApiResponse> => {
    try {
      const query = `SELECT * FROM ${DISHES_GALLERY_TABLE.name}`;
      const [rows] = await dbConnexion.execute(query);
      if (rows.length > 0) {
      }
      return databaseQueryResponse(rows, 'get all dishes gallery');
    } catch (error) {
      return databaseQueryError('get all dishes gallery');
    }
  };

  static getGalleryDishById = async (dishId: string) => {
    try {
      const query = mysql2.format(
        `SELECT * FROM ${DISHES_GALLERY_TABLE.name} WHERE ${DISHES_GALLERY_TABLE.columns.title} = ?`,
        [dishId]
      );
      const [rows] = await dbConnexion.execute(query);
      if (rows.length > 0) {
      }
      return databaseQueryResponse(rows, 'get gallery dish by ID');
    } catch (error) {
      return databaseQueryError('get gallery dish by ID');
    }
  };
}
