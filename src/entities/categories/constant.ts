export const CATEGORIES_ROUTES = {
  createNewCategory: '/api/create-new-category',
  getAllCategories: '/api/get-all-categories',
};

export const CATEGORIES_TABLE = {
  name: 'Categories',
  columns: {
    id: 'id_category',
    name: 'name',
  },
};

export interface CategoryFormData {
  id?: string;
  name: string;
}
