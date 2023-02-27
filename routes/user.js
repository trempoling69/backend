const express = require("express");
const router = express.Router();

const {getUser, getAllUser, suppUser} = require('../controllers/controllerUser')

router.get('/current', getUser)
router.get('/allUsers', getAllUser)
router.delete('/supprimeruser/:id', suppUser) //faut être chef

module.exports = router;