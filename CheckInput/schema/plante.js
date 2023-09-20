const Joi = require('joi');

const planteSchema = {
  params: {
    object: Joi.object({
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
  },
  body: {
    object: Joi.object({
      nom: Joi.string().required(),
      type: Joi.string().valid('Vivace', 'Annuelle', 'Arbuste').required(),
      description: Joi.string().required(),
      catchPhrase: Joi.alternatives(Joi.string(), Joi.allow(null)),
      collection: Joi.alternatives(Joi.string(), Joi.allow(null)),
      mois_floraison: Joi.alternatives(Joi.string(), Joi.allow(null)),
      periode_floraison: Joi.string().valid('été', 'automne', 'hiver', 'printemps'),
      hauteur: Joi.alternatives(Joi.string(), Joi.allow(null)),
      couleur_dispo: Joi.alternatives(Joi.string(), Joi.allow(null)),
      feuillage: Joi.alternatives(Joi.string().valid('caduque', 'persistant'), Joi.allow(null)),
      besoin_eau: Joi.alternatives(Joi.string(), Joi.allow(null)),
      exposition: Joi.alternatives(Joi.string().valid('Soleil', 'Mi-Ombre', 'Polyvalente', 'Ombre'), Joi.allow(null)),
      emplacement: Joi.alternatives(Joi.string(), Joi.allow(null)),
      pot: Joi.alternatives(Joi.string(), Joi.allow(null)),
      prix: Joi.alternatives(Joi.string(), Joi.allow(null)),
      quantiteProd: Joi.alternatives(Joi.string(), Joi.allow(null)),
      dispo: Joi.boolean(),
      photo: Joi.string(),
    }),
  },
};

module.exports = planteSchema;
