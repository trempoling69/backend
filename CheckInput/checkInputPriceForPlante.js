const cleanedValue = (value) => {
  const cleanedValue = value?.replace(/[<>]/g, '').trim();
  return cleanedValue;
};

const checkInputPriceForPlante = (valueToCheck, res, callback) => {
  let checkValue = new Map([]);
  let errorMessage = '';
  let error = false;
  checkValue.set('nom', cleanedValue(valueToCheck['nom']));
  if (isNaN(parseFloat(valueToCheck['newPrice']))) {
    errorMessage = `Le nouveau prix entrée doit être de type FLOAT valeur reçu ${cleanedValue(
      valueToCheck['newPrice']
    )}`;
    res.write(errorMessage);
    error = true;
    return true;
  } else {
    checkValue.set('newPrice', parseFloat(valueToCheck['newPrice']));
  }
  if (!error) {
    callback(checkValue);
  }
};

module.exports = checkInputPriceForPlante;
