const { Sequelize } = require('sequelize');
const { Price, Plante } = require('../utils/importbdd');

//* REQUETE GENERAL

const getAllPrice = (req, res) => {
  Price()
    .findAll()
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

const getAllPriceOfCategory = (req, res) => {
  const category = req.params.category;
  Price()
    .findAll({ where: { category } })
    .then((price) => {
      res.json(price);
    });
};

//* REQUETE GESTION DE PRIX BASIQUE

const getAllCategoryForBP = (req, res) => {
  Price()
    .findAll({
      attributes: ['category'],
      group: ['category'],
      where: {
        type: 'BP',
      },
    })
    .then((category) => {
      res.json(category);
    });
};

const getAllPriceForBP = (req, res) => {
  let priceWithPlante = [];
  let priceWithoutPlante = [];

  Plante()
    .findAll({
      attributes: [[Sequelize.fn('COUNT', Sequelize.col('description')), 'nombre_de_plantes']],
      include: [
        {
          model: Price(),
          attributes: ['amount', 'usualname', 'name', 'category', 'id'],
          where: { type: 'BP' },
          as: 'fk_price',
        },
      ],
      group: ['prix'],
    })
    .then((prices) => {
      priceWithPlante.push(prices);
      Price()
        .findAll({
          where: {
            type: 'BP',
            id: {
              [Sequelize.Op.notIn]: Sequelize.literal(`(SELECT DISTINCT prix FROM Plantes WHERE prix IS NOT NULL)`),
            },
          },
        })
        .then((prices) => {
          priceWithoutPlante.push(prices);
          let formatedArray = [];
          formatedArray.push(
            priceWithoutPlante[0].map((price) => {
              return { nombre_de_plantes: 0, fk_price: price };
            })
          );
          let arrayPrices = [...priceWithPlante[0], ...formatedArray[0]];
          console.log(arrayPrices);
          res.json(arrayPrices);
        })
        .catch((error) => {
          console.log(error);
          res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des prix.' });
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des prix.' });
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

//* REQUETE GESTION DE PRIX SPECIFIQUE

const getAllPriceForSpe = (req, res) => {
  Plante()
    .findAll({
      attributes: ["nom", "type", "id"],
      include: [
        {
          model: Price(),
          attributes: ['amount', 'usualname', 'name', 'category', 'id'],
          where: { type: 'OTHER' },
          as: 'fk_price',
        },
      ],
      group: ['prix'],
    })
    .then((prices) => {
      res.json(prices);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des prix.' });
    });
};
module.exports = {
  getAllCategory,
  getAllPriceOfCategory,
  getAllPrice,
  createNewPrice,
  getAllCategoryForBP,
  getAllPriceForBP,
  getAllPriceForSpe,
};
