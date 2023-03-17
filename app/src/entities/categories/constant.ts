export const CATEGORIES_ROUTES = {
  createNewCategory: "/api/create-new-category",
  getAllCategories: "/api/get-all-categories",
  deleteCategory: "/api/delete-category",
  modifyCategory: "/api/modify-category",
};

export const CATEGORIES_TABLE = {
  name: "Categories",
  columns: {
    id: "id",
    name: "name",
  },
};

export interface CategoryFormData {
  id?: string;
  name: string;
}
