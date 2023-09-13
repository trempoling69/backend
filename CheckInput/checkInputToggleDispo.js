const { sendErrorResponse } = require('../middleware/responseTemplate');

exports.checkInputToggleDispo = (req, res, callback) => {
  valeursPossibleDispo = [true, false];
  toggleDispoInfo = new Map([]);
  dispo = req.body.dispo;
  id = parseInt(req.body.id);
  if (!valeursPossibleDispo.includes(dispo) || isNaN(id)) {
    sendErrorResponse('Invalid value send', res, 400);
  } else {
    toggleDispoInfo.set('id', id);
    toggleDispoInfo.set('dispo', dispo);
    callback(toggleDispoInfo);
  }
};
