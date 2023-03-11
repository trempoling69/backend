const { Plante, configBdd } = require("../utils/importbdd");
const exportxlsx = require("../excelRequest/exportxlsx");
const importxlsx = require("../excelRequest/importxlsx");
const UtilSheetName = ["vivaces", "annuelles", "arbustes"];
const uploadxlsx = require("../middleware/multerxlsx");
const multer = require("multer");
const { createHashPlante } = require("../utils/hashimportbdd");
const fs = require("fs");
const { checkInputExcel } = require("../CheckInput/checkInputExcel");
const { Op } = require("sequelize");

const exportationxlsx = (req, res) => {
  Plante()
    .findAll()
    .then((plantes) => {
      exportxlsx(res, plantes, UtilSheetName);
    });
};

const importExcel = (req, res) => {
  let nombreModification = 0;
  let nombreDouble = 0;
  let nombreCreation = 0;
  function logToFile(filePath, message) {
    const timestamp = new Date().toLocaleString("fr-FR");
    const logMessage = `${timestamp}: ${message}\n`;
    fs.writeFileSync(filePath, logMessage, { flag: "a" });
  }
  uploadxlsx(req, res, (err) => {
    fs.writeFileSync("./logs/logs.txt", "Logs import XLSX \n");
    if (err instanceof multer.MulterError) {
      logToFile("./logs/logs.txt", `erreur ${err.code}`);
      res.download("./logs/logs.txt");
    } else if (err) {
      logToFile("./logs/logs.txt", `erreur ${err}`);
      res.download("./logs/logs.txt");
    } else {
      if (req.file == undefined) {
        res.send("Aucun fichier envoyé");
      } else {
        let buffer = req.file.buffer;
        importxlsx(buffer, (object) => {
          let promises = [];
          UtilSheetName.map((name) => {
            if (object[name] == undefined) {
              logToFile("./logs/logs.txt", `La sheet ${name} n'existe pas`);
            } else {
              object[name].map((plante, index) => {
                let promise = new Promise((resolve, reject) => {
                  checkInputExcel(
                    plante,
                    configBdd(),
                    index,
                    name,
                    logToFile,
                    resolve,
                    (planteCheck) => {
                      createHashPlante(planteCheck, (hashPlantes) => {
                        Plante()
                          .findOne({
                            logging: false,
                            where: {
                              id: {
                                [Op.eq]: planteCheck.get("id"),
                              },
                            },
                          })
                          .then((plante) => {
                            if (plante === null) {
                              Plante()
                                .findOne({
                                  where: {
                                    hashPlante: {
                                      [Op.eq]: hashPlantes,
                                    },
                                  },
                                })
                                .then((plante) => {
                                  if (plante === null) {
                                    Plante()
                                      .create({
                                        nom: planteCheck.get("nom"),
                                        description:
                                          planteCheck.get("description"),
                                        couleur_dispo:
                                          planteCheck.get("couleur_dispo"),
                                        type: planteCheck.get("type"),
                                        feuillage: planteCheck.get("feuillage"),
                                        collection:
                                          planteCheck.get("collection"),
                                        exposition:
                                          planteCheck.get("exposition"),
                                        hauteur: planteCheck.get("hauteur"),
                                        mois_floraison:
                                          planteCheck.get("mois_floraison"),
                                        periode_floraison:
                                          planteCheck.get("periode_floraison"),
                                        besoin_eau:
                                          planteCheck.get("besoin_eau"),
                                        photo: planteCheck.get("photo"),
                                        dispo: planteCheck.get("dispo"),
                                        prix: planteCheck.get("prix"),
                                        emplacement:
                                          planteCheck.get("emplacement"),
                                        quantiteProd:
                                          planteCheck.get("quantiteProd"),
                                        catchPhrase:
                                          planteCheck.get("catchPhrase"),
                                        hashPlante: hashPlantes,
                                      })
                                      .then((result) => {
                                        resolve();
                                        nombreCreation++;
                                      })
                                      .catch((err) => {
                                        logToFile(
                                          "./logs/logs.txt",
                                          `Erreur de l'ajout de ${planteCheck.get(
                                            "nom"
                                          )} erreur : ${err}`
                                        );
                                        reject(err);
                                      });
                                  }else{
                                    nombreDouble++;
                                    resolve();
                                  }
                                });
                            } else {
                              if (hashPlantes === plante.hashPlante) {
                                resolve();
                                nombreDouble++;
                              } else {
                                Plante()
                                  .update(
                                    {
                                      nom: planteCheck.get("nom"),
                                      description:
                                        planteCheck.get("description"),
                                      couleur_dispo:
                                        planteCheck.get("couleur_dispo"),
                                      type: planteCheck.get("type"),
                                      feuillage: planteCheck.get("feuillage"),
                                      collection: planteCheck.get("collection"),
                                      exposition: planteCheck.get("exposition"),
                                      hauteur: planteCheck.get("hauteur"),
                                      mois_floraison:
                                        planteCheck.get("mois_floraison"),
                                      periode_floraison:
                                        planteCheck.get("periode_floraison"),
                                      besoin_eau: planteCheck.get("besoin_eau"),
                                      photo: planteCheck.get("photo"),
                                      dispo: planteCheck.get("dispo"),
                                      prix: planteCheck.get("prix"),
                                      emplacement:
                                        planteCheck.get("emplacement"),
                                      quantiteProd:
                                        planteCheck.get("quantiteProd"),
                                      catchPhrase:
                                        planteCheck.get("catchPhrase"),
                                      hashPlante: hashPlantes,
                                    },
                                    {
                                      where: {
                                        id: {
                                          [Op.eq]:
                                            planteCheck.get("id"),
                                        },
                                      },
                                    }
                                  )
                                  .then((result) => {
                                    //RAPPORT MODIFICATION
                                    nombreModification++;
                                    resolve();
                                  })
                                  .catch((err) => {
                                    console.log(err);
                                    reject(err);
                                  });
                              }
                            }
                          })
                          .catch((err) => {
                            console.log(err);
                            reject(err);
                          });
                      });
                    }
                  );
                });
                promises.push(promise);
              });
            }
          });
          Promise.all(promises)
            .then(() => {
              logToFile(
                "./logs/logs.txt",
                `##########################################`
              );
              logToFile("./logs/logs.txt", `Traitement terminé avec succès`);
              logToFile(
                "./logs/logs.txt",
                `Nombre de plante en double ${nombreDouble}`
              );
              logToFile(
                "./logs/logs.txt",
                `Nombre de plante créée ${nombreCreation}`
              );
              logToFile(
                "./logs/logs.txt",
                `Nombre de plante modifiée ${nombreModification}`
              );
              res.download("./logs/logs.txt");
            })
            .catch((err) => {
              console.log(err);
              res.send("Il y a eu une erreur durant les requetes SQL");
            });
        });
      }
    }
  });
};

module.exports = {
  exportationxlsx,
  importExcel,
};
