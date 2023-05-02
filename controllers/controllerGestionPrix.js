const { Price } = require('../utils/importbdd');

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

const getAllPriceOfCategory = (req, res) => {
  const category = req.params.category;
  Price()
    .findAll({ where: { category } })
    .then((price) => {
      res.json(price);
    });
};
const getAllPrice = (req, res) => {
  Price()
    .findAll()
    .then((price) => {
      res.json(price);
    });
};

const createNewPrice = (req, res) => {
  console.log(req.body);
  if (req.body.action === 'modification') {
    if (req.body.category === 'new') {
      Price()
        .update(
          {
            name: req.body.name,
            amount: req.body.amount,
            usualname: req.body.usualname,
            type: req.body.type,
            category: req.body.newCategory,
          },
          { where: { id: req.body.id } }
        )
        .then(() => {
          res.status(200).send('ok');
        });
    } else {
      Price()
        .update(
          {
            name: req.body.name,
            amount: req.body.amount,
            usualname: req.body.usualname,
            type: req.body.type,
            category: req.body.category,
          },
          { where: { id: req.body.id } }
        )
        .then(() => {
          res.status(200).send('ok');
        });
    }
  } else {
    if (req.body.category === 'new') {
      Price()
        .create({
          name: req.body.name,
          amount: req.body.amount,
          usualname: req.body.usualname,
          type: req.body.type,
          category: req.body.newCategory,
        })
        .then(() => {
          res.status(200).send('ok');
        });
    } else {
      Price()
        .create({
          name: req.body.name,
          amount: req.body.amount,
          usualname: req.body.usualname,
          type: req.body.type,
          category: req.body.category,
        })
        .then(() => {
          res.status(200).send('ok');
        });
    }
  }
};

module.exports = { getAllCategory, getAllPriceOfCategory, getAllPrice, createNewPrice };
