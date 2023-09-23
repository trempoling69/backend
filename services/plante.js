const checkSchema = require('../CheckInput/checkSchema');
const planteSchema = require('../CheckInput/schema/plante');
const { createHashPlante } = require('../utils/hashimportbdd');
const { Plante } = require('../utils/importbdd');

const insertOnePlante = async (value) => {
  try {
    const checkValue = await new Promise((resolve, _reject) => {
      checkSchema(value, planteSchema.body.object, (result) => {
        resolve(result);
      });
    });
    const hashPlante = createHashPlante(checkValue);
    const plante = await Plante().create({
      nom: checkValue.nom,
      description: checkValue.description,
      couleur_dispo: checkValue.couleur_dispo,
      type: checkValue.type,
      feuillage: checkValue.feuillage,
      collection: checkValue.collection,
      exposition: checkValue.exposition,
      hauteur: checkValue.hauteur,
      mois_floraison: checkValue.mois_floraison,
      periode_floraison: checkValue.periode_floraison,
      besoin_eau: checkValue.besoin_eau,
      photo: checkValue.photo,
      dispo: checkValue.dispo,
      prix: checkValue.prix,
      emplacement: checkValue.emplacement,
      quantiteProd: checkValue.quantiteProd,
      catchPhrase: checkValue.catchPhrase,
      potId: checkValue.pot,
      photo: checkValue.photo,
      hashPlante: hashPlante,
    });
    return plante;
  } catch (err) {
    throw new Error('Erreur lors de la création de la plante');
  }
};

module.exports = { insertOnePlante };
