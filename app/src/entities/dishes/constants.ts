export const DISHES_ROUTES = {
  createNewDish: "/api/create-new-dish",
  getAllDishesByCategories: "/api/get-all-dishes-by-categories",
  deleteDishItem: "/api/delete-dish",
  deleteImage: "/api/delete-dish-image",
  verifyIfDuplicateTitleOrImage: "/api/dish-verify-duplicate-title-or-image",
  saveDishImage: "/api/save-dish-image",
  modifyDishItem: "/api/modify-dish-item",
};

export const DISHES_TABLE = {
  name: "Dishes",
  columns: {
    id: "id",
    categoryId: "categoryId",
    title: "title",
    image: "image",
    description: "description",
    price: "price",
  },
};

export interface DishFormData {
  id?: string;
  title: string;
  image: string;
  description: string;
  price: string;
  category: string;
}

export interface ResponseDishesByCategory {
  category: {
    id: string;
    name: string;
  };
  dishes: DishFormData[];
}
