const Joi = require('joi');

const categoryPriceSchema = {
  object: Joi.object({
    name: Joi.string().required(),
  }),
};

module.exports = categoryPriceSchema;
