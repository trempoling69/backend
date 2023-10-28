'use strict';

const { User } = require('../utils/importbdd');
const bcrypt = require('bcryptjs');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await User().bulkCreate([
      {
        username: 'dev',
        password: await bcrypt.hash('test', 10),
        role: 'basique',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    User().destroy({ where: {} });
  },
};
