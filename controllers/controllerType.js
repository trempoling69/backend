const { sendSuccessResponse } = require('../middleware/responseTemplate');
const { Type } = require('../utils/importbdd');

const getType = async (_req, res, next) => {
  try {
    const allType = await Type().findAll();
    sendSuccessResponse(allType, res, 200);
  } catch (err) {
    next(err);
  }
};

module.exports = { getType };
