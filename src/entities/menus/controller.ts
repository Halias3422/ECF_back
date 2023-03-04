import { QueryResponse } from '../common/constants';
import { FormulasQueriesService } from '../formulas/service.queries';
import { FormattedMenu, MENUS_TABLE } from './constants';
import { MenusQueriesService } from './service.queries';

export class MenuController {
  // QUERIES

  static getAllMenus = async (): Promise<QueryResponse> => {
    const retreivedMenus = await MenusQueriesService.getAllMenus();
    const formattedMenus = await Promise.all(
      retreivedMenus.rows.map(async (menu) => {
        let formattedMenu: FormattedMenu = {
          title: menu.title,
          formulas: [],
        };
        const retreivedFormulas =
          await FormulasQueriesService.getAllFormulasFromMenuId(
            menu[`${MENUS_TABLE.columns.id}`]
          );
        return this.addFormulasToMenu(formattedMenu, retreivedFormulas.rows);
      })
    );
    return {
      statusCode: retreivedMenus.statusCode,
      rows: formattedMenus,
      response: retreivedMenus.response,
    };
  };

  // PRIVATE

  private static addFormulasToMenu = (
    menu: FormattedMenu,
    formulas: any[]
  ): FormattedMenu => {
    for (const formula of formulas) {
      menu.formulas.push({
        title: formula.title,
        description: formula.description,
        price: formula.price,
      });
    }
    return menu;
  };
}
