const models = require('../models/index');

exports.Plante = () => {
  return models.Plante;
};

exports.User = () => {
  return models.User;
};

exports.Question = () => {
  return models.Question;
};
exports.Reponse = () => {
  return models.Reponse;
};
exports.configBdd = () => {
  let configDonneeBdd = {
    id: {
      type: 'int',
    },
    nom: {
      type: 'string',
      length: '200',
      notNull: true,
    },
    description: {
      type: 'string',
      length: '5000',
      notNull: true,
    },
    couleur_dispo: {
      type: 'string',
      length: '1000',
    },
    type: {
      type: 'string',
      length: '50',
      valeurs: ['Vivaces', 'annuelle', 'Arbustes'],
      notNull: true,
    },
    feuillage: {
      type: 'string',
      length: '40',
      valeurs: ['caduque', 'persistant', null],
    },
    collection: {
      type: 'string',
      length: '100',
    },
    exposition: {
      type: 'string',
      length: '50',
      valeurs: ['Mi-Ombre', 'Ombre', 'Soleil', 'Polyvalente', null],
    },
    hauteur: {
      type: 'string',
      length: '20',
    },
    mois_floraison: {
      type: 'string',
      length: '100',
    },
    periode_floraison: {
      type: 'string',
      length: '20',
      valeurs: ['été', 'printemps', 'automne', 'hiver', null],
    },
    besoin_eau: {
      type: 'string',
      length: '50',
      valeurs: ['un_peu', 'beaucoup', 'moyen', null],
    },
    photo: {
      type: 'photo',
      length: '100',
    },
    dispo: {
      type: 'string',
      length: '20',
      valeurs: ['InStock', 'OutStock', null],
    },
    prix: {
      type: 'prix',
    },
    emplacement: {
      type: 'string',
      length: '50',
    },
    quantiteProd: {
      type: 'int',
      length: '11',
    },
    catchPhrase: {
      type: 'string',
      length: '200',
    },
  };
  return configDonneeBdd;
};

exports.Price = () => {
  return models.Price;
};

exports.Cart = () => {
  return models.Cart;
};
