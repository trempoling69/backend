const { Op, Sequelize } = require('sequelize');
const checkSchema = require('../CheckInput/checkSchema');
const categoryPriceSchema = require('../CheckInput/schema/categoryPrice');
const { CategoryPrice, Price } = require('../utils/importbdd');

const findOneCategory = async (id) => {
  try {
    const category = await CategoryPrice().findOne({ where: { id: { [Op.eq]: id } } });
    if (category === null) {
      throw new Error('Aucune categorie de prix correspondant à cet id trouvé');
    }
    return category;
  } catch (err) {
    console.log(err);
    throw new Error('Erreur lors de la récupération de la catégorie de prix');
  }
};
const createNewCategory = async (value) => {
  try {
    const checkValue = await new Promise((resolve, _reject) => {
      checkSchema(value, categoryPriceSchema.object, (result) => {
        resolve(result);
      });
    });
    const category = await CategoryPrice().create({
      name: checkValue.name,
    });

    return category;
  } catch (err) {
    throw new Error('Erreur lors de la création de la catégorie de prix');
  }
};
const deleteOneCategory = async (id) => {
  try {
    const categoryToDelete = await findOneCategory(id);
    await CategoryPrice().destroy({ where: { id: { [Op.eq]: categoryToDelete.id } } });
  } catch (err) {
    throw new Error('Erreur lors de la suppression de la catégorie');
  }
};
const findAllPriceWithOneCategory = async (id) => {
  try {
    const allPrice = await CategoryPrice().findAll({
      where: { id: { [Op.eq]: id } },
      attributes: [[Sequelize.fn('COUNT', Sequelize.col('fk_price.id')), 'useBy']],
      include: [
        {
          model: Price(),
          attributes: [],
          required: false,
          as: 'fk_price',
        },
      ],
    });
    return allPrice;
  } catch (err) {
    console.log(err);
    throw new Error('Erreur lors de la récupération des prix de la catégorie');
  }
};
module.exports = { createNewCategory, findOneCategory, deleteOneCategory, findAllPriceWithOneCategory };
