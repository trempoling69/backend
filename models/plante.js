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
        as: 'fk_price',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });
      Plante.belongsTo(models.Pot, {
        foreignKey: 'pot_id',
        as: 'fk_pot',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });
      Plante.belongsTo(models.Type, {
        foreignKey: 'type_id',
        as: 'fk_type',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });
      Plante.belongsTo(models.Collection, {
        foreignKey: 'collection_id',
        as: 'fk_collection',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
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
          model: 'Types',
          key: 'id',
        },
        validate: {
          notEmpty: true,
        },
      },
      feuillage: DataTypes.STRING,
      collection_id: {
        type: DataTypes.UUID,
        references: {
          model: 'Collections',
          key: 'id',
        },
      },
      exposition: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: { isIn: [['Soleil', 'Ombre', 'Mi-ombre', 'Polyvalent']] },
      },
      hauteur: DataTypes.STRING,
      mois_floraison: DataTypes.STRING,
      periode_floraison: DataTypes.STRING,
      besoin_eau: DataTypes.STRING,
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
