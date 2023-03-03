export const DISHES_ROUTES = {
  createNewDish: '/api/create-new-dish',
  getAllDishesByCategories: '/api/get-all-dishes-by-categories',
};

export const DISHES_TABLE = {
  name: 'Dishes',
  columns: {
    id: 'id_dish',
    category_id: 'category_id',
    title: 'title',
    image: 'image',
    description: 'description',
    price: 'price',
  },
};

export interface DishFormData {
  title: string;
  image: string;
  description: string;
  price: number;
  category: string;
}

export interface ResponseDishesByCategory {
  category: {
    id: string;
    name: string;
  };
  dishes: DishFormData[];
}
