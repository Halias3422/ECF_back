import { QueryResponse } from '../globalConstants';
import { DishesGalleryQueriesService } from './service.queries';

export const DishesGalleryController = {
  getAllDishesGallery: async (): Promise<QueryResponse> => {
    return await DishesGalleryQueriesService.getAllDishesGallery();
  },
};
