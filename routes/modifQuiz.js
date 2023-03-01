const express = require("express");
const router = express.Router();

const {getQR, modifQR, suppReponse, suppQuestion, addQuestion } = require("../controllers/controllerGestionQuiz")

router.get('/getQR',getQR)

router.post('/modifQuestion', modifQR)

router.delete('/supprimerReponse/:id', suppReponse)

router.delete('/supprimerQuestion/:id', suppQuestion)

router.get('/addQuestion', addQuestion)



module.exports = router;