import { MutationResponse } from '../globalConstants';
import { DishFormData } from './constants';
import { DishesMutationService } from './service.mutations';

export class DishesController {
  //mutations

  static async createNewDish(
    dishData: DishFormData
  ): Promise<MutationResponse> {
    const response = await DishesMutationService.createNewDish(dishData);
    return response;
  }
}
