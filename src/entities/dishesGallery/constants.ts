export const DISHES_GALLERY_ROUTES = {
  getAllDishesGallery: '/api/get-all-dishes-gallery',
  deleteDishGalleryItem: '/api/delete-dish-gallery-item',
};

export const DISHES_GALLERY_TABLE = {
  name: 'Gallery_dishes',
  columns: {
    id: 'id_gallery_dish',
    title: 'title',
    image: 'image',
  },
};

export interface DishesGalleryFormData {
  id?: string;
  image: string;
  title: string;
}
