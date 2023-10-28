const { Plante, configBdd, Price, Pot } = require('../utils/importbdd');
const multer = require('multer');
const checkuserInputAdd = require('../CheckInput/CheckUserInputAdd');
const { checkInputToggleDispo } = require('../CheckInput/checkInputToggleDispo');
const { checkParamsId } = require('../CheckInput/checkParamsId');
const upload = require('../middleware/multer');
const fs = require('fs');
const { createHashPrice } = require('../utils/hashimportbdd');
const checkInputPriceForPlante = require('../CheckInput/checkInputPriceForPlante');
const { sendSuccessResponse } = require('../middleware/responseTemplate');
const { createPrice } = require('../services/price');
const { insertOnePlante, updateOnePlant, findOnePlant } = require('../services/plante');
const { Op } = require('sequelize');

const allPlantes = (req, res, next) => {
  try {
    Plante()
      .findAll()
      .then((plantes) => {
        sendSuccessResponse(plantes, res, 200);
      });
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
        { model: Price(), as: 'fk_price' },
        { model: Pot(), as: 'fk_pot' },
      ],
    });
    sendSuccessResponse(plante, res, 200);
  } catch (err) {
    next(err);
  }
};

const insertPlante = async (req, res, next) => {
  try {
    if (!isNaN(Number(req.body.prix)) && req.body.prix !== null) {
      const valuePrice = {
        name: `Prix_${req.body.nom}`,
        usualname: `Prix pour ${req.body.nom}`,
        amount: Number(req.body.prix),
        type: 'OTHER',
      };
      const priceCreate = await createPrice(valuePrice);
      req.body.prix = priceCreate.id;
      req.body.priceCreate = true;
    }
    const valuePlante = {
      nom: req.body.nom,
      type: req.body.type,
      description: req.body.description,
      catchPhrase: req.body.catchPhrase,
      collection: req.body.collection,
      mois_floraison: req.body.mois_floraison,
      periode_floraison: req.body.periode_floraison,
      hauteur: req.body.hauteur,
      couleur_dispo: req.body.couleur_dispo,
      feuillage: req.body.feuillage,
      besoin_eau: req.body.besoin_eau,
      exposition: req.body.exposition,
      emplacement: req.body.emplacement,
      pot: req.body.pot,
      prix: req.body.prix,
      quantiteProd: req.body.quantiteProd,
      dispo: req.body.dispo,
      photo: req.file?.filename,
    };
    await insertOnePlante(valuePlante);
    sendSuccessResponse('Plante ajouté avec succès', res, 201);
  } catch (err) {
    next(err);
  }
};
const updatePlant = async (req, res, next) => {
  try {
    if (!isNaN(Number(req.body.prix)) && req.body.prix !== null) {
      const valuePrice = {
        name: `Prix_${req.body.nom}`,
        usualname: `Prix pour ${req.body.nom}`,
        amount: Number(req.body.prix),
        type: 'OTHER',
      };
      const priceCreate = await createPrice(valuePrice);
      req.body.prix = priceCreate.id;
      req.body.priceCreate = true;
    }
    if (req.file) {
      const findPlant = await findOnePlant(req.params.id);
      if (findPlant.photo !== null) {
        const path = `./images/${findPlant.photo}`;
        if (fs.existsSync(path)) {
          fs.unlinkSync(path);
        }
      }
    }
    const valuePlant = {
      nom: req.body.nom,
      type: req.body.type,
      description: req.body.description,
      catchPhrase: req.body.catchPhrase,
      collection: req.body.collection,
      mois_floraison: req.body.mois_floraison,
      periode_floraison: req.body.periode_floraison,
      hauteur: req.body.hauteur,
      couleur_dispo: req.body.couleur_dispo,
      feuillage: req.body.feuillage,
      besoin_eau: req.body.besoin_eau,
      exposition: req.body.exposition,
      emplacement: req.body.emplacement,
      pot: req.body.pot,
      prix: req.body.prix,
      quantiteProd: req.body.quantiteProd,
      dispo: req.body.dispo,
      photo: req.file?.filename,
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
    const { id, dispo } = req.body;
    await Plante().update(
      {
        dispo: dispo,
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
