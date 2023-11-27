const { Op } = require('sequelize');
const checkSchema = require('../CheckInput/checkSchema');
const priceSchema = require('../CheckInput/schema/price');
const { createHashPrice } = require('../utils/hashimportbdd');
const { Price } = require('../utils/importbdd');

const findOnePrice = async (id) => {
  try {
    const priceFind = await Price().findOne({ where: { id: { [Op.eq]: id } } });
    if (priceFind === null) {
      throw new Error('Aucun prix correspondant à cet id trouvé');
    }
    return priceFind;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

const deleteOnePrice = async (id) => {
  try {
    const priceToDelete = await findOnePrice(id);
    await Price().destroy({ where: { id: { [Op.eq]: priceToDelete.id } } });
  } catch (err) {
    console.log(err);
    throw new Error('Erreur lors de la suppression du prix');
  }
};

const createPrice = async (value) => {
  try {
    const checkValue = await new Promise((resolve, _reject) => {
      checkSchema(value, priceSchema.body.price, (result) => {
        resolve(result);
      });
    });
    const hashPrice = createHashPrice(checkValue);
    const priceCreate = await Price().create({
      name: checkValue.name,
      usualname: checkValue.usualname,
      amount: checkValue.amount,
      type: checkValue.type,
      category_id: checkValue.categoryId,
      hashPrice: hashPrice,
    });
    return priceCreate;
  } catch (err) {
    console.log(err);
    throw new Error('erreur lors de la création de prix');
  }
};

const updatePrice = async (id, value) => {
  try {
    const checkValue = await new Promise((resolve, _reject) => {
      checkSchema(value, priceSchema.body.price, (result) => {
        resolve(result);
      });
    });
    const priceToModify = await findOnePrice(id);
    const hashPrice = createHashPrice(checkValue);
    const priceUpdate = await Price().update(
      {
        name: checkValue.name,
        usualname: checkValue.usualname,
        amount: checkValue.amount,
        type: checkValue.type,
        categoryId: checkValue.categoryId,
        hashPrice: hashPrice,
      },
      { where: { id: { [Op.eq]: priceToModify.id } } }
    );
    return priceUpdate;
  } catch (err) {
    console.log(err);
    throw new Error('Erreur lors de la modification du prix');
  }
};

const updateAmountPrice = async (id, amount) => {
  try {
    if (isNaN(parseFloat(amount))) {
      throw new Error('need a number');
    }
    const priceToModify = await findOnePrice(id);
    if (priceToModify === null) {
      throw new Error();
    }
    if (priceToModify.amount === amount) {
      return priceToModify;
    }
    const hashPrice = createHashPrice({ ...priceToModify, amount: amount });
    const priceUpdate = await Price().update(
      {
        amount,
        hashPrice,
      },
      { where: { id: { [Op.eq]: priceToModify.id } }}
    );
    if (!priceUpdate) throw ('Error while Updating');
    const newPrice = await findOnePrice(id);
    return newPrice;
  } catch (err) {
    console.log(err);
    throw new Error('Erreur lors de la modification de la valeur du prix');
  }
};

module.exports = { deleteOnePrice, createPrice, updatePrice, findOnePrice, updateAmountPrice };
