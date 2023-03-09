import multer from 'multer';

export const initDishesGalleryStorage = () => {
  return multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, 'public/dishesGallery/');
    },
    filename: (req, file, callback) => {
      callback(null, file.originalname);
    },
  });
};

export const initDishesStorage = () => {
  const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, 'public/dishes/');
    },
    filename: (req, file, callback) => {
      callback(null, file.originalname);
    },
  });
  return multer({ storage: storage });
};
