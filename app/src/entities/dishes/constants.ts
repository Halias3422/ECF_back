export const DISHES_ROUTES = {
  createNewDish: '/api/create-new-dish',
  getAllDishesByCategories: '/api/get-all-dishes-by-categories',
  deleteDishItem: '/api/delete-dish',
  deleteDishImage: '/api/delete-dish-image',
  verifyIfDuplicateTitleOrImage: '/api/dish-verify-duplicate-title-or-image',
  saveDishImage: '/api/save-dish-image',
  modifyDishItem: '/api/modify-dish-item',
};

export const DISHES_TABLE = {
  name: 'Dishes',
  columns: {
    id: 'id',
    categoryId: 'categoryId',
    title: 'title',
    image: 'image',
    description: 'description',
    price: 'price',
    position: 'position',
  },
};

export interface DishFormData {
  id?: string;
  title: string;
  image: string;
  description: string;
  price: string;
  category: string;
  position: number;
}

export interface DishImageData {
  file: Blob;
  name: string;
}

export interface ResponseDishesByCategory {
  category: {
    id: string;
    name: string;
    position: number;
  };
  dishes: DishFormData[];
}
