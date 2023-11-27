'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reponses', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      text_reponse: {
        type: Sequelize.STRING,
      },
      id_question_suivante: {
        type: Sequelize.INTEGER,
      },
      type_tri: {
        type: Sequelize.STRING,
      },
      colonne_filtre: {
        type: Sequelize.STRING,
      },
      filtre: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Reponses');
  },
};
