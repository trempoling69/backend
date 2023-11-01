const express = require('express');
const router = express.Router();

const {
  allPlantes,
  planteById,
  insertPlante,
  toggleDispo,
  suppPlante,
  updatePlant,
} = require('../controllers/controllerPlante');
const basicCheckUserInput = require('../middleware/basicCheckUserInput');
const planteSchema = require('../CheckInput/schema/plante');
const upload = require('../middleware/multer');
const multer = require('multer');
const fs = require('fs');
const { deletePrice } = require('../services/price');

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
router.post(
  '/insertplante',
  managePhoto,
  changeForNullInput,
  basicCheckUserInput(planteSchema.body.request, 'body'),
  insertPlante,
  deleteUploadedPhotoOnError
);
router.put(
  '/updateplant/:id',
  managePhoto,
  changeForNullInput,
  basicCheckUserInput(planteSchema.params.object, 'params'),
  basicCheckUserInput(planteSchema.body.request, 'body'),
  updatePlant,
  deleteUploadedPhotoOnError
);
router.post('/toggledispo', basicCheckUserInput(planteSchema.body.toggleDispo, 'body'), toggleDispo);
router.delete('/deleteplant/:id', basicCheckUserInput(planteSchema.params.object, 'params'), suppPlante);
router.get('/byid/:id', basicCheckUserInput(planteSchema.params.object, 'params'), planteById);
router.get('/allPlante', allPlantes);

module.exports = router;
