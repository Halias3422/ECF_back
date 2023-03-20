export const FORMULAS_ROUTES = {
  deleteFormula: '/api/delete-formula',
  modifyFormula: '/api/modify-formula',
  createNewFormula: '/api/create-formula',
};

export const FORMULAS_TABLE = {
  name: 'Formulas',
  columns: {
    id: 'id',
    menuId: 'menuId',
    title: 'title',
    description: 'description',
    price: 'price',
    position: 'position',
  },
};

export interface FormulaData {
  id?: string;
  menuId?: string;
  title: string;
  description: string;
  price: string;
  position: number;
}
