const express = require("express");
const router = express.Router();

const {getUser, getAllUser, suppUser} = require('../controllers/controllerUser')
const isChef = (req, res, next) => {
    if (req.user.role == "chef") {
      next();
    } else {
      return res.status(401).send("Pas autorisé");
    }
  };
router.get('/current', getUser)
router.get('/allUsers', getAllUser)
router.delete('/supprimeruser/:id', isChef, suppUser)

module.exports = router;