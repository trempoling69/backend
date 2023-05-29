const express = require('express');
const router = express.Router();

const { getAllProduct } = require('../controllers/controllerOrder');

router.get('/getProduct', getAllProduct);
// router.post('/newOrder', newCart);
// router.put('/modifyOrder/:id', modifyCart);

module.exports = router;
