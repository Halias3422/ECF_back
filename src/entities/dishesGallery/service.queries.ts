import { dbConnexion } from '../..';
import { databaseQueryError, databaseQueryResponse } from '../databaseResponse';
import { DISHES_TABLE } from '../dishes/constants';
import { QueryResponse } from '../globalConstants';
import { DISHES_GALLERY_TABLE } from './constants';

export const DishesGalleryQueriesService = {
  getAllDishesGallery: async (): Promise<QueryResponse> => {
    const query = `SELECT ${DISHES_TABLE.columns.title}, ${DISHES_TABLE.columns.image} FROM ${DISHES_TABLE.name} INNER JOIN ${DISHES_GALLERY_TABLE.name} ON ${DISHES_GALLERY_TABLE.columns.id}=${DISHES_TABLE.columns.id}`;

    try {
      const [rows] = await dbConnexion.execute(query);
      if (rows.length > 0) {
      }
      return databaseQueryResponse(rows, 'get all dishes gallery');
    } catch (error) {
      return databaseQueryError('get all dishes gallery');
    }
  },
};
