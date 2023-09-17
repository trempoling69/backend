const express = require('express');
const router = express.Router();
const basicCheckUserInput = require('../middleware/basicCheckUserInput');
const { getUser, getAllUser, suppUser } = require('../controllers/controllerUser');
const authSchema = require('../CheckInput/schema/auth');
const { sendErrorResponse } = require('../middleware/responseTemplate');
const isChef = (req, res, next) => {
  if (req.user.role !== 'chef') {
    return sendErrorResponse("Vous n'avez pas la permission", res, 403);
  }
  next();
};
router.get('/current', getUser);
router.get('/allUsers', getAllUser);
router.delete('/deleteUser/:id', basicCheckUserInput(authSchema.params, 'params'), isChef, suppUser);

module.exports = router;
