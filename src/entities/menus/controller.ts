import { ApiResponse } from '../common/constants';
import { FormulasQueriesService } from '../formulas/service.queries';
import { FormattedMenu, MENUS_TABLE } from './constants';
import { MenusQueriesService } from './service.queries';

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

  // PRIVATE

  private static addFormulasToMenu = (
    menu: FormattedMenu,
    formulas: any[]
  ): FormattedMenu => {
    for (const formula of formulas) {
      menu.formulas.push(formula);
    }
    return menu;
  };
}
