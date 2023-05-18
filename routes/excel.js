const express = require('express');
const router = express.Router();

const { exportationxlsx, importExcel, importExcelPrix } = require('../controllers/controllerExcel.js');

router.get('/exportxlsx', exportationxlsx);
router.post('/importxlsx', importExcel);
router.post('/importxlsxprix', importExcelPrix);

module.exports = router;
