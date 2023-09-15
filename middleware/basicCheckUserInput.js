const Joi = require('joi');
const cleanedValue = (value) => {
  const cleanedValue = value.replace(/[<>]/g, '').trim();
  return cleanedValue;
};
function cleanValue(value) {
  if (typeof value === 'string') {
    value = cleanedValue(value);
  } else if (typeof value === 'object') {
    for (const key in value) {
      if (typeof value[key] === 'string') {
        value[key] = cleanedValue(value[key]);
      } else if (typeof value[key] === 'object') {
        cleanValue(value[key]);
      }
    }
  }
}
const basicCheckUserInput = (schema, property) => {
  return (req, _res, next) => {
    cleanValue(req[property]);
    const { error } = schema.validate(req[property]);
    const valid = error == null;

    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(',');

      throw new Error(message);
    }
  };
};

module.exports = basicCheckUserInput;
