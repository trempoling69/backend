const { Plante, configBdd, Price } = require('../utils/importbdd');
const multer = require('multer');
const checkuserInputAdd = require('../CheckInput/CheckUserInputAdd');
const { checkInputToggleDispo } = require('../CheckInput/checkInputToggleDispo');
const { checkParamsId } = require('../CheckInput/checkParamsId');
const upload = require('../middleware/multer');
const fs = require('fs');
const { createHashPlante, createHashPrice } = require('../utils/hashimportbdd');
const checkInputPriceForPlante = require('../CheckInput/checkInputPriceForPlante');
const { sendSuccessResponse, sendErrorResponse } = require('../middleware/responseTemplate');

const allPlantes = (req, res, next) => {
  try {
    Plante()
      .findAll({
        include: [{ model: Price(), as: 'fk_price' }],
      })
      .then((plantes) => {
        sendSuccessResponse(plantes, res, 200);
      });
  } catch (err) {
    next(err);
  }
};

const planteById = (req, res) => {
  var id = req.params.id;
  Plante()
    .findOne({
      where: {
        id: id,
      },
      include: [{ model: Price(), as: 'fk_price' }],
      attributes: { exclude: ['prix'] },
    })
    .then((plantes) => {
      if (plantes === null) {
        res.send('rien a été trouvé');
      } else {
        res.json(plantes);
      }
    });
};

const insertPlante = (req, res) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      console.log(err);
      res.status(400).send(err.code);
    } else if (err) {
      console.log(err.message);
      res.status(400).send(err.message);
    } else {
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
                  insertOnePlante(req, res);
                });
            });
          })
        ) {
          res.end();
        }
      } else {
        insertOnePlante(req, res);
      }
    }
  });
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

const toggleDispo = (req, res, next) => {
  try {
    checkInputToggleDispo(req, res, (data) => {
      Plante()
        .update(
          {
            dispo: data.get('dispo'),
          },
          {
            where: { id: data.get('id') },
          }
        )
        .then(() => {
          sendSuccessResponse('La disponibilité à été changé avec succès', res, 200);
        })
        .catch((err) => {
          sendErrorResponse(err.message, res, 500);
        });
    });
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

const insertOnePlante = (req, res) => {
  if (
    checkuserInputAdd(req.body, req.file, configBdd(), res, (data) => {
      createHashPlante(data, (hashPlante) => {
        Plante()
          .create({
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
            photo: data.get('photo'),
            dispo: data.get('dispo'),
            prix: data.get('prix'),
            emplacement: data.get('emplacement'),
            quantiteProd: data.get('quantiteProd'),
            catchPhrase: data.get('catchPhrase'),
            hashPlante: hashPlante,
          })
          .then((result) => {
            res.status(200).send('plante ajouté');
          })
          .catch((err) => {
            console.log(err);
            res.status(400).send(err.message);
          });
      });
    })
  ) {
    if (req.file !== undefined) {
      fs.unlink(`images/${req.file.filename}`, (err) => {
        if (err) {
          console.log(err);
          res.write('une erreur est survenu');
          res.end();
          return;
        }
        res.write(" . L'image n'a pas été enregistrée.");
        res.end();
      });
    }
    res.end();
  }
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
};
