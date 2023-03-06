import { dbConnexion } from '../..';
import {
  databaseQueryError,
  databaseQueryResponse,
} from '../common/apiResponses';
import { ApiResponse } from '../common/constants';
import { DISHES_TABLE } from '../dishes/constants';
import { DISHES_GALLERY_TABLE } from './constants';

export class DishesGalleryQueriesService {
  static getAllDishesGallery = async (): Promise<ApiResponse> => {
    const query = `SELECT ${DISHES_TABLE.columns.title}, ${DISHES_TABLE.columns.image} FROM ${DISHES_TABLE.name} INNER JOIN ${DISHES_GALLERY_TABLE.name} ON ${DISHES_GALLERY_TABLE.columns.id}=${DISHES_TABLE.columns.id}`;

    try {
      const [rows] = await dbConnexion.execute(query);
      if (rows.length > 0) {
      }
      return databaseQueryResponse(rows, 'get all dishes gallery');
    } catch (error) {
      return databaseQueryError('get all dishes gallery');
    }
  };
}
