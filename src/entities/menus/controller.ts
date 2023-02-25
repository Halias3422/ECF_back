import { FormulasQueriesService } from '../formulas/service.queries';
import { QueryResponse } from '../globalConstants';
import { FormattedMenu, MENUS_TABLE } from './constants';
import { MenusQueriesService } from './service.queries';

export const MenuController = {
  addFormulasToMenu: (menu: FormattedMenu, formulas: any[]) => {
    for (const formula of formulas) {
      menu.formulas.push({
        title: formula.title,
        description: formula.description,
        price: formula.price,
      });
    }
    return menu;
  },

  getAllMenus: async (): Promise<QueryResponse> => {
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
        return MenuController.addFormulasToMenu(
          formattedMenu,
          retreivedFormulas.rows
        );
      })
    );
    console.log('end result = ' + JSON.stringify(formattedMenus));
    return {
      statusCode: retreivedMenus.statusCode,
      rows: formattedMenus,
      response: retreivedMenus.response,
    };
  },
};
