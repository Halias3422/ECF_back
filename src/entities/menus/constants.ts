import { FormattedFormula } from '../formulas/constants';

export const MENUS_ROUTES = {
  getAllMenus: '/api/get-all-menus',
};

export const MENUS_TABLE = {
  name: 'Menus',
  columns: {
    id: 'id_menu',
    menuTitle: 'menu_title',
  },
};

export interface FormattedMenu {
  title: string;
  formulas: FormattedFormula[];
}
