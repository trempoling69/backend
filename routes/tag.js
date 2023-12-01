const express = require('express');
const router = express.Router();

const { getTagByType } = require('../controllers/controllerTag');

router.get('/:tagtype', getTagByType);

module.exports = router;
