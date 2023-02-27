const express = require("express");
const router = express.Router();

const {
  allPlantes,
  planteById,
  insertPlante,
  modifPlante,
  toggleDispo,
  suppPlante,
} = require("../controllers/controllerPlante");

router.post('/insertplante', insertPlante)
router.post('/modifplante', modifPlante)
router.post('/toggledispo', toggleDispo)
router.delete('/supprimerplante/:id', suppPlante)
router.get('/byid/:id', planteById)
router.get('/allPlante', allPlantes)

module.exports = router;
