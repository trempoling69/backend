const Joi = require('joi');

const authSchema = {
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
    register: Joi.object({
      username: Joi.string()
        .required()
        .error((errors) => {
          errors.forEach((err) => {
            switch (err.code) {
              case 'string.empty':
                err.message = 'Le username ne peut pas être vide';
                break;
              default:
                break;
            }
          });
          return errors;
        }),
      password: Joi.string()
        .required()
        .error((errors) => {
          errors.forEach((err) => {
            switch (err.code) {
              case 'string.empty':
                err.message = 'Le mot de passe ne peut pas être vide';
                break;
              default:
                break;
            }
          });
          return errors;
        }),
      confirmPassword: Joi.string()
        .required()
        .error((errors) => {
          errors.forEach((err) => {
            switch (err.code) {
              case 'string.empty':
                err.message = 'La confirmation ne peut pas être vide';
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

module.exports = authSchema;
