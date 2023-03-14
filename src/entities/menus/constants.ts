import { FormulaData } from '../formulas/constants';

export const MENUS_ROUTES = {
  getAllMenus: '/api/get-all-menus',
  createNewMenu: '/api/create-new-menu',
  deleteMenu: '/api/delete-menu',
  modifyMenu: '/api/modify-menu',
};

export const MENUS_TABLE = {
  name: 'Menus',
  columns: {
    id: 'id',
    title: 'title',
  },
};

export interface FormattedMenu {
  id?: string;
  title: string;
  formulas: FormulaData[];
}
