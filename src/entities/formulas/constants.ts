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

export interface FormattedFormula {
  title: string;
  description: string;
  price: number;
}
