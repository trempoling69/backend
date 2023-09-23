const { sendSuccessResponse } = require('../middleware/responseTemplate');
const { CategoryPrice } = require('../utils/importbdd');

const getAllCategory = async (req, res, next) => {
  try {
    const categories = await CategoryPrice().findAll();
    sendSuccessResponse(categories, res, 200);
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllCategory };
