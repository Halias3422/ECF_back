import { verifyFormDataValidity } from '../common/apiResponses';
import { ApiResponse } from '../common/constants';
import { FormulaData } from './constants';
import { FormulasMutationsService } from './service.mutations';

export class FormulasController {
  // MUTATIONS
  static createNewFormula = async (
    formula: FormulaData,
    menuId: string
  ): Promise<ApiResponse> => {
    const isValid = verifyFormDataValidity(formula, [
      'title',
      'description',
      'price',
    ]);
    if (isValid.statusCode !== 200) {
      return isValid;
    }
    const createdFormula = await FormulasMutationsService.createNewFormula(
      formula,
      menuId
    );
    return createdFormula;
  };
  static deleteFormula = async (formula: FormulaData): Promise<ApiResponse> => {
    const isValid = verifyFormDataValidity(formula, [
      'id',
      'title',
      'description',
      'price',
      'position',
    ]);
    if (isValid.statusCode !== 200) {
      return isValid;
    }
    const deletedFormula = await FormulasMutationsService.deleteFormulaById(
      formula.id as string
    );
    await this.modifyFormulasPosition(formula.position);
    return deletedFormula;
  };

  static modifyFormula = async (formula: FormulaData): Promise<ApiResponse> => {
    const isValid = verifyFormDataValidity(formula, [
      'id',
      'title',
      'description',
      'price',
      'position',
    ]);
    if (isValid.statusCode !== 200) {
      return isValid;
    }
    const modifiedFormula = await FormulasMutationsService.modifyFormulaById(
      formula
    );
    return modifiedFormula;
  };

  private static modifyFormulasPosition = async (
    position: number
  ): Promise<ApiResponse> => {
    return await FormulasMutationsService.modifyFormulasPosition(position);
  };
}
