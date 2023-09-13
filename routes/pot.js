const express = require('express');
const router = express.Router();

const { allPots, createPot, deletePot } = require('../controllers/controllerPot');

router.get('/getAllPots', allPots);
router.post('/createPot', createPot);
router.delete('/deletePot/:id', deletePot);

module.exports = router;
