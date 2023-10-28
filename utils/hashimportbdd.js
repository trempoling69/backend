const crypto = require('crypto');

exports.createHashPlante = (data) => {
  let stringPlante = `${
    data.name +
    data.description +
    data.color_available +
    data.type_id +
    data.feuillage +
    data.collection_id +
    data.exposition +
    data.hauteur +
    data.mois_floraison +
    data.periode_floraison +
    data.besoin_eau +
    data.photo +
    data.availability +
    data.price_id +
    data.emplacement +
    data.quantiteProd +
    data.catchPhrase +
    data.pot_id
  }`;

  const hash = crypto.createHash('sha256');
  hash.update(stringPlante);
  const result = hash.digest('hex');
  return result;
};

exports.createHashPrice = (data) => {
  let stringPrice = `${data.name + data.amount + data.usualname + data.type + data.category_id}`;
  const hash = crypto.createHash('sha256');
  hash.update(stringPrice);
  const result = hash.digest('hex');
  return result;
};
