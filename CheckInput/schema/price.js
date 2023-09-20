const Joi = require('joi');

const priceSchema = {
  params: Joi.object({
    id: Joi.number()
      .required()
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.code) {
            case 'number.base':
              err.message = "L'id doit être un nombre";
              break;
            default:
              break;
          }
        });
        return errors;
      }),
  }),

  body: {
    addPrice: Joi.object({
      name: Joi.string().required(),
      usualname: Joi.string().required(),
      amount: Joi.number().required(),
      type: Joi.string().valid('OTHER', 'BP'),
      category: Joi.alternatives(Joi.string(), Joi.allow(null)),
    }),
  },
};

module.exports = priceSchema;
