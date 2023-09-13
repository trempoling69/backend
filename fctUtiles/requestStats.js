const { Op } = require('sequelize');
const { Plante, User } = require('../utils/importbdd');

const counteverything = async () => {
  var countAll = {};
  await Plante()
    .count({
      where: {
        type: {
          [Op.like]: 'Vivace',
        },
      },
    })
    .then((count) => {
      countAll['Vivaces'] = count;
    });
  await Plante()
    .count({
      where: {
        type: {
          [Op.like]: 'Annuelle',
        },
      },
    })
    .then((count) => {
      countAll['Annuelles'] = count;
    });
  await Plante()
    .count({
      where: {
        type: {
          [Op.like]: 'Arbuste',
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
        dispo: {
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
        dispo: {
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
