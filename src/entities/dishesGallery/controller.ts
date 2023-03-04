import { QueryResponse } from '../common/constants';
import { DishesGalleryQueriesService } from './service.queries';

export class DishesGalleryController {
  static getAllDishesGallery = async (): Promise<QueryResponse> => {
    return await DishesGalleryQueriesService.getAllDishesGallery();
  };
}
