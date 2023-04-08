const express = require('express');
const router = express.Router();

const { getAllOrder, newOrder, modifyOrder } = require('../controllers/controllerOrder');

router.get('/getall', getAllOrder);
router.post('/newOrder', newOrder);
router.put('/modifyOrder/:id', modifyOrder);

module.exports = router;
