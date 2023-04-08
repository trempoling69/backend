const { Price } = require('../utils/importbdd');

const getAllPrice = (req, res) => {
  const category = req.params.category;
  Price()
    .findAll({ where: { category } })
    .then((price) => {
      res.json(price);
    });
};

const getAllCategory = (req, res) => {
  Price()
    .findAll({
      attributes: ['category'],
      group: ['category'],
    })
    .then((category) => {
      res.json(category);
    });
};

module.exports = { getAllPrice, getAllCategory };
