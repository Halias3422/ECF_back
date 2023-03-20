import { ApiResponse } from '../common/constants';
import { RestaurantMutationsService } from './service.mutations';
import { RestaurantQueriesService } from './service.queries';

export class RestaurantController {
  // QUERIES

  static getSeatsCapacity = async (): Promise<ApiResponse> => {
    const response = await RestaurantQueriesService.getSeatsCapacity();
    return response;
  };

  // MUTATIONS
  static modifySeatsCapacity = async (newNumber: number) => {
    const response = await RestaurantMutationsService.modifySeatsCapacity(
      newNumber
    );
    return response;
  };
}
