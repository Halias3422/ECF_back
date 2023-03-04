import { CategoriesQueriesService } from '../categories/service.queries';
import { MutationResponse, QueryResponse } from '../globalConstants';
import { DishFormData, ResponseDishesByCategory } from './constants';
import { DishesMutationService } from './service.mutations';
import { DishesQueriesService } from './service.queries';

export class DishesController {
  // MUTATIONS

  static createNewDish = async (
    dishData: DishFormData
  ): Promise<MutationResponse> => {
    const dishCategory = await CategoriesQueriesService.getCategoryByName(
      dishData.category
    );
    if (dishCategory.statusCode !== 200 || dishCategory.rows.length === 0) {
      return dishCategory;
    }
    const response = await DishesMutationService.createNewDish(
      dishData,
      dishCategory.rows[0].id_category
    );
    return response;
  };

  // QUERIES

  static getDishByTitle = async (
    dish: DishFormData
  ): Promise<QueryResponse> => {
    const retreivedDish = await DishesQueriesService.getDishByTitle(dish.title);
    return retreivedDish;
  };

  static getAllDishesByCategories = async (): Promise<QueryResponse> => {
    const retreivedDishes = await DishesQueriesService.getAllDishes();
    if (retreivedDishes.statusCode === 200) {
      const retreivedCategories = await this.getDishesCategoriesById(
        retreivedDishes.rows
      );
      if (retreivedCategories.length > 0) {
        const response = await this.formatGetDishesByCategoriesResponse(
          retreivedDishes.rows,
          retreivedCategories
        );
        return {
          statusCode: 200,
          rows: response,
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
        if (retreivedCategory.statusCode === 200) {
          response.push({
            category: {
              id: retreivedCategory.rows[0].id_category,
              name: retreivedCategory.rows[0].name,
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
