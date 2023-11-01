const express = require('express');
const router = express.Router();

const { getType } = require('../controllers/controllerType');

router.get('/', getType);

module.exports = router;
