import { AdminSessionData } from '../admin/constants';
import { AdminController } from '../admin/controller';
import { verifyFormDataValidity } from '../common/apiResponses';
import { ApiResponse } from '../common/constants';
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
    const isValid = verifyFormDataValidity(dish, ['id', 'title', 'image']);
    if (!dish.id || isValid.statusCode !== 200) {
      return isValid;
    }
    const isAuthorized =
      await AdminController.getAuthenticatedProtectedUserFromSession(
        userSessionInfo
      );
    if (isAuthorized.statusCode !== 200) {
      return isAuthorized;
    }
    const deletedDish =
      await DishesGalleryMutationsService.deleteGalleryDishItemById(dish.id);
    return deletedDish;
  };
}
