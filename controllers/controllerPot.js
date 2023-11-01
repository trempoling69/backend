const { Pot, Plante } = require('../utils/importbdd');
const { sendSuccessResponse } = require('../middleware/responseTemplate');
const { Sequelize } = require('../models');
const { Op } = require('sequelize');

const allPots = async (req, res, next) => {
  try {
    const pots = await Pot().findAll({
      attributes: [
        'id',
        'brand',
        'color',
        'size',
        [Sequelize.fn('COALESCE', Sequelize.fn('COUNT', Sequelize.col('Plantes.id')), 0), 'useFor'],
        [Sequelize.fn('COALESCE', Sequelize.fn('SUM', Sequelize.col('Plantes.quantiteProd')), 0), 'useTotalBy'],
      ],
      include: [
        {
          model: Plante(),
          attributes: [],
          required: false,
        },
      ],
      group: ['Pot.id'],
    });
    sendSuccessResponse(pots, res, 200);
  } catch (err) {
    next(err);
  }
};

const createPot = async (req, res, next) => {
  try {
    const { brand, size, color } = req.body;
    await Pot().create({
      brand,
      size,
      color,
    });
    sendSuccessResponse('Pot bien enregistré', res, 201);
  } catch (err) {
    next(err);
  }
};

const deletePot = async (req, res, next) => {
  try {
    const { id } = req.params;
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

const updatePot = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { brand, size, color } = req.body;
    await Pot().update(
      {
        brand,
        size,
        color,
      },
      { where: { id: { [Op.eq]: id } } }
    );
    sendSuccessResponse('Pot modifié', res, 200);
  } catch (err) {
    next(err);
  }
};
module.exports = { allPots, createPot, deletePot, updatePot };
