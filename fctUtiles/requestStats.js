const { Op } = require('sequelize');
const { Plante, User } = require('../utils/importbdd');
const { getOneTag } = require('../services/tag');

const counteverything = async () => {
  var countAll = {};
  const typeVivace = await getOneTag('Vivace', 'type');
  const typeAnnuelle = await getOneTag('Annuelle', 'type');
  const typeArbuste = await await getOneTag('Arbuste', 'type');
  await Plante()
    .count({
      where: {
        type_id: {
          [Op.like]: typeVivace.id,
        },
      },
    })
    .then((count) => {
      countAll['Vivaces'] = count;
    });
  await Plante()
    .count({
      where: {
        type_id: {
          [Op.like]: typeAnnuelle.id,
        },
      },
    })
    .then((count) => {
      countAll['Annuelles'] = count;
    });
  await Plante()
    .count({
      where: {
        type_id: {
          [Op.like]: typeArbuste.id,
        },
      },
    })
    .then((count) => {
      countAll['Arbustes'] = count;
    });
  await Plante()
    .count({})
    .then((count) => {
      countAll['Plantes'] = count;
    });
  await Plante()
    .count({
      where: {
        availability: {
          [Op.like]: true,
        },
      },
    })
    .then((count) => {
      countAll['InStock'] = count;
    });
  await Plante()
    .count({
      where: {
        availability: {
          [Op.like]: false,
        },
      },
    })
    .then((count) => {
      countAll['OutStock'] = count;
    });
  await User()
    .count({})
    .then((count) => {
      countAll['user'] = count;
    });

  return countAll;
};

module.exports = counteverything;
