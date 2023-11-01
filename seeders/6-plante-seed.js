'use strict';

const { Op } = require('sequelize');
const { Plante, Type, Collection, Price, Pot } = require('../utils/importbdd');
const { createHashPlante } = require('../utils/hashimportbdd');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const typeVivace = await Type().findOne({ where: { name: { [Op.eq]: 'Vivace' } } });
    const typeAnnuelle = await Type().findOne({ where: { name: { [Op.eq]: 'Annuelle' } } });
    const typeArbuste = await Type().findOne({ where: { name: { [Op.eq]: 'Arbuste' } } });
    const collection1 = await Collection().findOne({ where: { name: { [Op.eq]: 'Collection1' } } });
    const collection2 = await Collection().findOne({ where: { name: { [Op.eq]: 'Collection2' } } });
    const price1 = await Price().findOne({ where: { name: { [Op.eq]: 'Price_1' } } });
    const price2 = await Price().findOne({ where: { name: { [Op.eq]: 'Price_2' } } });
    const pot1 = await Pot().findOne({ where: { color: { [Op.eq]: 'taupe' } } });
    const pot2 = await Pot().findOne({ where: { color: { [Op.eq]: 'vert' } } });
    const dataPlante1 = {
      name: 'Plante_1',
      description: 'description de la plante 1',
      color_available: 'rose / blanc / vert',
      type_id: typeVivace.id,
      feuillage: 'feuillage',
      collection_id: collection1.id,
      exposition: 'Soleil',
      hauteur: 'haute',
      mois_floraison: 'janvier - mars',
      periode_floraison: 'hiver',
      besoin_eau: 'peu',
      availability: true,
      price_id: price1.id,
      emplacement: 'serre verre',
      quantiteProd: 4000,
      catchphrase: 'belle plante 1',
      pot_id: pot1.id,
    };
    const dataPlante2 = {
      name: 'Plante_2',
      description: 'description de la plante 2',
      color_available: 'rose / blanc / vert',
      type_id: typeAnnuelle.id,
      feuillage: 'feuillage',
      collection_id: collection2.id,
      exposition: 'Ombre',
      hauteur: 'haute',
      mois_floraison: 'janvier - mars',
      periode_floraison: 'hiver',
      besoin_eau: 'peu',
      availability: true,
      price_id: price2.id,
      emplacement: 'serre verre',
      quantiteProd: 4000,
      catchphrase: 'belle plante 2',
      pot_id: pot2.id,
    };
    const dataPlante3 = {
      name: 'Plante_3',
      description: 'description de la plante 3',
      color_available: 'rose / blanc / vert',
      type_id: typeArbuste.id,
      feuillage: 'feuillage',
      collection_id: collection1.id,
      exposition: 'Soleil',
      hauteur: 'haute',
      mois_floraison: 'janvier - mars',
      periode_floraison: 'hiver',
      besoin_eau: 'peu',
      availability: true,
      price_id: price1.id,
      emplacement: 'serre verre',
      quantiteProd: 4000,
      catchphrase: 'belle plante 3',
      pot_id: pot2.id,
    };
    const dataPlante4 = {
      name: 'Plante_4',
      description: 'description de la plante 4',
      color_available: 'rose / blanc / vert',
      type_id: typeVivace.id,
      feuillage: 'feuillage',
      collection_id: collection2.id,
      exposition: 'Soleil',
      hauteur: 'haute',
      mois_floraison: 'janvier - mars',
      periode_floraison: 'hiver',
      besoin_eau: 'peu',
      availability: true,
      price_id: price1.id,
      emplacement: 'serre verre',
      quantiteProd: 4000,
      catchphrase: 'belle plante 4',
      pot_id: pot1.id,
    };
    const dataPlante5 = {
      name: 'Plante_5',
      description: 'description de la plante 5',
      color_available: 'rose / blanc / vert',
      type_id: typeAnnuelle.id,
      feuillage: 'feuillage',
      collection_id: collection2.id,
      exposition: 'Soleil',
      hauteur: 'haute',
      mois_floraison: 'janvier - mars',
      periode_floraison: 'hiver',
      besoin_eau: 'peu',
      availability: false,
      price_id: price2.id,
      emplacement: 'serre verre',
      quantiteProd: 4000,
      catchphrase: 'belle plante 5',
      pot_id: pot2.id,
    };
    Plante().bulkCreate([
      { ...dataPlante1, hashPlante: createHashPlante(dataPlante1) },
      { ...dataPlante2, hashPlante: createHashPlante(dataPlante2) },
      { ...dataPlante3, hashPlante: createHashPlante(dataPlante3) },
      { ...dataPlante4, hashPlante: createHashPlante(dataPlante4) },
      { ...dataPlante5, hashPlante: createHashPlante(dataPlante5) },
    ]);
  },

  async down(queryInterface, Sequelize) {
    Plante().destroy({ where: {} });
  },
};
