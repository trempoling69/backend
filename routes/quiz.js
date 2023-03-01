const express = require("express");
const router = express.Router();

const {getQR, getPlante} = require("../controllers/controllerQuiz")

router.get('/getQR',getQR)
router.get('/getPlantes', getPlante)


module.exports = router;