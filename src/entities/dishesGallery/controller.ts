import { ApiResponse } from '../common/constants';
import { DishesGalleryQueriesService } from './service.queries';

export class DishesGalleryController {
  static getAllDishesGallery = async (): Promise<ApiResponse> => {
    return await DishesGalleryQueriesService.getAllDishesGallery();
  };
}
