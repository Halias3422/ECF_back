export const DISHES_ROUTES = {
  createNewDish: '/api/create-new-dish',
};

export const DishesTable = {
  name: 'Dishes',
  columns: {
    id: 'id_dish',
    title: 'title',
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
