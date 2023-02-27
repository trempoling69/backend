const cleanedValue = (value) => {
  const cleanedValue = value.replace(/[<>]/g, "").trim();
  return cleanedValue;
};

const checkuserInputAdd = (plante, file, bddplante, res, callback) => {
  console.log(plante);
  let checkValue = new Map([]);
  let errorMessage = "";
  for (nomcolonne in bddplante) {
    if (plante[nomcolonne] == undefined || plante[nomcolonne] === "") {
      if (bddplante[nomcolonne].notNull === true) {
        console.log(`${nomcolonne} devrai pas être null`);
        errorMessage = `${nomcolonne} devrai pas être null`;
        res.write(errorMessage);
        return true;
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
        console.log(`${nomcolonne} valeur trop grande`);
        errorMessage = `${nomcolonne} valeur trop grande`;
        res.write(errorMessage);
        return true;
      }
      if (
        params === "valeurs" &&
        !parametre.includes(checkValue.get(nomcolonne))
      ) {
        console.log(
          `${nomcolonne} valeur accepté ${JSON.stringify(
            parametre
          )} valeur recu ${cleanedValue(
            checkValue.get(nomcolonne)
          )}`
        );
        errorMessage = `${nomcolonne} valeur accepté ${JSON.stringify(
          parametre
        )} valeur recu ${cleanedValue(
          checkValue.get(nomcolonne)
        )}`;
        res.write(errorMessage);
        return true;
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
          console.log(
            `${nomcolonne} valeur du mauvais type, type attendu ${parametre} valeur recu ${cleanedValue(
              checkValue.get(nomcolonne)
            )}`
          );
          errorMessage = `${nomcolonne} valeur du mauvais type, type attendu ${parametre} valeur recu ${cleanedValue(
            checkValue.get(nomcolonne)
          )}`;
          res.write(errorMessage);
          return true;
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
          console.log(
            `${nomcolonne} valeur du mauvais type, type attendu ${parametre} valeur recu ${cleanedValue(
              checkValue.get(nomcolonne)
            )}`
          );
          errorMessage = `${nomcolonne} valeur du mauvais type, type attendu ${parametre} valeur recu ${cleanedValue(
            checkValue.get(nomcolonne)
          )}`;
          res.write(errorMessage);
          return true;
        } else {
          checkValue.set(nomcolonne, parseInt(checkValue.get(nomcolonne)));
        }
      }
      if (params === "type" && parametre === "photo") {
        if (plante["photo"] === undefined) {
          if (file != undefined && file != null) {
            checkValue.set("photo", file.filename);
          }
        }
      }
    }
  }
  callback(checkValue);
};

module.exports = checkuserInputAdd;
