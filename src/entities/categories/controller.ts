import {
  isDuplicateResponse,
  verifyFormDataValidity,
} from '../common/apiResponses';
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
    const isDuplicate = await CategoriesQueriesService.getCategoryByName(
      newCategory.name
    );
    if (isDuplicate.statusCode === 200) {
      return isDuplicateResponse('create new category');
    }
    const response = await CategoriesMutationsService.createNewCategory(
      newCategory
    );
    if (response.statusCode !== 200) {
      return response;
    }
    return { ...response, statusCode: 201 };
  };

  static deleteCategory = async (
    category: CategoryFormData
  ): Promise<ApiResponse> => {
    const isValid = verifyFormDataValidity(category, ['id', 'name']);
    if (isValid.statusCode !== 200) {
      return isValid;
    }
    const response = await CategoriesMutationsService.deleteCategoryById(
      category.id as string
    );
    return response;
  };

  static modifyCategory = async (
    category: CategoryFormData
  ): Promise<ApiResponse> => {
    const isValid = verifyFormDataValidity(category, ['id', 'name']);
    if (isValid.statusCode !== 200) {
      return isValid;
    }
    const response = await CategoriesMutationsService.modifyCategoryById(
      category
    );
    return response;
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
