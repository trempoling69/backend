const crypto = require('crypto');

exports.createHashPlante = (data, callback) => {
  let stringPlante = `${
    data.get("nom") +
    data.get("description") +
    data.get("couleur_dispo") +
    data.get("type") +
    data.get("feuillage") +
    data.get("collection") +
    data.get("exposition") +
    data.get("hauteur") +
    data.get("mois_floraison") +
    data.get("periode_floraison") +
    data.get("besoin_eau") +
    data.get("photo") +
    data.get("dispo") +
    data.get("prix") +
    data.get("emplacement") +
    data.get("quantiteProd") +
    data.get("catchPhrase")
  }`;

  const hash = crypto.createHash('sha256');
  hash.update(stringPlante);
  const result = hash.digest('hex');
  callback(result)
};