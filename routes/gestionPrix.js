const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();

const {
  getAllCategory,
  getAllPriceOfCategory,
  getAllPrice,
  getAllCategoryForBP,
  getAllPriceForBP,
  getAllPriceForSpe,
  modifBasicPrice,
  addBPToCategory,
  addNewPriceToNewCat,
  deleteOnePrice,
  modifSpecificPrice,
} = require('../controllers/controllerGestionPrix');

//* BASIC PRICE
router.get('/BP/getAllCategory', getAllCategoryForBP); //!
router.get('/BP/getAllPrice', getAllPriceForBP); //!
router.post('/BP/modifprice', upload.none(), modifBasicPrice); //!
router.post('/BP/addpriceto/:category', upload.none(), addBPToCategory); //!
router.post('/BP/createpandcat', upload.none(), addNewPriceToNewCat); //!

//* SPECIFIC PRICE
router.get('/other/getAllPrice', getAllPriceForSpe); //!
router.post('/other/modifprice', upload.none(), modifSpecificPrice); //!

//* GENERAL REQUEST
router.get('/getAllCategory', getAllCategory);
router.get('/getAllPrice', getAllPrice);
router.get('/get/:type', getAllPrice);
router.get('/getprice/:category', getAllPriceOfCategory);
router.delete('/deleteoneprice/:id', deleteOnePrice); //!


module.exports = router;
