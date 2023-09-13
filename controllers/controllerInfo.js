const requestStats = require('../fctUtiles/requestStats');
const { sendSuccessResponse } = require('../middleware/responseTemplate');

const stats = (req, res, next) => {
  try {
    requestStats().then((countAll) => {
      sendSuccessResponse(countAll, res, 200);
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { stats };
