'use strict';

const { Collection } = require('../utils/importbdd');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return Collection().bulkCreate([
      { name: 'Collection1', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Collection2', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return Collection().detroy({ where: {} });
  },
};
