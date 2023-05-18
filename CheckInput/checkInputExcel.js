/**
 *?Fonction qui filtre les valeurs de plante,
 **Il prend un object Plante et un object bddPlante
 **Il verifie ensuite chaque valeurs
 **En cas de problème il écrit dans un fichier txt
 **l'erreur de la ligne, si tout vas bien il envoie
 **un object Map à une callback
 **/
const cleanedValue = (value) => {
  const cleanedValue = value.replace(/[<>]/g, '').trim();
  return cleanedValue;
};

exports.checkInputExcel = (plante, bddplante, index, actualSheet, filereport, resolve, callback) => {
  let error = false;
  index = index + 2;
  let checkValue = new Map([]);
  for (nomcolonne in bddplante) {
    if (plante[nomcolonne] == undefined) {
      if (bddplante[nomcolonne].notNull === true) {
        filereport('./logs/logs.txt', `${nomcolonne} devrai pas être null ligne ${index} dans la sheet ${actualSheet}`);
        checkValue.set(nomcolonne, 'erreur Non Null');
        error = true;
        // resolve();
        // return;
      } else {
        checkValue.set(nomcolonne, 'null');
      }
    } else {
      checkValue.set(nomcolonne, plante[nomcolonne]);
    }
    for (params in bddplante[nomcolonne]) {
      parametre = bddplante[nomcolonne][params];
      if (params === 'length' && checkValue.get(nomcolonne).length > parseInt(parametre)) {
        filereport(
          './logs/logs.txt',
          `${nomcolonne} valeur trop grande pour la ligne ${index} dans la sheet ${actualSheet}`
        );
        error = true;
        // resolve();
        // return;
      }
      if (params === 'valeurs' && !parametre.includes(checkValue.get(nomcolonne))) {
        filereport(
          './logs/logs.txt',
          `${nomcolonne} valeur accepté ${JSON.stringify(parametre)} pour la ligne ${index} valeur recu ${cleanedValue(
            checkValue.get(nomcolonne)
          )} dans la sheet ${actualSheet}`
        );
        error = true;
        // resolve();
        // return;
      }
      if (params === 'type' && parametre === 'string' && checkValue.get(nomcolonne) != 'null') {
        checkValue.set(nomcolonne, cleanedValue(checkValue.get(nomcolonne)));
      }
      if (params === 'type' && parametre === 'float' && checkValue.get(nomcolonne) != 'null') {
        if (isNaN(parseFloat(checkValue.get(nomcolonne)))) {
          filereport(
            './logs/logs.txt',
            `${nomcolonne} valeur du mauvais type, type attendu ${parametre} pour la ligne ${index} valeur recu ${cleanedValue(
              checkValue.get(nomcolonne)
            )} dans la sheet ${actualSheet}`
          );
          error = true;
          // resolve();
          // return;
        } else {
          checkValue.set(nomcolonne, parseFloat(checkValue.get(nomcolonne)));
        }
      }
      if (params === 'type' && parametre === 'int' && checkValue.get(nomcolonne) != 'null') {
        if (isNaN(parseInt(checkValue.get(nomcolonne)))) {
          filereport(
            './logs/logs.txt',
            `${nomcolonne} valeur du mauvais type, type attendu ${parametre} pour la ligne ${index} valeur recu ${cleanedValue(
              checkValue.get(nomcolonne)
            )} dans la sheet ${actualSheet}`
          );
          // resolve();
          // return;
          error = true;
        } else {
          checkValue.set(nomcolonne, parseInt(checkValue.get(nomcolonne)));
        }
      }
      if (params === 'type' && parametre === 'photo') {
        checkValue.set(nomcolonne, cleanedValue(checkValue.get(nomcolonne)));
      }
      if (params === 'type' && parametre === 'prix') {
        if (checkValue.get(nomcolonne) === 'null') {
          checkValue.set(nomcolonne, null);
        } else {
          if (isNaN(parseInt(checkValue.get(nomcolonne)))) {
            filereport(
              './logs/logs.txt',
              `${nomcolonne} valeur du mauvais type, type attendu ${parametre} pour la ligne ${index} valeur recu ${cleanedValue(
                checkValue.get(nomcolonne)
              )} dans la sheet ${actualSheet}`
            );
            error = true;
          } else {
            checkValue.set(nomcolonne, parseInt(checkValue.get(nomcolonne)));
          }
        }
      }
    }
  }
  if (error) {
    resolve();
    return;
  } else {
    callback(checkValue);
  }
};

exports.checkInputExcelPrice = (price, index, filereport, resolve, callback) => {
  let error = false;
  index = index + 2;
  let checkValue = new Map([]);
  if (price['name']) {
    checkValue.set('name', cleanedValue(price['name']));
  } else {
    filereport('./logs/logs.txt', `name valeur ne doit pas être null pour la ligne ${index} dans la sheet prix`);
    error = true;
  }
  if (price['type']) {
    const acceptValue = ['BP', 'OTHER'];
    if (acceptValue.includes(price['type'])) {
      checkValue.set('type', price['type']);
    } else {
      filereport(
        './logs/logs.txt',
        `type doit avec pour valeur "BP" ou "OTHER" valeur reçu  ${cleanedValue(
          price['type']
        )} pour la ligne ${index} dans la sheet prix`
      );
      error = true;
    }
  } else {
    filereport('./logs/logs.txt', `type valeur ne doit pas être null pour la ligne ${index} dans la sheet prix`);
    error = true;
  }
  if (price['category']) {
    checkValue.set('category', cleanedValue(price['category']));
  } else {
    checkValue.set('category', null);
  }
  if (price['usualname']) {
    checkValue.set('usualname', cleanedValue(price['usualname']));
  } else {
    filereport('./logs/logs.txt', `usualname valeur ne doit pas être null pour la ligne ${index} dans la sheet prix`);
    error = true;
  }
  if (price['amount']) {
    if (isNaN(parseFloat(price['amount']))) {
      filereport(
        './logs/logs.txt',
        `amount valeur du mauvais type, type attendu FLOAT pour la ligne ${index} valeur recu ${cleanedValue(
          price['amount']
        )} dans la sheet prix`
      );
      error = true;
    } else {
      checkValue.set('amount', parseFloat(price['amount']));
    }
  } else {
    filereport('./logs/logs.txt', `amount valeur ne doit pas être null pour la ligne ${index} dans la sheet prix`);
    error = true;
  }
  if (price['id']) {
    if (isNaN(parseInt(price['id']))) {
      filereport(
        './logs/logs.txt',
        `id valeur du mauvais type, type attendu INT pour la ligne ${index} valeur recu ${cleanedValue(
          price['id']
        )} dans la sheet prix`
      );
      error = true;
    } else {
      checkValue.set('id', parseInt(price['id']));
    }
  } else {
    checkValue.set('id', null);
  }
  if (error) {
    resolve();
    return;
  } else {
    callback(checkValue);
  }
};
