import { AdminSessionData } from '../admin/constants';
import { AdminController } from '../admin/controller';
import { verifyFormDataValidity } from '../common/apiResponses';
import { ApiResponse } from '../common/constants';
import { DishesQueriesService } from '../dishes/service.queries';
import { DishesGalleryFormData } from './constants';
import { DishesGalleryMutationsService } from './service.mutations';
import { DishesGalleryQueriesService } from './service.queries';

export class DishesGalleryController {
  static getAllDishesGallery = async (): Promise<ApiResponse> => {
    return await DishesGalleryQueriesService.getAllDishesGallery();
  };

  // PROTECTED

  static deleteDishGalleryItem = async (
    userSessionInfo: AdminSessionData,
    dish: DishesGalleryFormData
  ): Promise<ApiResponse> => {
    const isValid = verifyFormDataValidity(dish, ['title', 'image']);
    if (isValid.statusCode !== 200) {
      return isValid;
    }
    const isAuthorized =
      await AdminController.getAuthenticatedProtectedUserFromSession(
        userSessionInfo
      );
    if (isAuthorized.statusCode !== 200) {
      return isAuthorized;
    }
    const retreivedDish = await DishesQueriesService.getDishByTitle(dish.title);
    if (retreivedDish.statusCode !== 200) {
      return retreivedDish;
    }
    const deletedDish =
      await DishesGalleryMutationsService.deleteGalleryDishItemById(
        retreivedDish.data[0].id_dish
      );
    return deletedDish;
  };
}
