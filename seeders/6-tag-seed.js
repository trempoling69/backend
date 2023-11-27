'use strict';

/** @type {import('sequelize-cli').Migration} */
const models = require('../models/index');
const Tag = models.Tag;
module.exports = {
  async up(queryInterface, Sequelize) {
    return Tag.bulkCreate([
      { name: 'Soleil', tag_type: 'exposition', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Ombre', tag_type: 'exposition', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Mi-ombre', tag_type: 'exposition', createdAt: new Date(), updatedAt: new Date() },
      { name: 'caduque', tag_type: 'feuillage', createdAt: new Date(), updatedAt: new Date() },
      { name: 'persistant', tag_type: 'feuillage', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Vivace', tag_type: 'type', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Arbuste', tag_type: 'type', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Annuelle', tag_type: 'type', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Collection1', tag_type: 'collection', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Collection2', tag_type: 'collection', createdAt: new Date(), updatedAt: new Date() },
      { name: 'été', tag_type: 'periode_floraison', createdAt: new Date(), updatedAt: new Date() },
      { name: 'automne', tag_type: 'periode_floraison', createdAt: new Date(), updatedAt: new Date() },
      { name: 'hiver', tag_type: 'periode_floraison', createdAt: new Date(), updatedAt: new Date() },
      { name: 'printemps', tag_type: 'periode_floraison', createdAt: new Date(), updatedAt: new Date() },
      { name: 'un peu', tag_type: 'besoin_eau', createdAt: new Date(), updatedAt: new Date() },
      { name: 'moyen', tag_type: 'besoin_eau', createdAt: new Date(), updatedAt: new Date() },
      { name: 'beaucoup', tag_type: 'besoin_eau', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down(queryInterface, Sequelize) {
    Tag.destroy({ where: {} });
  },
};
