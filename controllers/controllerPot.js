const { Pot, Plante } = require('../utils/importbdd');
const { sendSuccessResponse } = require('../middleware/responseTemplate');
const { Sequelize } = require('../models');
const { Op } = require('sequelize');
const checkInputPot = require('../CheckInput/checkInputPot');

const allPots = async (req, res, next) => {
  try {
    const pots = await Pot().findAll({
      attributes: [
        'id',
        'brand',
        'color',
        'size',
        [Sequelize.fn('COALESCE', Sequelize.fn('COUNT', Sequelize.col('fk_plante.id')), 0), 'useFor'],
        [Sequelize.fn('COALESCE', Sequelize.fn('SUM', Sequelize.col('fk_plante.quantiteProd')), 0), 'useTotalBy'],
      ],
      include: [
        {
          model: Plante(),
          attributes: [],
          required: false,
          as: 'fk_plante',
        },
      ],
      group: ['Pot.id'],
    });
    sendSuccessResponse(pots, res, 200);
  } catch (err) {
    next(err);
  }
};

const createPot = (req, res, next) => {
  try {
    checkInputPot(req.body, res, (value) => {
      Pot()
        .create({
          brand: value.brand,
          size: value.size,
          color: value.color,
        })
        .then(() => {
          sendSuccessResponse('Pot bien enregistré', res, 201);
        })
        .catch((err) => {
          throw err;
        });
    });
  } catch (err) {
    next(err);
  }
};

const deletePot = async (req, res, next) => {
  try {
    const id = req.params.id;
    const findPot = await Pot().findOne({ where: { id: { [Op.eq]: id } } });
    if (findPot === null) {
      throw new Error('Aucun pot correspondant trouvé');
    }
    await Pot().destroy({ where: { id: { [Op.eq]: id } } });
    sendSuccessResponse('Pot supprimé', res, 200);
  } catch (err) {
    next(err);
  }
};
module.exports = { allPots, createPot, deletePot };
