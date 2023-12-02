const express = require('express');
const router = express.Router();

const { getTagByType, getAllTags } = require('../controllers/controllerTag');

router.get('/:tagtype', getTagByType);
router.get('/', getAllTags);

module.exports = router;
