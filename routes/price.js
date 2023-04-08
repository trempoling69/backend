const express = require('express');
const router = express.Router();

const { getAllPrice, getAllCategory } = require('../controllers/controllerPrice');

router.get('/getPrice/:category', getAllPrice);
router.get('/allCategory', getAllCategory)

module.exports = router;
