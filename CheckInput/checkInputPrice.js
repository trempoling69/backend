const cleanedValue = (value) => {
  const cleanedValue = value.replace(/[<>]/g, '').trim();
  return cleanedValue;
};

const checkInputPrice = (valueToCheck, res, callback) => {
  let checkValue = new Map([]);
  let errorMessage = '';
  if (valueToCheck['name']) {
    checkValue.set('name', cleanedValue(valueToCheck['name']));
  }
  if (valueToCheck['category']) {
    checkValue.set('category', cleanedValue(valueToCheck['category']));
  }
  if (valueToCheck['usualname']) {
    checkValue.set('usualname', cleanedValue(valueToCheck['usualname']));
  }
  if (valueToCheck['newCategory']) {
    checkValue.set('newCategory', cleanedValue(valueToCheck['newCategory']));
  }
  if (valueToCheck['amount']) {
    if (isNaN(parseFloat(valueToCheck['amount']))) {
      errorMessage = `Le nouveau prix entrée doit être de type FLOAT valeur reçu ${cleanedValue(
        valueToCheck['amount']
      )}`;
      res.write(errorMessage);
      return true;
    } else {
      checkValue.set('amount', parseFloat(valueToCheck['amount']));
    }
  }
  if (valueToCheck['id']) {
    if (isNaN(parseInt(valueToCheck['id']))) {
      errorMessage = "Une erreur est survenue avec l'id";
      res.write(errorMessage);
      return true;
    } else {
      checkValue.set('id', parseInt(valueToCheck['id']));
    }
  }
  callback(checkValue);
};

module.exports = checkInputPrice;
