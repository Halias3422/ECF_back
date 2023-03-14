import { promises as fs } from 'fs';
import { rootDirectory } from '../..';
import { CategoriesController } from '../categories/controller';
import { CategoriesQueriesService } from '../categories/service.queries';
import {
  databaseMutationError,
  databaseMutationResponse,
  databaseQueryResponse,
  isDuplicateResponse,
  verifyFormDataValidity,
} from '../common/apiResponses';
import { ApiResponse } from '../common/constants';
import { DishFormData, ResponseDishesByCategory } from './constants';
import { DishesMutationsService } from './service.mutations';
import { DishesQueriesService } from './service.queries';

export class DishesController {
  // MUTATIONS

  static createNewDish = async (dish: DishFormData): Promise<ApiResponse> => {
    const isValid = this.verifyDishFormDataValidity(dish);
    if (isValid.statusCode !== 200) {
      return isValid;
    }
    if (
      (await DishesQueriesService.getDishDuplicate(dish)).statusCode === 200
    ) {
      return isDuplicateResponse('create new dish');
    }
    const dishCategory = await CategoriesQueriesService.getCategoryByName(
      dish.category
    );
    if (dishCategory.statusCode !== 200 || dishCategory.data?.length === 0) {
      return dishCategory;
    }
    const response = await DishesMutationsService.createNewDish(
      dish,
      dishCategory.data?.[0].id
    );
    if (response.statusCode !== 200) {
      return response;
    }
    return { ...response, statusCode: 201 };
  };

  static deleteDishItem = async (dish: DishFormData): Promise<ApiResponse> => {
    const isValid = this.verifyDishFormDataValidity(dish);
    if (!dish.id || isValid.statusCode !== 200) {
      return { statusCode: 400, response: 'data is invalid', data: [] };
    }
    const deletedDish = await DishesMutationsService.deleteDishItemById(
      dish.id
    );
    return deletedDish;
  };

  // QUERIES

  static getDishByTitle = async (dish: DishFormData): Promise<ApiResponse> => {
    const retreivedDish = await DishesQueriesService.getDishByTitle(dish.title);
    return retreivedDish;
  };
  static getAllDishesByCategories = async (): Promise<ApiResponse> => {
    const retreivedDishes = await DishesQueriesService.getAllDishes();
    if (retreivedDishes.statusCode === 200 && retreivedDishes.data) {
      const retreivedCategories = await this.getDishesCategoriesById(
        retreivedDishes.data
      );
      if (retreivedCategories.length > 0) {
        const response = await this.formatGetDishesByCategoriesResponse(
          retreivedDishes.data,
          retreivedCategories
        );
        return {
          statusCode: 200,
          data: response,
          response: 'All dishes retreived successfully by categories',
        };
      }
    }
    return retreivedDishes;
  };

  static verifyIfDuplicateTitleOrImage = async (
    dish: DishFormData
  ): Promise<ApiResponse> => {
    const isValid = this.verifyDishFormDataValidity(dish);
    if (isValid.statusCode !== 200) {
      isValid;
    }
    const isDuplicate = await DishesQueriesService.getDishDuplicate(dish);
    if (isDuplicate.statusCode === 200) {
      return {
        statusCode: 400,
        data: isDuplicate.data,
        response: 'title or image already exists',
      };
    }
    return databaseQueryResponse(['a', 'b'], 'new item is not a duplicate');
  };

  static modifyDishItem = async (dish: DishFormData): Promise<ApiResponse> => {
    const isValid = this.verifyDishFormDataValidity(dish);
    if (!dish.id || isValid.statusCode !== 200) {
      return { statusCode: 400, response: 'data is invalid', data: [] };
    }
    const dishCategory = await CategoriesController.getCategoryByName(
      dish.category
    );
    if (dishCategory.statusCode !== 200) {
      return dishCategory;
    }
    const modifiedDish = await DishesMutationsService.modifyDishItemById(
      dish,
      dishCategory.data[0].id
    );
    return modifiedDish;
  };

  static deleteImage = async (imageName: string): Promise<ApiResponse> => {
    try {
      await fs.unlink(rootDirectory + '/public/dishes/' + imageName);
    } catch (error) {
      return databaseMutationError('delete dish image');
    }
    return databaseMutationResponse({ affectedRows: 1 }, 'delete dish image');
  };

  // PRIVATE METHODS

  private static verifyDishFormDataValidity = (
    dish: DishFormData
  ): ApiResponse => {
    const isValid = verifyFormDataValidity(dish, [
      'title',
      'image',
      'description',
      'price',
      'category',
    ]);
    if (isValid.statusCode !== 200) {
      return isValid;
    }
    return databaseQueryResponse([{ valid: 'isvalid' }], 'form data valid');
  };

  private static getDishesCategoriesById = async (dishes: any[]) => {
    const response: ResponseDishesByCategory[] = [];
    const retreivedCategoriesId: string[] = [];
    for (const dish of dishes) {
      if (!retreivedCategoriesId.includes(JSON.stringify(dish.category_id))) {
        retreivedCategoriesId.push(JSON.stringify(dish.category_id));
        const retreivedCategory =
          await CategoriesQueriesService.getCategoryById(dish.category_id);
        if (retreivedCategory.statusCode === 200 && retreivedCategory.data) {
          response.push({
            category: {
              id: retreivedCategory.data[0].id,
              name: retreivedCategory.data[0].name,
            },
            dishes: [],
          });
        }
      }
    }
    return response;
  };

  private static formatGetDishesByCategoriesResponse = async (
    dishes: any[],
    retreivedCategories: ResponseDishesByCategory[]
  ) => {
    for (let i = 0; i < retreivedCategories.length; i++) {
      for (const dish of dishes) {
        if (
          JSON.stringify(dish.category_id) ===
          JSON.stringify(retreivedCategories[i].category.id)
        ) {
          retreivedCategories[i].dishes.push({
            id: dish.id,
            title: dish.title,
            image: `${process.env.BACK_END_URL}${process.env.SERVER_PORT}/dishes/${dish.image}`,
            description: dish.description,
            price: dish.price,
            category: retreivedCategories[i].category.name,
          });
        }
      }
    }
    return retreivedCategories;
  };
}
