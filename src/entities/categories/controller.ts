import { verifyFormDataValidity } from '../common/apiResponses';
import { ApiResponse } from '../common/constants';
import { CategoryFormData } from './constant';
import { CategoriesMutationsService } from './service.mutations';
import { CategoriesQueriesService } from './service.queries';

export class CategoriesController {
  // MUTATIONS
  static createNewCategory = async (
    newCategory: CategoryFormData
  ): Promise<ApiResponse> => {
    const isValid = verifyFormDataValidity(newCategory, ['name']);
    if (isValid.statusCode !== 200) {
      return isValid;
    }
    const response = await CategoriesMutationsService.createNewCategory(
      newCategory
    );
    if (response.statusCode !== 200) {
      return response;
    }
    return { ...response, statusCode: 201 };
  };

  // QUERIES

  static getCategoryByName = async (
    categoryName: string
  ): Promise<ApiResponse> => {
    const response = await CategoriesQueriesService.getCategoryByName(
      categoryName
    );
    return response;
  };

  static getAllCategories = async (): Promise<ApiResponse> => {
    const response = await CategoriesQueriesService.getAllCategories();
    return response;
  };
}
