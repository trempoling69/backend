const express = require("express");
const router = express.Router();

const {
  exportationxlsx,
  importExcel,
} = require("../controllers/controllerExcel.js");

router.get('/exportxlsx', exportationxlsx)
router.post('/importxlsx', importExcel)


module.exports = router