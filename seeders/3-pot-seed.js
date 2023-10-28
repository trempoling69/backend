'use strict';

const { Pot } = require('../utils/importbdd');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return Pot().bulkCreate([
      { size: 17, color: 'taupe', brand: 'sogepo', createdAt: new Date(), updatedAt: new Date() },
      { size: 15, color: 'vert', brand: 'sogepo', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return Pot().destroy({ where: {} });
  },
};
