const express = require('express');
const router = express.Router();
const {
  getPriceWithFk,
  postCreatePrice,
  modifyPrice,
  deletePrice,
  getAllPrice,
} = require('../controllers/controllerPrice');
const basicCheckUserInput = require('../middleware/basicCheckUserInput');
const priceSchema = require('../CheckInput/schema/price');

router.get('/withplant/get/:type', basicCheckUserInput(priceSchema.params.type, 'params'), getPriceWithFk);
router.get('/get/:type', basicCheckUserInput(priceSchema.params.type, 'params'), getAllPrice);
router.post('/create', basicCheckUserInput(priceSchema.body.requestAdd, 'body'), postCreatePrice);
router.put(
  '/update/:type/:id',
  basicCheckUserInput(priceSchema.body.requestAdd, 'body'),
  basicCheckUserInput(priceSchema.params.both, 'params'),
  modifyPrice
);
router.delete('/delete/:id', basicCheckUserInput(priceSchema.params.id, 'params'), deletePrice);

module.exports = router;
