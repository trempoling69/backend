const { Plante, Price, Pot, CategoryPrice, Tag } = require('../utils/importbdd');
const fs = require('fs');
const { sendSuccessResponse } = require('../middleware/responseTemplate');
const { createPrice, updateAmountPrice, findOnePrice, deleteOnePrice } = require('../services/price');
const { insertOnePlante, updateOnePlant, findOnePlant, deleteOnePlant } = require('../services/plante');
const { Op } = require('sequelize');

const allPlantes = async (_req, res, next) => {
  try {
    const plantes = await Plante().findAll({
      include: [
        { model: Price(), include: [{ model: CategoryPrice() }] },
        { model: Pot() },
        { model: Tag(), as: 'type' },
        { model: Tag(), as: 'collection' },
        { model: Tag(), as: 'feuillage' },
        { model: Tag(), as: 'exposition' },
        { model: Tag(), as: 'besoin_eau' },
        { model: Tag(), as: 'periode_floraison' },
      ],
    });
    sendSuccessResponse(plantes, res, 200);
  } catch (err) {
    next(err);
  }
};

const planteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const plante = await Plante().findOne({
      where: { id: { [Op.eq]: id } },
      include: [
        { model: Price(), include: [{ model: CategoryPrice() }] },
        { model: Pot() },
        { model: Tag(), as: 'type' },
        { model: Tag(), as: 'collection' },
        { model: Tag(), as: 'feuillage' },
        { model: Tag(), as: 'exposition' },
        { model: Tag(), as: 'besoin_eau' },
        { model: Tag(), as: 'periode_floraison' },
      ],
    });
    sendSuccessResponse(plante, res, 200);
  } catch (err) {
    next(err);
  }
};

const priceManage = async (price, name) => {
  if (price.created) {
    const valuePrice = {
      name: `Prix_${name}`,
      usualname: `Prix pour ${name}`,
      amount: price.amount,
      type: 'OTHER',
    };
    const priceCreate = await createPrice(valuePrice);
    return { price: priceCreate, created: true };
  } else {
    if (price.type === 'BP') {
      return { price: price, created: false };
    }
    if (price.type === 'OTHER') {
      const priceUpdated = await updateAmountPrice(price.id, price.amount);
      return { price: priceUpdated, created: false };
    }
  }
};

const insertPlante = async (req, res, next) => {
  try {
    console.log(req.body);
    if (req.body.Price !== null) {
      const priceObj = await priceManage(req.body.Price, req.body.name);
      req.body.price_id = priceObj.price.id;
      req.body.priceCreate = priceObj.created;
    } else {
      req.body.price_id = null;
    }
    const valuePlante = {
      name: req.body.name,
      type_id: req.body.type_id,
      description: req.body.description,
      catchphrase: req.body.catchphrase,
      collection_id: req.body.collection_id,
      mois_floraison: req.body.mois_floraison,
      periode_floraison_id: req.body.periode_floraison_id,
      hauteur: req.body.hauteur,
      color_available: req.body.color_available,
      feuillage_id: req.body.feuillage_id,
      besoin_eau_id: req.body.besoin_eau_id,
      exposition_id: req.body.exposition_id,
      emplacement: req.body.emplacement,
      pot_id: req.body.pot_id,
      price_id: req.body.price_id,
      quantiteProd: req.body.quantiteProd,
      availability: req.body.availability,
      picture: req.file?.filename,
    };
    await insertOnePlante(valuePlante);
    sendSuccessResponse('Plante ajouté avec succès', res, 201);
  } catch (err) {
    next(err);
  }
};

const manageOldPrice = async (newPriceId, plantId) => {
  const oldPlant = await findOnePlant(plantId);
  if (oldPlant.price_id === null) {
    return;
  }
  if (oldPlant.price_id === newPriceId) {
    return;
  }
  const oldPrice = await findOnePrice(oldPlant.price_id);
  if (oldPrice.type === 'OTHER') {
    await deleteOnePrice(oldPrice.id);
    return;
  }
  return;
};

const updatePlant = async (req, res, next) => {
  try {
    if (req.body.Price.id !== '') {
      const priceObj = await priceManage(req.body.Price, req.body.name);
      req.body.price_id = priceObj.price.id;
      req.body.priceCreate = priceObj.created;
    } else {
      req.body.price_id = null;
    }
    await manageOldPrice(req.body.price_id, req.params.id);
    if (req.file) {
      const findPlant = await findOnePlant(req.params.id);
      if (findPlant.picture !== null) {
        const path = `./images/${findPlant.picture}`;
        if (fs.existsSync(path)) {
          fs.unlinkSync(path);
        }
      }
    }
    const valuePlant = {
      name: req.body.name,
      type_id: req.body.type_id,
      description: req.body.description,
      catchphrase: req.body.catchphrase,
      collection_id: req.body.collection_id,
      mois_floraison: req.body.mois_floraison,
      periode_floraison_id: req.body.periode_floraison_id,
      hauteur: req.body.hauteur,
      color_available: req.body.color_available,
      feuillage_id: req.body.feuillage_id,
      besoin_eau_id: req.body.besoin_eau_id,
      exposition_id: req.body.exposition_id,
      emplacement: req.body.emplacement,
      pot_id: req.body.pot_id,
      price_id: req.body.price_id,
      quantiteProd: req.body.quantiteProd,
      availability: req.body.availability,
      picture: req.file?.filename,
    };
    await updateOnePlant(valuePlant, req.params.id);
    sendSuccessResponse('Plante modifié avec succès', res, 200);
  } catch (err) {
    next(err);
  }
};

const toggleDispo = async (req, res, next) => {
  try {
    const { id, availability } = req.body;
    await Plante().update(
      {
        availability: availability,
      },
      {
        where: { id: { [Op.eq]: id } },
      }
    );
    sendSuccessResponse('La disponibilité à été changé avec succès', res, 200);
  } catch (err) {
    next(err);
  }
};

const deletePlante = async (req, res, next) => {
  try {
    const idPlante = req.params.id;
    const planteDelete = await deleteOnePlant(idPlante);
    if (planteDelete.picture !== null) {
      const path = `./images/${planteDelete.picture}`;
      if (fs.existsSync(path)) {
        fs.unlinkSync(path);
      }
    }
    sendSuccessResponse('Plante supprimé', res, 200);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  allPlantes,
  planteById,
  insertPlante,
  toggleDispo,
  deletePlante,
  updatePlant,
};
