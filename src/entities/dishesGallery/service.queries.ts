import { dbConnexion } from '../..';
import { DISHES_TABLE } from '../dishes/constants';
import { QueryResponse } from '../globalConstants';
import { DISHES_GALLERY_TABLE } from './constants';

export const DishesGalleryQueriesService = {
  getAllDishesGallery: async (): Promise<QueryResponse> => {
    const query = `SELECT ${DISHES_TABLE.columns.title}, ${DISHES_TABLE.columns.image} FROM ${DISHES_TABLE.name} INNER JOIN ${DISHES_GALLERY_TABLE.name} ON ${DISHES_GALLERY_TABLE.columns.id}=${DISHES_TABLE.columns.id}`;

    try {
      const [rows] = await dbConnexion.execute(query);
      if (rows.length > 0) {
        return {
          statusCode: 200,
          rows,
          response: 'Gallery dishes successfully retreived.',
        };
      }
    } catch (error) {
      return {
        statusCode: 500,
        rows: [],
        response:
          "Error: could not execute the query to retreive the gallery's dishes",
      };
    }
    return {
      statusCode: 200,
      rows: [],
      response: "Warning: did not find any gallery's dishes",
    };
  },
};
