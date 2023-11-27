'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Plante extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Plante.belongsTo(models.Price, {
        foreignKey: 'price_id',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });
      Plante.belongsTo(models.Pot, {
        foreignKey: 'pot_id',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });
      Plante.belongsTo(models.Tag, {
        foreignKey: 'type_id',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        as: 'type',
      });
      Plante.belongsTo(models.Tag, {
        foreignKey: 'collection_id',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        as: 'collection',
      });
      Plante.belongsTo(models.Tag, {
        foreignKey: 'feuillage_id',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        as: 'feuillage',
      });
      Plante.belongsTo(models.Tag, {
        foreignKey: 'exposition_id',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        as: 'exposition',
      });
      Plante.belongsTo(models.Tag, {
        foreignKey: 'besoin_eau_id',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        as: 'besoin_eau',
      });
      Plante.belongsTo(models.Tag, {
        foreignKey: 'periode_floraison_id',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        as: 'periode_floraison',
      });
    }
  }
  Plante.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      description: {
        type: DataTypes.STRING(5000),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      color_available: DataTypes.STRING,
      type_id: {
        type: DataTypes.UUID,
        references: {
          model: 'Tags',
          key: 'id',
        },
        validate: {
          notEmpty: true,
        },
      },
      feuillage_id: {
        type: DataTypes.UUID,
        references: {
          model: 'Tags',
          key: 'id',
        },
        validate: {
          notEmpty: false,
        },
      },
      collection_id: {
        type: DataTypes.UUID,
        references: {
          model: 'Tags',
          key: 'id',
        },
      },
      exposition_id: {
        type: DataTypes.UUID,
        references: {
          model: 'Tags',
          key: 'id',
        },
        validate: {
          notEmpty: false,
        },
      },
      hauteur: DataTypes.STRING,
      mois_floraison: DataTypes.STRING,
      periode_floraison_id: {
        type: DataTypes.UUID,
        references: {
          model: 'Tags',
          key: 'id',
        },
        validate: {
          notEmpty: false,
        },
      },
      besoin_eau_id: {
        type: DataTypes.UUID,
        references: {
          model: 'Tags',
          key: 'id',
        },
        validate: {
          notEmpty: false,
        },
      },
      picture: DataTypes.STRING,
      availability: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
        validate: {
          notEmpty: true,
          isIn: [[0, 1, true, false]],
        },
      },
      price_id: {
        type: DataTypes.UUID,
        references: {
          model: 'Prices',
          key: 'id',
        },
      },
      emplacement: DataTypes.STRING,
      quantiteProd: DataTypes.INTEGER,
      catchphrase: DataTypes.STRING,
      pot_id: {
        type: DataTypes.UUID,
        references: {
          model: 'Pots',
          key: 'id',
        },
      },
      hashPlante: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      modelName: 'Plante',
    }
  );
  return Plante;
};
