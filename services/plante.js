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
      name: checkValue.name,
      description: checkValue.description,
      color_available: checkValue.color_available,
      type_id: checkValue.type_id,
      feuillage_id: checkValue.feuillage_id,
      collection_id: checkValue.collection_id,
      exposition_id: checkValue.exposition_id,
      hauteur: checkValue.hauteur,
      mois_floraison: checkValue.mois_floraison,
      periode_floraison_id: checkValue.periode_floraison_id,
      besoin_eau_id: checkValue.besoin_eau_id,
      picture: checkValue.picture,
      availability: checkValue.availability,
      price_id: checkValue.price_id,
      emplacement: checkValue.emplacement,
      quantiteProd: checkValue.quantiteProd,
      catchphrase: checkValue.catchphrase,
      pot_id: checkValue.pot_id,
      hashPlante: hashPlante,
    });
    return plante;
  } catch (err) {
    console.log(err);
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
        name: checkValue.name,
        description: checkValue.description,
        color_available: checkValue.color_available,
        type_id: checkValue.type_id,
        feuillage_id: checkValue.feuillage,
        collection_id: checkValue.collection_id,
        exposition_id: checkValue.exposition_id,
        hauteur: checkValue.hauteur,
        mois_floraison: checkValue.mois_floraison,
        periode_floraison_id: checkValue.periode_floraison_id,
        besoin_eau_id: checkValue.besoin_eau_id,
        picture: checkValue.picture,
        availability: checkValue.availability,
        price_id: checkValue.price_id,
        emplacement: checkValue.emplacement,
        quantiteProd: checkValue.quantiteProd,
        catchphrase: checkValue.catchphrase,
        pot_id: checkValue.pot_id,
        hashPlante: hashPlante,
      },
      { where: { id: { [Op.eq]: plantToModify.id } } }
    );
    return plant;
  } catch (err) {
    console.log(err);
    throw new Error('Erreur lors de la modification de la plante');
  }
};

const deleteOnePlant = async (id) => {
  try {
    const plantToDelete = await findOnePlant(id);
    Plante().destroy({ where: { id: { [Op.eq]: plantToDelete.id } } });
    return plantToDelete;
  } catch (error) {
    console.log(error);
    throw new Error('Erreur lors de la suppression de la plante');
  }
};
module.exports = { insertOnePlante, updateOnePlant, findOnePlant, deleteOnePlant };
