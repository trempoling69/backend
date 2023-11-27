const { Sequelize, Op } = require('sequelize');
const { Price, Plante, CategoryPrice } = require('../utils/importbdd');
const { sendSuccessResponse } = require('../middleware/responseTemplate');
const { findAllPriceWithOneCategory, createNewCategory, deleteOneCategory } = require('../services/categoryPrice');
const { createPrice, updatePrice, findOnePrice, deleteOnePrice } = require('../services/price');

const getPriceWithFk = async (req, res, next) => {
  try {
    const { type } = req.params;
    let whereClause = {};
    if (type !== 'all') {
      whereClause = { type: { [Op.eq]: type } };
    }
    const price = await Price().findAll({
      where: whereClause,
      attributes: [
        'id',
        'name',
        'amount',
        'usualname',
        'type',
        [Sequelize.fn('COALESCE', Sequelize.fn('COUNT', Sequelize.col('Plantes.id')), 0), 'useFor'],
      ],
      include: [
        {
          model: Plante(),
          attributes: [],
          required: false,
        },
        { model: CategoryPrice(), attributes: ['name', 'id'] },
      ],
      group: ['Price.id'],
    });
    sendSuccessResponse(price, res, 200);
  } catch (err) {
    next(err);
  }
};

const postCreatePrice = async (req, res, next) => {
  try {
    let categoryId = req.body.CategoryPrice.id;
    if (categoryId === 'new') {
      const value = {
        name: req.body.CategoryPrice.name,
      };
      const category = await createNewCategory(value);
      categoryId = category.id;
    }
    const value = {
      name: req.body.name,
      usualname: req.body.usualname,
      amount: req.body.amount,
      type: 'BP',
      categoryId: categoryId,
    };
    await createPrice(value);
    sendSuccessResponse('Prix créé avec succès', res, 201);
  } catch (err) {
    next(err);
  }
};

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

const modifyPrice = async (req, res, next) => {
  try {
    let categoryId = req.body.categoryId;
    if (categoryId === 'new') {
      const value = {
        name: req.body.categoryName,
      };
      const category = await createNewCategory(value);
      categoryId = category.id;
    }
    const value = {
      name: req.body.name,
      usualname: req.body.usualname,
      amount: req.body.amount,
      type: req.params.type,
      categoryId: categoryId,
    };
    await updatePrice(req.params.id, value);
    sendSuccessResponse('Prix modifié avec succès', res, 200);
  } catch (err) {
    next(err);
  }
};

const deletePrice = async (req, res, next) => {
  try {
    const priceToDelete = await findOnePrice(req.params.id);
    const findAllPrice = await findAllPriceWithOneCategory(priceToDelete.category_id);
    if (findAllPrice[0].get('useBy') === 1) {
      await deleteOneCategory(priceToDelete.category_id);
    }
    await deleteOnePrice(priceToDelete.id);
    sendSuccessResponse('succes', res, 200);
  } catch (err) {
    next(err);
  }
};
module.exports = {
  getPriceWithFk,
  postCreatePrice,
  getAllPrice,
  modifyPrice,
  deletePrice,
};
