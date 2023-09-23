const express = require('express');
const { getAllCategory } = require('../controllers/controllerCategoryPrice');
const router = express.Router();

router.get('/get/all', getAllCategory);

module.exports = router;
