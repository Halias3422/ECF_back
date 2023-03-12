export const FORMULAS_ROUTES = {
  deleteFormula: '/api/delete-formula',
};

export const FORMULAS_TABLE = {
  name: 'Formulas',
  columns: {
    id: 'id_formula',
    menuId: 'menu_id',
    formulaTitle: 'formula_title',
    description: 'description',
    price: 'price',
  },
};

export interface FormulaData {
  id: string;
  title: string;
  description: string;
  price: string;
}
