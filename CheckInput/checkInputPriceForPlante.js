const cleanedValue = (value) => {
    const cleanedValue = value.replace(/[<>]/g, '').trim();
    return cleanedValue;
  };
  
  const checkInputPriceForPlante = (valueToCheck, res, callback) => {
    let checkValue = new Map([]);
    let errorMessage = '';
    checkValue.set('nom', cleanedValue(valueToCheck['nom']));
    if (isNaN(parseFloat(valueToCheck['newPrice']))) {
      errorMessage = `Le nouveau prix entrée doit être de type FLOAT valeur reçu ${cleanedValue(
        valueToCheck['newPrice']
      )}`;
      res.write(errorMessage);
      return true;
    } else {
      checkValue.set('newPrice', parseFloat(valueToCheck['newPrice']));
    }
    callback(checkValue);
  };
  
  module.exports = checkInputPriceForPlante;