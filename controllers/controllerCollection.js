const { sendSuccessResponse } = require('../middleware/responseTemplate');
const { Collection } = require('../utils/importbdd');

const getAllCollection = async (_req, res, next) => {
  try {
    const allCollections = await Collection().findAll();
    sendSuccessResponse(allCollections, res, 200);
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllCollection };
