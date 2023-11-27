const { Plante, configBdd, Price, Pot, CategoryPrice, Tag } = require('../utils/importbdd');
const multer = require('multer');
const checkuserInputAdd = require('../CheckInput/CheckUserInputAdd');
const { checkInputToggleDispo } = require('../CheckInput/checkInputToggleDispo');
const { checkParamsId } = require('../CheckInput/checkParamsId');
const upload = require('../middleware/multer');
const fs = require('fs');
const { createHashPrice } = require('../utils/hashimportbdd');
const checkInputPriceForPlante = require('../CheckInput/checkInputPriceForPlante');
const { sendSuccessResponse } = require('../middleware/responseTemplate');
const { createPrice, updateAmountPrice, findOnePrice, deleteOnePrice } = require('../services/price');
const { insertOnePlante, updateOnePlant, findOnePlant } = require('../services/plante');
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
      periode_floraison: req.body.periode_floraison,
      hauteur: req.body.hauteur,
      color_available: req.body.color_available,
      feuillage: req.body.feuillage,
      besoin_eau: req.body.besoin_eau,
      exposition: req.body.exposition,
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
    if (req.body.Price !== null) {
      const priceObj = await priceManage(req.body.Price, req.body.name);
      req.body.price_id = priceObj.price.id;
      req.body.priceCreate = priceObj.created;
      await manageOldPrice(req.body.price_id, req.params.id);
    } else {
      req.body.price_id = null;
    }
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
      periode_floraison: req.body.periode_floraison,
      hauteur: req.body.hauteur,
      color_available: req.body.color_available,
      feuillage: req.body.feuillage,
      besoin_eau: req.body.besoin_eau,
      exposition: req.body.exposition,
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

const modifPlante = (req, res, next) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      console.log(err);
      res.status(400).send(err.code);
    } else if (err) {
      console.log(err.message);
      res.status(400).send(err.message);
    } else {
      let photo = '';
      let modifyPhoto = false;
      if (req.file === undefined) {
        if (req.body.photo === '') {
          photo = null;
        } else {
          photo = req.body.photo.replace(/[<>]/g, '');
        }
      } else if (req.body.photo === '') {
        photo = req.file.filename;
        modifyPhoto = true;
      } else {
        const path = `./images/${req.body.photo.replace(/[<>]/g, '')}`;
        if (fs.existsSync(path)) {
          try {
            fs.unlinkSync(path);
          } catch (err) {
            res.status(400).send(err);
          }
        }
        photo = req.file.filename;
        modifyPhoto = true;
      }
      if (req.body.prix === 'new') {
        if (
          checkInputPriceForPlante(req.body, res, (checkedValue) => {
            createHashPrice(checkedValue, (hashPrice) => {
              Price()
                .create({
                  name: `Prix_${checkedValue.get('nom')}`,
                  usualname: `Prix pour ${checkedValue.get('nom')}`,
                  amount: checkedValue.get('newPrice'),
                  type: 'OTHER',
                  hashPrice: hashPrice,
                })
                .then((prix) => {
                  req.body.prix = prix.id;
                  modificationPlante(req, res, photo);
                });
            });
          })
        ) {
          if (modifyPhoto) {
            const path = `./images/${req.file.filename}`;
            if (fs.existsSync(path)) {
              try {
                fs.unlinkSync(path);
              } catch (err) {
                res.status(400).send(err);
              }
            }
          }
          res.end();
        }
      } else {
        modificationPlante(req, res, photo);
      }
    }
  });
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

const suppPlante = (req, res) => {
  checkParamsId(req, res, (data) => {
    Plante()
      .findOne({ where: { id: data.get('id') } })
      .then((plante) => {
        if (plante == null) {
          res.status(400).send('Aucune plante correspond à celle que vous supprimez');
        } else {
          Plante()
            .destroy({ where: { id: plante.id } })
            .then((item) => {
              fs.unlink(`./images/${plante.photo}`, (err) => {
                if (err) {
                  res.write('une erreur est survenu');
                  res.status(400).end();
                  return;
                }
                res.json({ status: item });
              });
            })
            .catch((err) => res.status(400).send(err));
        }
      })
      .catch((err) => res.status(400).send(err));
  });
};

const modificationPlante = (req, res, photo) => {
  if (
    checkuserInputAdd(req.body, null, configBdd(), res, (data) => {
      Plante()
        .update(
          {
            nom: data.get('nom'),
            description: data.get('description'),
            couleur_dispo: data.get('couleur_dispo'),
            type: data.get('type'),
            feuillage: data.get('feuillage'),
            collection: data.get('collection'),
            exposition: data.get('exposition'),
            hauteur: data.get('hauteur'),
            mois_floraison: data.get('mois_floraison'),
            periode_floraison: data.get('periode_floraison'),
            besoin_eau: data.get('besoin_eau'),
            photo: photo,
            dispo: data.get('dispo'),
            prix: data.get('prix'),
            emplacement: data.get('emplacement'),
            quantiteProd: data.get('quantiteProd'),
            catchPhrase: data.get('catchPhrase'),
          },
          {
            where: { id: req.body.id },
          }
        )
        .then((result) => {
          res.status(200).send('Plante modifié');
        });
    })
  ) {
    console.log('ici');
    res.end();
  }
};

module.exports = {
  allPlantes,
  planteById,
  insertPlante,
  modifPlante,
  toggleDispo,
  suppPlante,
  updatePlant,
};
