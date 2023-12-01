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
const { managePhoto, deleteUploadedPhotoOnError, changeForNullInput } = require('../middleware/plante');

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
