const checkJsonValue = (object, res, rowbdd, callback) => {
  let erreur = false;
  let index = 0;
  for (let entry of rowbdd.entries()) {
    index++;
    if (typeof object[entry[0]] == "undefined") {
      res.send(
        entry[0] +
          " n'est pas définit dans le fichier excel pour" +
          JSON.stringify(object)
      );
      erreur = true;
      break;
    } else if (!erreur) {
      if (typeof object[entry[0]] != `${entry[1]}`) {
        res.send(
          entry[0] + " n'est pas du bon type dans" + JSON.stringify(object)
        );
        erreur = true;
        break;
      }
    }
  }
  if (erreur) {
    return erreur;
  } else {
    callback();
  }
};
module.exports = checkJsonValue;
