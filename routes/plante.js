const express = require('express');
const router = express.Router();
const {
  allPlantes,
  planteById,
  insertPlante,
  toggleDispo,
  deletePlante,
  updatePlant,
} = require('../controllers/controllerPlante');
const basicCheckUserInput = require('../middleware/basicCheckUserInput');
const planteSchema = require('../CheckInput/schema/plante');
const { managePhoto, deleteUploadedPhotoOnError, changeForNullInput } = require('../middleware/plante');

router.post(
  '/',
  managePhoto,
  changeForNullInput,
  basicCheckUserInput(planteSchema.body.request, 'body'),
  insertPlante,
  deleteUploadedPhotoOnError
);
router.put(
  '/:id',
  managePhoto,
  changeForNullInput,
  basicCheckUserInput(planteSchema.params.object, 'params'),
  basicCheckUserInput(planteSchema.body.request, 'body'),
  updatePlant,
  deleteUploadedPhotoOnError
);
router.post('/toggledispo', basicCheckUserInput(planteSchema.body.toggleDispo, 'body'), toggleDispo);
router.delete('/:id', basicCheckUserInput(planteSchema.params.object, 'params'), deletePlante);
router.get('/:id', basicCheckUserInput(planteSchema.params.object, 'params'), planteById);
router.get('/', allPlantes);

module.exports = router;
