const { sendSuccessResponse } = require('../middleware/responseTemplate');
const { findTagByType, findAllTags } = require('../services/tag');

const getTagByType = async (req, res, next) => {
  try {
    const tagType = req.params.tagtype;
    const tags = await findTagByType(tagType);
    sendSuccessResponse(tags, res, 200);
  } catch (err) {
    next(err);
  }
};

const getAllTags = async (req, res, next) => {
  try {
    const tags = await findAllTags();
    sendSuccessResponse(tags, res, 200);
  } catch (error) {
    next(error);
  }
};
module.exports = { getTagByType, getAllTags };
