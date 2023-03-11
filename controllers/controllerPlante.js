const { Plante, configBdd } = require("../utils/importbdd");
const multer = require("multer");
const checkuserInputAdd = require("../CheckInput/CheckUserInputAdd");
const {
  checkInputToggleDispo,
} = require("../CheckInput/checkInputToggleDispo");
const { checkParamsId } = require("../CheckInput/checkParamsId");
const upload = require("../middleware/multer");
const fs = require("fs");
const { createHashPlante } = require("../utils/hashimportbdd");

const allPlantes = (req, res) => {
  Plante()
    .findAll()
    .then((plantes) => {
      res.json(plantes);
    });
};

const planteById = (req, res) => {
  var id = req.params.id;
  Plante()
    .findOne({
      where: {
        id: id,
      },
    })
    .then((plantes) => {
      if (plantes === null) {
        res.send("rien a été trouvé");
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
      if (
        checkuserInputAdd(req.body, req.file, configBdd(), res, (data) => {
          createHashPlante(data, (hashPlante) => {
            Plante()
              .create({
                nom: data.get("nom"),
                description: data.get("description"),
                couleur_dispo: data.get("couleur_dispo"),
                type: data.get("type"),
                feuillage: data.get("feuillage"),
                collection: data.get("collection"),
                exposition: data.get("exposition"),
                hauteur: data.get("hauteur"),
                mois_floraison: data.get("mois_floraison"),
                periode_floraison: data.get("periode_floraison"),
                besoin_eau: data.get("besoin_eau"),
                photo: data.get("photo"),
                dispo: data.get("dispo"),
                prix: data.get("prix"),
                emplacement: data.get("emplacement"),
                quantiteProd: data.get("quantiteProd"),
                catchPhrase: data.get("catchPhrase"),
                hashPlante: hashPlante,
              })
              .then((result) => {
                res.status(200).send("plante ajouté");
              })
              .catch((err) => {
                res.status(400).send(err.message);
              });
          });
        })
      ) {
        fs.unlink(`images/${req.file.filename}`, (err) => {
          if (err) {
            console.log(err);
            res.write("une erreur est survenu");
            res.end();
            return;
          }
          res.write(" . L'image n'a pas été enregistrée.");
          res.end();
        });
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
      let photo = "";
      if (req.file === undefined) {
        photo = req.body.photo.replace(/[<>]/g, "");
      } else if (req.body.photo === "null") {
        photo = req.file.filename;
      } else {
        const path = `./images/${req.body.photo.replace(/[<>]/g, "")}`;
        if (fs.existsSync(path)) {
          try {
            fs.unlinkSync(path);
          } catch (err) {
            res.status(400).send(err);
          }
        }
        photo = req.file.filename;
      }
      if (
        checkuserInputAdd(req.body, null, configBdd(), res, (data) => {
          Plante()
            .update(
              {
                nom: data.get("nom"),
                description: data.get("description"),
                couleur_dispo: data.get("couleur_dispo"),
                type: data.get("type"),
                feuillage: data.get("feuillage"),
                collection: data.get("collection"),
                exposition: data.get("exposition"),
                hauteur: data.get("hauteur"),
                mois_floraison: data.get("mois_floraison"),
                periode_floraison: data.get("periode_floraison"),
                besoin_eau: data.get("besoin_eau"),
                photo: photo,
                dispo: data.get("dispo"),
                prix: data.get("prix"),
                emplacement: data.get("emplacement"),
                quantiteProd: data.get("quantiteProd"),
                catchPhrase: data.get("catchPhrase"),
              },
              {
                where: { id: req.body.id },
              }
            )
            .then((result) => {
              res.status(200).send("Plante modifié");
            });
        })
      ) {
        console.log("ici");
        res.end();
      }
    }
  });
};

const toggleDispo = (req, res) => {
  checkInputToggleDispo(req, res, (data) => {
    Plante()
      .update(
        {
          dispo: data.get("dispo"),
        },
        {
          where: { id: data.get("id") },
        }
      )
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(400).send(err.message);
      });
  });
};

const suppPlante = (req, res) => {
  checkParamsId(req, res, (data) => {
    Plante()
      .findOne({ where: { id: data.get("id") } })
      .then((plante) => {
        if (plante == null) {
          res
            .status(400)
            .send("Aucune plante correspond à celle que vous suppirmez");
        } else {
          Plante()
            .destroy({ where: { id: plante.id } })
            .then((item) => {
              fs.unlink(`./images/${plante.photo}`, (err) => {
                if (err) {
                  res.write("une erreur est survenu");
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

module.exports = {
  allPlantes,
  planteById,
  insertPlante,
  modifPlante,
  toggleDispo,
  suppPlante,
};
