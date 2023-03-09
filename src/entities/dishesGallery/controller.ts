import { AdminSessionData } from '../admin/constants';
import { AdminController } from '../admin/controller';
import { verifyFormDataValidity } from '../common/apiResponses';
import { ApiResponse } from '../common/constants';
import { DishesGalleryFormData } from './constants';
import { DishesGalleryMutationsService } from './service.mutations';
import { DishesGalleryQueriesService } from './service.queries';

export class DishesGalleryController {
  static getAllDishesGallery = async (): Promise<ApiResponse> => {
    const dishes = await DishesGalleryQueriesService.getAllDishesGallery();
    if (dishes.statusCode !== 200) {
      return dishes;
    }
    for (const dish of dishes.data) {
      dish.image = `${process.env.BACK_END_URL}${process.env.SERVER_PORT}/dishesGallery/${dish.image}`;
    }
    return dishes;
  };

  // PROTECTED

  static createDishGalleryItem = async (
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
    const createdDish =
      await DishesGalleryMutationsService.createDishGalleryItem(dish);
    if (createdDish.statusCode !== 200) {
      return createdDish;
    }
    return { ...createdDish, statusCode: 201 };
  };

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
      await DishesGalleryMutationsService.deleteDishGalleryItemById(dish.id);
    return deletedDish;
  };
}
