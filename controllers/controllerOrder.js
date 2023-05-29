const { Plante, Price } = require('../utils/importbdd');

const getAllProduct = (req, res) => {
  Plante()
    .findAll({
      include: [{ model: Price(), as: 'fk_price' }],
      attributes: ['id', 'photo', 'nom', 'dispo'],
    })
    .then((plantes) => {
      res.json(plantes);
    });
};

module.exports = { getAllProduct };
