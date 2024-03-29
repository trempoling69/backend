const Joi = require('joi');

const planteSchema = {
  params: {
    object: Joi.object({
      id: Joi.string().required(),
    }),
  },
  body: {
    object: Joi.object({
      name: Joi.string().required(),
      type_id: Joi.string().required(),
      description: Joi.string().required(),
      catchphrase: Joi.alternatives(Joi.string(), Joi.allow(null)),
      collection_id: Joi.alternatives(Joi.string(), Joi.allow(null)),
      mois_floraison: Joi.alternatives(Joi.string(), Joi.allow(null)),
      periode_floraison: Joi.string().valid('été', 'automne', 'hiver', 'printemps'),
      hauteur: Joi.alternatives(Joi.string(), Joi.allow(null)),
      color_available: Joi.alternatives(Joi.string(), Joi.allow(null)),
      feuillage: Joi.alternatives(Joi.string().valid('caduque', 'persistant'), Joi.allow(null)),
      besoin_eau: Joi.alternatives(Joi.string(), Joi.allow(null)),
      exposition: Joi.alternatives(Joi.string().valid('Soleil', 'Mi-Ombre', 'Polyvalente', 'Ombre'), Joi.allow(null)),
      emplacement: Joi.alternatives(Joi.string(), Joi.allow(null)),
      pot_id: Joi.alternatives(Joi.string(), Joi.allow(null)),
      price_id: Joi.alternatives(Joi.string(), Joi.allow(null)),
      quantiteProd: Joi.alternatives(Joi.string(), Joi.allow(null)),
      availability: Joi.boolean(),
      picture: Joi.alternatives(Joi.string(), Joi.allow(null)),
    }),
    request: Joi.object({
      name: Joi.string().required(),
      type_id: Joi.string().required(),
      description: Joi.string().required(),
      catchphrase: Joi.alternatives(Joi.string(), Joi.allow(null)),
      collection_id: Joi.alternatives(Joi.string(), Joi.allow(null)),
      mois_floraison: Joi.alternatives(Joi.string(), Joi.allow(null)),
      periode_floraison: Joi.string().valid('été', 'automne', 'hiver', 'printemps'),
      hauteur: Joi.alternatives(Joi.string(), Joi.allow(null)),
      color_available: Joi.alternatives(Joi.string(), Joi.allow(null)),
      feuillage: Joi.alternatives(Joi.string().valid('caduque', 'persistant'), Joi.allow(null)),
      besoin_eau: Joi.alternatives(Joi.string(), Joi.allow(null)),
      exposition: Joi.alternatives(Joi.string().valid('Soleil', 'Mi-Ombre', 'Polyvalente', 'Ombre'), Joi.allow(null)),
      emplacement: Joi.alternatives(Joi.string(), Joi.allow(null)),
      pot_id: Joi.alternatives(Joi.string(), Joi.allow(null)),
      Price: Joi.alternatives(
        Joi.object({
          id: Joi.string(),
          amount: Joi.number(),
          type: Joi.string(),
          created: Joi.boolean(),
        }),
        Joi.allow(null)
      ),
      quantiteProd: Joi.alternatives(Joi.string(), Joi.allow(null)),
      availability: Joi.boolean(),
      picture: Joi.alternatives(Joi.string(), Joi.allow(null)),
    }),
    toggleDispo: Joi.object({
      id: Joi.string().required(),
      availability: Joi.boolean().required(),
    }),
  },
};

module.exports = planteSchema;
