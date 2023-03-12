import { verifyFormDataValidity } from '../common/apiResponses';
import { ApiResponse } from '../common/constants';
import { FormulaData } from './constants';
import { FormulasMutationsService } from './service.mutations';

export class FormulasController {
  // MUTATIONS
  static deleteFormula = async (formula: FormulaData): Promise<ApiResponse> => {
    const isValid = verifyFormDataValidity(formula, [
      'id',
      'title',
      'description',
      'price',
    ]);
    if (isValid.statusCode !== 200) {
      return isValid;
    }
    const deletedFormula = await FormulasMutationsService.deleteFormulaById(
      formula.id
    );
    return deletedFormula;
  };
}
