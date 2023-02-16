const { bddPlante, configBdd } = require('../../utils/importbdd')
const exportxlsx = require("../../excelRequest/exportxlsx");
const importxlsx = require("../../excelRequest/importxlsx");
const UtilSheetName = ["vivaces", "annuelles", "arbustes"];
const uploadxlsx = require("../../middleware/multerxlsx");
const multer = require("multer");
const checkuserInputAdd = require('../../CheckInput/CheckUserInputAdd');

exports.exportationxlsx = (req, res) => {
  bddPlante().findAll().then((plantes) => {
    exportxlsx(res, plantes, UtilSheetName);
  });
}

exports.importationxlsx = async (req, res) => {
  try {
    let nbrcree = 0;
    let nbrdouble = 0
    await new Promise((resolve, reject) => {
      uploadxlsx(req, res, (err) => {
        if (err instanceof multer.MulterError) {
          reject(err.code);
        } else if (err) {
          reject(err.message);
        } else {
          if (req.file == undefined) {
            reject("Aucun fichier envoyé");
          } else {
            let buffer = req.file.buffer;
            importxlsx(buffer, (object) => {
              const promises = UtilSheetName.map((sheetname) => {
                if (object[sheetname] == undefined) {
                  res.write(`la sheet ${sheetname} n'existe pas \n`);
                  return Promise.resolve();
                } else {
                  const plantePromises = object[sheetname].map(
                    (data) =>
                      new Promise((resolve, reject) => {
                        if(
                          checkuserInputAdd(data, configBdd(), res, (data) => {
                            bddPlante().findOrCreate({
                              logging: false,
                              where: {
                                nom: data.get("nom"),
                              },
                              defaults: {
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
                              },
                            }).then(([plante, created]) => {
                              if (created) {
                                nbrcree += 1;
                              }else{
                                nbrdouble += 1;
                              }
                              resolve();
                            }).catch((err) => reject(err));
                          })
                        ){
                          reject(" ")
                        }
                      })
                  );
                  return Promise.all(plantePromises);
                }
              });
              Promise.all(promises).then(() => resolve()).catch((err) => reject(err));
            });
          }
        }
      });
    });
    res.write(`nombre de plante(s) ajoutée(s) ${nbrcree} \n`);
    res.write(`nombre de plante(s) en double ${nbrdouble} \n`);
    res.end();
  } catch (err) {
    res.write(err)
    res.end()
    console.error(err);
  }
}