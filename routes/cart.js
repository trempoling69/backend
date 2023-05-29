const express = require('express');
const router = express.Router();

const { getAllCart, newCart, modifyCart } = require('../controllers/controllerCart');

router.get('/getall', getAllCart);
router.post('/newOrder', newCart);
router.put('/modifyOrder/:id', modifyCart);

module.exports = router;
