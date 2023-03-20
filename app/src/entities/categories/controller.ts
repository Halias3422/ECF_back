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
    await this.modifyCategoriesPosition(category.position);
    return response;
  };

  static modifyCategory = async (
    category: CategoryFormData
  ): Promise<ApiResponse> => {
    const isValid = verifyFormDataValidity(category, ['id', 'name']);
    if (isValid.statusCode !== 200) {
      return isValid;
    }
    const isDuplicate = await this.getCategoryByName(category.name);
    if (
      isDuplicate.statusCode === 200 &&
      isDuplicate.data[0].id !== category.id
    ) {
      return isDuplicateResponse('modify category');
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
    response.data = this.formatCategoriesResponse(response.data);
    return response;
  };

  private static formatCategoriesResponse = (
    categories: any[]
  ): CategoryFormData[] => {
    const formattedCategories = [];
    for (const category of categories) {
      formattedCategories.push({
        id: category.id,
        name: category.name,
        position: category.position,
      });
    }
    return formattedCategories;
  };

  private static modifyCategoriesPosition = async (
    position: number
  ): Promise<ApiResponse> => {
    return await CategoriesMutationsService.modifyCategoriesPosition(position);
  };
}
