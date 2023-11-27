const { Op } = require('sequelize');
const { Tag } = require('../utils/importbdd');

const getOneTag = async (name, tag_type) => {
  try {
    const tagFind = await Tag().findOne({ where: { name: { [Op.eq]: name }, tag_type: { [Op.eq]: tag_type } } });
    if (tagFind === null) {
      throw new Error('Aucun tag correspondant à ce nom et type trouvé');
    }
    return tagFind;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

module.exports = { getOneTag };
