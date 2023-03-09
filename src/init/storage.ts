import multer from 'multer';

export const initDishesGalleryStorage = () => {
  const storage = multer.diskStorage({
    destination: 'public/dishesGallery/',
    filename: (req, file, callback) => {
      callback(null, file.originalname);
    },
  });
  return multer({ storage: storage }).any();
};

export const initDishesStorage = () => {
  const storage = multer.diskStorage({
    destination: 'public/dishes/',
    filename: (req, file, callback) => {
      callback(null, file.originalname);
    },
  });
  return multer({ storage: storage }).any();
};
