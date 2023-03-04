import { verifyFormDataValidity } from '../common/apiResponses';
import { MutationResponse } from '../common/constants';
import { CategoryFormData } from './constant';
import { CategoriesMutationsService } from './service.mutations';

export class CategoriesController {
  // MUTATIONS
  static createNewCategory = async (
    newCategory: CategoryFormData
  ): Promise<MutationResponse> => {
    const isValid = verifyFormDataValidity(newCategory, ['name']);
    if (isValid.statusCode !== 200) {
      return isValid;
    }
    const response = await CategoriesMutationsService.createNewCategory(
      newCategory
    );
    return response;
  };
}
