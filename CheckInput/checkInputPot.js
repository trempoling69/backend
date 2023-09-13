const cleanedValue = (value) => {
  const cleanedValue = value.replace(/[<>]/g, '').trim();
  return cleanedValue;
};

const checkInputPot = (value, res, callback) => {
  const checkedValue = {};
  Object.keys(value).map((key) => {
    if (key === 'brand' || key === 'color') {
      checkedValue[key] = cleanedValue(value[key]);
    } else if (key === 'size') {
      if (isNaN(parseInt(value[key]))) {
        throw new Error('taille doit être un nombre');
      } else {
        checkedValue[key] = parseInt(value[key]);
      }
    }
  });
  callback(checkedValue);
};

module.exports = checkInputPot;
