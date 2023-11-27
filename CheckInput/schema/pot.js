const Joi = require('joi');

const potSchema = {
  params: {
    object: Joi.object({
      id: Joi.string().required(),
    }),
  },
  body: {
    object: Joi.object({
      brand: Joi.string()
        .required()
        .error((errors) => {
          errors.forEach((err) => {
            switch (err.code) {
              case 'string.empty':
                err.message = 'La marque ne peut pas être vide';
                break;
              default:
                break;
            }
          });
          return errors;
        }),
      size: Joi.number()
        .min(0)
        .required()
        .error((errors) => {
          errors.forEach((err) => {
            switch (err.code) {
              case 'number.base':
                err.message = 'La taille doit être un nombre';
                break;
              case 'number.min':
                err.message = 'La taille doit être supérieur à 0';
              default:
                break;
            }
          });
          return errors;
        }),
      color: Joi.string()
        .required()
        .error((errors) => {
          errors.forEach((err) => {
            switch (err.code) {
              case 'string.empty':
                err.message = 'La couleur ne peut pas être vide';
                break;
              default:
                break;
            }
          });
          return errors;
        }),
    }),
  },
};

module.exports = potSchema;
