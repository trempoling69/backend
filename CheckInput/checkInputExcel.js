/**
 *?Fonction qui filtre les valeurs de plante,
 **Il prend un object Plante et un object bddPlante
 **Il verifie ensuite chaque valeurs
 **En cas de problème il écrit dans un fichier txt
 **l'erreur de la ligne, si tout vas bien il envoie
 **un object Map à une callback
 */
const cleanedValue = (value) => {
  const cleanedValue = value.replace(/[<>]/g, "").trim();
  return cleanedValue;
};

exports.checkInputExcel = (plante, bddplante, index, filereport,resolve, callback) => {
  let checkValue = new Map([]);
  for (nomcolonne in bddplante) {
    if (plante[nomcolonne] == undefined) {
      if (bddplante[nomcolonne].notNull === true) {
        console.log(`${nomcolonne} devrai pas être null ligne ${index}`);
        //ECRIRE QUI FAUT PAS DE NULL ICI
        filereport('./logs.txt',`${nomcolonne} devrai pas être null ligne ${index}`)
        resolve()
        //JUMP SANS CALLBACK
        return;
      } else {
        checkValue.set(nomcolonne, "null");
      }
    } else {
      checkValue.set(nomcolonne, plante[nomcolonne]);
    }
    for (params in bddplante[nomcolonne]) {
      parametre = bddplante[nomcolonne][params];
      if (
        params === "length" &&
        checkValue.get(nomcolonne).length > parseInt(parametre)
      ) {
        filereport('./logs.txt',`${nomcolonne} valeur trop grande pour la ligne ${index}`)
        console.log(`${nomcolonne} valeur trop grande pour la ligne ${index}`);
        resolve()
        return;
      }
      if (
        params === "valeurs" &&
        !parametre.includes(checkValue.get(nomcolonne))
      ) {
        filereport('./logs.txt',`${nomcolonne} valeur accepté ${JSON.stringify(
          parametre
        )} pour la ligne ${index} valeur recu ${cleanedValue(checkValue.get(nomcolonne))}`)

        console.log(
          `${nomcolonne} valeur accepté ${JSON.stringify(
            parametre
          )} pour la ligne ${index} valeur recu ${cleanedValue(checkValue.get(nomcolonne))}`
        );
        resolve()
        return;
      }
      if (
        params === "type" &&
        parametre === "string" &&
        checkValue.get(nomcolonne) != "null"
      ) {
        checkValue.set(nomcolonne, cleanedValue(checkValue.get(nomcolonne)));
      }
      if (
        params === "type" &&
        parametre === "float" &&
        checkValue.get(nomcolonne) != "null"
      ) {
        if (isNaN(parseFloat(checkValue.get(nomcolonne)))) {
          filereport('./logs.txt', `${nomcolonne} valeur du mauvais type, type attendu ${parametre} pour la ligne ${index} valeur recu ${cleanedValue(
            checkValue.get(nomcolonne)
          )}`)

          console.log(
            `${nomcolonne} valeur du mauvais type, type attendu ${parametre} pour la ligne ${index} valeur recu ${cleanedValue(
              checkValue.get(nomcolonne)
            )}`
          );
          resolve()
          return;
        } else {
          checkValue.set(nomcolonne, parseFloat(checkValue.get(nomcolonne)));
        }
      }
      if (
        params === "type" &&
        parametre === "int" &&
        checkValue.get(nomcolonne) != "null"
      ) {
        if (isNaN(parseInt(checkValue.get(nomcolonne)))) {
          filereport('./logs.txt',`${nomcolonne} valeur du mauvais type, type attendu ${parametre} pour la ligne ${index} valeur recu ${cleanedValue(
            checkValue.get(nomcolonne)
          )}`)
          
          console.log(
            `${nomcolonne} valeur du mauvais type, type attendu ${parametre} pour la ligne ${index} valeur recu ${cleanedValue(
              checkValue.get(nomcolonne)
            )}`
          );
          resolve()
          return;
        } else {
          checkValue.set(nomcolonne, parseInt(checkValue.get(nomcolonne)));
        }
      }
      if(params === "type" && parametre === "photo"){
        checkValue.set(nomcolonne, cleanedValue(checkValue.get(nomcolonne)))
      }
    }
  }
  callback(checkValue);
};
