const express = require('express');
const router = express.Router();

const { getAllCollection } = require('../controllers/controllerCollection');

router.get('/', getAllCollection);

module.exports = router;
