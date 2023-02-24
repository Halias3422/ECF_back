export const DISHES_GALLERY_ROUTES = {
  getAllDishesGallery: '/api/get-all-dishes-gallery',
};

export const DISHES_GALLERY_TABLE = {
  name: 'Gallery_dishes',
  columns: {
    id: 'dish_id',
  },
};

export interface DishesGalleryFormData {
  image: string;
  title: string;
}
