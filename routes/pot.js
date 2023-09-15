const express = require('express');
const router = express.Router();

const { allPots, createPot, deletePot, updatePot } = require('../controllers/controllerPot');
const basicCheckUserInput = require('../middleware/basicCheckUserInput');
const potSchema = require('../CheckInput/schema/pot');

router.get('/getAllPots', allPots);
router.post('/createPot', basicCheckUserInput(potSchema.body.object, 'body'), createPot);
router.delete('/deletePot/:id', basicCheckUserInput(potSchema.params.object, 'params'), deletePot);
router.put(
  '/modifyPot/:id',
  basicCheckUserInput(potSchema.params.object, 'params'),
  basicCheckUserInput(potSchema.body.object, 'body'),
  updatePot
);

module.exports = router;
