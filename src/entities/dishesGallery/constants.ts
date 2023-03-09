export const DISHES_GALLERY_ROUTES = {
  getAllDishesGallery: '/api/get-all-dishes-gallery',
  getDishImageByName: '/api/get-dish-image-by-name',
  deleteDishGalleryItem: '/api/delete-dish-gallery-item',
  createNewDishGalleryItem: '/api/create-new-dish-gallery-item',
  saveDishGalleryImage: '/api/save-dish-gallery-image',
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
