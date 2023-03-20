import { dbConnexion } from '../..';
import {
  databaseQueryError,
  databaseQueryResponse,
} from '../common/apiResponses';
import { ApiResponse } from '../common/constants';
import { RESTAURANT_TABLE } from './constants';

export class RestaurantQueriesService {
  static getSeatsCapacity = async (): Promise<ApiResponse> => {
    try {
      const query = `SELECT * FROM ${RESTAURANT_TABLE.name}`;

      const [rows] = await dbConnexion.execute(query);
      return databaseQueryResponse(rows, 'get seats capacity');
    } catch (error) {
      return databaseQueryError('get seats capacity');
    }
  };
}
