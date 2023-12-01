const { sendSuccessResponse } = require('../middleware/responseTemplate');
const { findTagByType } = require('../services/tag');

const getTagByType = async (req, res, next) => {
  try {
    const tagType = req.params.tagtype;
    const tags = await findTagByType(tagType);
    sendSuccessResponse(tags, res, 200);
  } catch (err) {
    next(err);
  }
};

module.exports = { getTagByType };
