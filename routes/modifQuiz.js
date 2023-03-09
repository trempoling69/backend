const express = require("express");
const router = express.Router();

const {getQR, modifQR, suppReponse, suppQuestion, addQuestion, changeStart, getAllColonnes, getAllPossibleValue } = require("../controllers/controllerGestionQuiz")

router.get('/getQR',getQR)

router.post('/modifQuestion', modifQR)

router.delete('/supprimerReponse/:id', suppReponse)

router.delete('/supprimerQuestion/:id', suppQuestion)

router.get('/addQuestion', addQuestion)

router.get('/changeStart/:id', changeStart)

router.get('/getAttributesPlante', getAllColonnes)

router.get('/getPossibleAnswer/:colonne', getAllPossibleValue)



module.exports = router;