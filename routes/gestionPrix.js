const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();

const {
  getAllCategory,
  getAllPriceOfCategory,
  getAllPrice,
  createNewPrice,
} = require('../controllers/controllerGestionPrix');

router.get('/getAllCategory', getAllCategory);
router.get('/getAllPrice', getAllPrice);
router.get('/getprice/:category', getAllPriceOfCategory);
router.post('/createNewPrice', upload.none(), createNewPrice);

module.exports = router;
