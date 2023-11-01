const { Op } = require('sequelize');
const { Type } = require('../utils/importbdd');

const getOneType = async (typeName) => {
  try {
    const typeFind = await Type().findOne({ where: { name: { [Op.eq]: typeName } } });
    if (typeFind === null) {
      throw new Error('Aucun type correspondant à ce nom trouvé');
    }
    return typeFind;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

module.exports = { getOneType };
