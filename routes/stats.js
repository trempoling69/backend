const express = require("express");
const router = express.Router();

const {stats} = require('../controllers/controllerInfo')

router.get('/', stats)

module.exports = router;