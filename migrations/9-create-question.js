'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Questions', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      texte_question: {
        type: Sequelize.STRING,
      },
      reponse_1: {
        type: Sequelize.UUID,
        references: {
          model: 'Reponses',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      reponse_2: {
        type: Sequelize.UUID,
        references: {
          model: 'Reponses',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      reponse_3: {
        type: Sequelize.UUID,
        references: {
          model: 'Reponses',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      reponse_4: {
        type: Sequelize.UUID,
        references: {
          model: 'Reponses',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      reponse_5: {
        type: Sequelize.UUID,
        references: {
          model: 'Reponses',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      reponse_6: {
        type: Sequelize.UUID,
        references: {
          model: 'Reponses',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      start: {
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
    await queryInterface.dropTable('Questions');
  },
};
