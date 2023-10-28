'use strict';

const { CategoryPrice } = require('../utils/importbdd');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return CategoryPrice().bulkCreate([
      { name: 'Collection_Price_1', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Collection_Price_2', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return CategoryPrice().destroy({ where: {} });
  },
};
