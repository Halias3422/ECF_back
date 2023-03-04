export const CATEGORIES_ROUTES = {
  createNewCategory: '/api/create-new-category',
};

export const CATEGORIES_TABLE = {
  name: 'Categories',
  columns: {
    id: 'id_category',
    name: 'name',
  },
};

export interface CategoryFormData {
  name: string;
}
