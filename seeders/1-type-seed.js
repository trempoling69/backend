'use strict';

/** @type {import('sequelize-cli').Migration} */
const models = require('../models/index');
const Type = models.Type;
module.exports = {
  async up(queryInterface, Sequelize) {
    return Type.bulkCreate([
      { name: 'Vivace', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Arbuste', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Annuelle', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return Type.destroy({ where: {} });
  },
};
