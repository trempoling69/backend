const crypto = require('crypto');

exports.createHashPlante = (data) => {
  let stringPlante = `${
    data.nom +
    data.description +
    data.couleur_dispo +
    data.type +
    data.feuillage +
    data.collection +
    data.exposition +
    data.hauteur +
    data.mois_floraison +
    data.periode_floraison +
    data.besoin_eau +
    data.photo +
    data.dispo +
    data.prix +
    data.emplacement +
    data.quantiteProd +
    data.catchPhrase
  }`;

  const hash = crypto.createHash('sha256');
  hash.update(stringPlante);
  const result = hash.digest('hex');
  return result;
};

exports.createHashPrice = (data) => {
  let stringPrice = `${data.name + data.amount + data.usualname + data.type + data.category}`;
  const hash = crypto.createHash('sha256');
  hash.update(stringPrice);
  const result = hash.digest('hex');
  return result;
};
