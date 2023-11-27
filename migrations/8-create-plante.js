'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Plantes', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING(5000),
        allowNull: false,
      },
      color_available: {
        type: Sequelize.STRING,
      },
      type_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'Tags',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      feuillage_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'Tags',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      collection_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'Tags',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      exposition_id: {
        type: Sequelize.UUID,
        references: {
          model: 'Tags',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      hauteur: {
        type: Sequelize.STRING,
      },
      mois_floraison: {
        type: Sequelize.STRING,
      },
      periode_floraison_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'Tags',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      besoin_eau_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'Tags',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      picture: {
        type: Sequelize.STRING,
      },
      availability: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      price_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'Prices',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      emplacement: {
        type: Sequelize.STRING,
      },
      quantiteProd: {
        type: Sequelize.INTEGER,
      },
      catchphrase: {
        type: Sequelize.STRING,
      },
      pot_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'Pots',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      hashPlante: {
        type: Sequelize.STRING,
        allowNull: false,
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
    await queryInterface.dropTable('Plantes');
  },
};
