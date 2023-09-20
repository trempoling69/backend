const { Sequelize, Op } = require('sequelize');
const { Price, Plante } = require('../utils/importbdd');
const checkInputPrice = require('../CheckInput/checkInputPrice');
const { sendSuccessResponse } = require('../middleware/responseTemplate');
const checkSchema = require('../CheckInput/checkSchema');
const priceSchema = require('../CheckInput/schema/price');
const { createHashPrice } = require('../utils/hashimportbdd');

//* REQUETE GENERAL
const getAllPrice = async (req, res, next) => {
  try {
    const { type } = req.params;
    let whereClause = {};
    if (type !== 'all') {
      whereClause = { type: { [Op.eq]: type } };
    }
    const allPrice = await Price().findAll({ where: whereClause });
    sendSuccessResponse(allPrice, res, 200);
  } catch (err) {
    next(err);
  }
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

const deleteOnePrice = (req, res) => {
  Price()
    .findOne({ where: { id: parseInt(req.params.id) } })
    .then((price) => {
      if (price === null) {
        res.status(400).json('pas de prix qui correspond à cet id');
        return;
      }
      Price()
        .destroy({ where: { id: parseInt(req.params.id) } })
        .then(() => {
          res.status(200).json('ok');
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json('Une erreur est sruvenue lors de la suppression');
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json('Une erreur est sruvenue lors de la suppression');
    });
};
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

const modifBasicPrice = (req, res) => {
  if (req.body.category === 'new') {
    checkInputPrice(req.body, res, (data) => {
      Price()
        .update(
          {
            name: data.get('name'),
            amount: data.get('amount'),
            usualname: data.get('usualname'),
            category: data.get('newCategory'),
          },
          { where: { id: data.get('id') } }
        )
        .then(() => {
          res.status(200).send('ok');
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json("Une erreur est survenu dans l'enregistrement du prix");
        });
    });
  } else {
    checkInputPrice(req.body, res, (data) => {
      Price()
        .update(
          {
            name: data.get('name'),
            amount: data.get('amount'),
            usualname: data.get('usualname'),
            category: data.get('category'),
          },
          { where: { id: data.get('id') } }
        )
        .then(() => {
          res.status(200).send('ok');
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json("Une erreur est survenu dans l'enregistrement du prix");
        });
    });
  }
};

const addBPToCategory = (req, res) => {
  checkInputPrice(req.body, res, (data) => {
    Price()
      .create({
        name: data.get('name'),
        amount: data.get('amount'),
        usualname: data.get('usualname'),
        type: 'BP',
        category: req.params.category,
      })
      .then(() => {
        res.status(200).send('ok');
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json('Une erreur est survenu lors de la création du prix');
      });
  });
};

const addNewPriceToNewCat = (req, res) => {
  checkInputPrice(req.body, res, (data) => {
    Price()
      .create({
        name: data.get('name'),
        amount: data.get('amount'),
        usualname: data.get('usualname'),
        type: 'BP',
        category: data.get('category'),
        hashPrice: 'coucoumongrand' //! ATTENTION LA
      })
      .then(() => {
        res.status(200).json('ok');
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json('Une erreur est survenu lors de la création du prix');
      });
  });
};
//* REQUETE GESTION DE PRIX SPECIFIQUE

const getAllPriceForSpe = (req, res) => {
  let priceWithPlante = [];
  let priceWithoutPlante = [];
  Plante()
    .findAll({
      attributes: ['nom', 'type', 'id'],
      include: [
        {
          model: Price(),
          attributes: [
            'amount',
            'usualname',
            'name',
            'category',
            'id',
            [Sequelize.fn('COUNT', Sequelize.col('description')), 'nombre_de_plantes'],
          ],
          where: { type: 'OTHER' },
          as: 'fk_price',
        },
      ],
      group: ['prix'],
    })
    .then((prices) => {
      // res.json(prices);
      priceWithPlante.push(prices);
      Price()
        .findAll({
          where: {
            type: 'OTHER',
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
              return { nombre_de_plantes: 0, nom: 'aucune plante', type: 'aucun', fk_price: price };
            })
          );
          let arrayPrices = [...priceWithPlante[0], ...formatedArray[0]];
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

const modifSpecificPrice = (req, res) => {
  checkInputPrice(req.body, res, (data) => {
    Price()
      .update(
        {
          name: data.get('name'),
          amount: data.get('amount'),
          usualname: data.get('usualname'),
        },
        { where: { id: data.get('id') } }
      )
      .then(() => {
        res.status(200).send('ok');
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json("Une erreur est survenu dans l'enregistrement du prix");
      });
  });
};

const addNewPrice = async (value) => {
  try {
    const checkValue = await new Promise((resolve, _reject) => {
      checkSchema(value, priceSchema.body.addPrice, (result) => {
        resolve(result);
      });
    });
    const hashPrice = createHashPrice(checkValue);
    const prix = await Price().create({
      name: checkValue.name,
      usualname: checkValue.usualname,
      amount: checkValue.amount,
      type: checkValue.type,
      hashPrice: hashPrice,
    });
    return prix;
  } catch (err) {
    throw new Error('erreur lors de la création de prix');
  }
};

const deletePrice = async (id) => {
  try {
    const priceToDelete = await Price().findOne({ where: { id: { [Op.eq]: id } } });
    if (priceToDelete === null) {
      throw new Error('Pas de prix avec cet id');
    }
    await Price().destroy({ where: { id: { [Op.eq]: id } } });
  } catch (err) {
    throw new Error(err);
  }
};
module.exports = {
  getAllCategory,
  getAllPriceOfCategory,
  getAllPrice,
  getAllCategoryForBP,
  getAllPriceForBP,
  getAllPriceForSpe,
  modifBasicPrice,
  addBPToCategory,
  addNewPriceToNewCat,
  deleteOnePrice,
  modifSpecificPrice,
  addNewPrice,
  deletePrice,
};
