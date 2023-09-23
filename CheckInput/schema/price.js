const Joi = require('joi');

const priceSchema = {
  params: {
    id: Joi.object({
      id: Joi.string().required(),
    }),
    type: Joi.object({
      type: Joi.string().valid('OTHER', 'BP', 'all'),
    }),
    both: Joi.object({
      id: Joi.string().required(),
      type: Joi.string().valid('OTHER', 'BP', 'all'),
    }),
  },
  body: {
    price: Joi.object({
      name: Joi.string().required(),
      usualname: Joi.string().required(),
      amount: Joi.number().required(),
      type: Joi.string().valid('OTHER', 'BP'),
      categoryId: Joi.alternatives(Joi.string(), Joi.allow(null)),
    }),
    requestAdd: Joi.object({
      name: Joi.string().required(),
      usualname: Joi.string().required(),
      amount: Joi.number().required(),
      categoryId: Joi.alternatives(Joi.string(), Joi.allow(null)),
      categoryName: Joi.alternatives(Joi.string().optional(), Joi.allow(null)),
    }),
  },
};

module.exports = priceSchema;
