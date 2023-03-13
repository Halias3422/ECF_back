export const FORMULAS_ROUTES = {
  deleteFormula: '/api/delete-formula',
  modifyFormula: '/api/modify-formula',
  createNewFormula: '/api/create-formula',
};

export const FORMULAS_TABLE = {
  name: 'Formulas',
  columns: {
    id: 'id_formula',
    menuId: 'menu_id',
    title: 'formula_title',
    description: 'description',
    price: 'price',
  },
};

export interface FormulaData {
  id?: string;
  menuId?: string;
  title: string;
  description: string;
  price: string;
}
