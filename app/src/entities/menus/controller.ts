import {
  isDuplicateResponse,
  verifyFormDataValidity,
} from "../common/apiResponses";
import { ApiResponse } from "../common/constants";
import { FormulaData } from "../formulas/constants";
import { FormulasController } from "../formulas/controller";
import { FormulasQueriesService } from "../formulas/service.queries";
import { FormattedMenu } from "./constants";
import { MenuMutationsService } from "./service.mutations";
import { MenusQueriesService } from "./service.queries";

export class MenuController {
  // QUERIES

  static getAllMenus = async (): Promise<ApiResponse> => {
    const retreivedMenus = await MenusQueriesService.getAllMenus();
    if (retreivedMenus.statusCode === 200 && retreivedMenus.data) {
      const formattedMenus = await Promise.all(
        retreivedMenus.data.map(async (menu: any) => {
          let formattedMenu: FormattedMenu = {
            id: menu.id,
            title: menu.title,
            formulas: [],
          };
          const retreivedFormulas =
            await FormulasQueriesService.getAllFormulasFromMenuId(menu.id);
          if (retreivedFormulas.statusCode === 200 && retreivedFormulas.data) {
            return this.addFormulasToMenu(
              formattedMenu,
              retreivedFormulas.data
            );
          }
          return retreivedFormulas;
        })
      );
      return {
        statusCode: retreivedMenus.statusCode,
        data: formattedMenus,
        response: retreivedMenus.response,
      };
    }
    return retreivedMenus;
  };

  static getMenuByTitle = async (menu: FormattedMenu): Promise<ApiResponse> => {
    const isValid = verifyFormDataValidity(menu, ["title", "formulas"]);
    if (isValid.statusCode !== 200) {
      return isValid;
    }
    const retreivedMenu = await MenusQueriesService.getMenuByTitle(menu.title);
    return retreivedMenu;
  };

  static verifyDuplicateMenuByTitleAndId = async (
    menu: FormattedMenu
  ): Promise<ApiResponse> => {
    const isValid = verifyFormDataValidity(menu, ["title", "formulas"]);
    if (isValid.statusCode !== 200) {
      return isValid;
    }
    const retreivedMenu =
      await MenusQueriesService.verifyDuplicateMenuByTitleAndId(
        menu.title,
        menu.id as string
      );
    return retreivedMenu;
  };
  // MUTATIONS

  static createNewMenu = async (menu: FormattedMenu): Promise<ApiResponse> => {
    const isValid = verifyFormDataValidity(menu, ["title", "formulas"]);
    if (isValid.statusCode !== 200) {
      return isValid;
    }
    const isDuplicate = await this.getMenuByTitle(menu);
    if (isDuplicate.statusCode === 200) {
      return isDuplicateResponse("create new menu");
    }
    const createdMenu = await MenuMutationsService.createNewMenu(menu);
    if (createdMenu.statusCode !== 200) {
      return createdMenu;
    }
    const retreivedMenu = await this.getMenuByTitle(menu);
    if (retreivedMenu.statusCode !== 200) {
      return retreivedMenu;
    }
    for (const formula of menu.formulas) {
      const newFormula = await FormulasController.createNewFormula(
        formula,
        retreivedMenu.data[0].id
      );
      if (newFormula.statusCode !== 200) {
        return newFormula;
      }
    }
    return { ...createdMenu, statusCode: 201 };
  };

  static modifyMenu = async (menu: FormattedMenu): Promise<ApiResponse> => {
    const isValid = verifyFormDataValidity(menu, ["id", "title", "formulas"]);
    if (isValid.statusCode !== 200) {
      return isValid;
    }
    const isDuplicate = await this.verifyDuplicateMenuByTitleAndId(menu);
    if (isDuplicate.statusCode === 200) {
      return isDuplicateResponse("modify menu");
    }
    const modifiedFormulas = await this.handleModifiedMenuFormulas(menu);
    if (modifiedFormulas.statusCode !== 200) {
      return modifiedFormulas;
    }
    const modifiedMenu = await MenuMutationsService.modifyMenu(menu);
    return modifiedMenu;
  };

  static deleteMenu = async (menu: FormattedMenu): Promise<ApiResponse> => {
    const isValid = verifyFormDataValidity(menu, ["id", "title", "formulas"]);
    if (isValid.statusCode !== 200) {
      return isValid;
    }
    for (const formula of menu.formulas) {
      const deletedFormula = await FormulasController.deleteFormula(formula);
      if (deletedFormula.statusCode !== 200) {
        return deletedFormula;
      }
    }
    const deletedMenu = await MenuMutationsService.deleteMenu(menu);
    return deletedMenu;
  };
  // PRIVATE

  private static addFormulasToMenu = (
    menu: FormattedMenu,
    formulas: FormulaData[]
  ): FormattedMenu => {
    for (const formula of formulas) {
      menu.formulas.push(formula);
    }
    return menu;
  };

  private static handleModifiedMenuFormulas = async (
    menu: FormattedMenu
  ): Promise<ApiResponse> => {
    const retreiveOriginalFormulas =
      await FormulasQueriesService.getAllFormulasFromMenuId(menu.id as string);
    const originalFormulas = retreiveOriginalFormulas.data;
    const deletedFormulas = originalFormulas.filter(
      (originalFormula: FormulaData) => {
        return !menu.formulas.some((newFormula: FormulaData) => {
          return originalFormula.id === newFormula.id;
        });
      }
    );
    for (const deletedFormula of deletedFormulas) {
      const deletionResponse = await FormulasController.deleteFormula(
        deletedFormula
      );
      if (deletionResponse.statusCode !== 200) {
        return deletionResponse;
      }
    }
    for (const modifiedFormula of menu.formulas) {
      if (modifiedFormula.id) {
        const modificationResponse = await FormulasController.modifyFormula(
          modifiedFormula
        );
        if (modificationResponse.statusCode !== 200) {
          return modificationResponse;
        }
      } else {
        const newFormula = await FormulasController.createNewFormula(
          modifiedFormula,
          menu.id as string
        );
        if (newFormula.statusCode !== 201) {
          return newFormula;
        }
      }
    }
    return {
      statusCode: 200,
      data: [],
      response: "formula updated successfully",
    };
  };
}
