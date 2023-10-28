'use strict';

const { Op } = require('sequelize');
const { CategoryPrice, Price } = require('../utils/importbdd');
const { createHashPrice } = require('../utils/hashimportbdd');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const category1 = await CategoryPrice().findOne({ where: { name: { [Op.eq]: 'Collection_Price_1' } } });
    const category2 = await CategoryPrice().findOne({ where: { name: { [Op.eq]: 'Collection_Price_2' } } });
    return Price().bulkCreate([
      {
        name: 'Price_1',
        amount: 15.5,
        usualname: 'Prix_1',
        type: 'BP',
        category_id: category1.id,
        hashPrice: createHashPrice({
          name: 'Price_1',
          amount: 15.5,
          usualname: 'Prix_1',
          type: 'BP',
          category_id: category1.id,
        }),
      },
      {
        name: 'Price_2',
        amount: 12.0,
        usualname: 'Prix_2',
        type: 'BP',
        category_id: category2.id,
        hashPrice: createHashPrice({
          name: 'Price_2',
          amount: 12.0,
          usualname: 'Prix_2',
          type: 'BP',
          category_id: category2.id,
        }),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return Price().destroy({ where: {} });
  },
};
