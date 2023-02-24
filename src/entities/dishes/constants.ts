export const DISHES_ROUTES = {
  createNewDish: '/api/create-new-dish',
};

export const DISHES_TABLE = {
  name: 'Dishes',
  columns: {
    id: 'id_dish',
    title: 'title',
    image: 'image',
    description: 'description',
    price: 'price',
  },
};

export interface DishFormData {
  title: string;
  description: string;
  price: number;
  category: string;
}
