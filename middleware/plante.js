const upload = require('../middleware/multer');
const { deletePrice } = require('../services/price');
const multer = require('multer');
const fs = require('fs');

const managePhoto = (req, res, next) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      throw new Error(err.code);
    } else if (err) {
      throw new Error(err.message);
    }
    next();
  });
};
const deleteUploadedPhotoOnError = async (err, req, _res, next) => {
  if (err) {
    if (req.file) {
      const filePath = req.file.path;
      fs.unlink(filePath, (error) => {
        if (error) {
          console.error('Erreur lors de la suppression de la photo :', error);
        }
      });
    }
    if (req.body.priceCreate) {
      await deletePrice(req.body.prix);
    }
  }
  next(err);
};
const changeForNullInput = (req, _res, next) => {
  for (const key in req.body) {
    req.body[key] = JSON.parse(req.body[key]);
  }
  next();
};

module.exports = { managePhoto, deleteUploadedPhotoOnError, changeForNullInput };
