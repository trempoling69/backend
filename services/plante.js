const { Op } = require('sequelize');
const checkSchema = require('../CheckInput/checkSchema');
const planteSchema = require('../CheckInput/schema/plante');
const { createHashPlante } = require('../utils/hashimportbdd');
const { Plante } = require('../utils/importbdd');

const findOnePlant = async (id) => {
  try {
    const plantFind = await Plante().findOne({ where: { id: { [Op.eq]: id } } });
    if (plantFind === null) {
      throw new Error('Aucune plante correspondant à cet id trouvé');
    }
    return plantFind;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

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

const updateOnePlant = async (value, id) => {
  try {
    const checkValue = await new Promise((resolve, _reject) => {
      checkSchema(value, planteSchema.body.object, (result) => {
        resolve(result);
      });
    });
    const checkId = await new Promise((resolve, _reject) => {
      checkSchema({ id: id }, planteSchema.params.object, (result) => {
        resolve(result);
      });
    });
    const plantToModify = await findOnePlant(checkId.id);
    const hashPlante = createHashPlante(checkValue);
    const plant = await Plante().update(
      {
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
      },
      { where: { id: { [Op.eq]: plantToModify.id } } }
    );
    return plant;
  } catch (err) {
    throw new Error('Erreur lors de la modification de la plante');
  }
};
module.exports = { insertOnePlante, updateOnePlant, findOnePlant };
