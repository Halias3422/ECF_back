import { CategoriesQueriesService } from '../categories/service.queries';
import {
  isDuplicateResponse,
  verifyFormDataValidity,
} from '../common/apiResponses';
import { ApiResponse } from '../common/constants';
import { DishFormData, ResponseDishesByCategory } from './constants';
import { DishesMutationService } from './service.mutations';
import { DishesQueriesService } from './service.queries';

export class DishesController {
  // MUTATIONS

  static createNewDish = async (dish: DishFormData): Promise<ApiResponse> => {
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
    if ((await this.getDishByTitle(dish)).statusCode === 200) {
      return isDuplicateResponse('create new dish');
    }
    const dishCategory = await CategoriesQueriesService.getCategoryByName(
      dish.category
    );
    if (dishCategory.statusCode !== 200 || dishCategory.data?.length === 0) {
      return dishCategory;
    }
    const response = await DishesMutationService.createNewDish(
      dish,
      dishCategory.data?.[0].id_category
    );
    return response;
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

  // PRIVATE METHODS

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
              id: retreivedCategory.data[0].id_category,
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
            title: dish.title,
            image: dish.image,
            description: dish.description,
            price: dish.price,
            category: dish.category,
          });
        }
      }
    }
    return retreivedCategories;
  };
}
