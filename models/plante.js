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
        foreignKey: 'prix',
        as: 'fk_price',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });
    }
  }
  Plante.init(
    {
      nom: {
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
      couleur_dispo: DataTypes.STRING,
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      feuillage: DataTypes.STRING,
      collection: DataTypes.STRING,
      exposition: DataTypes.STRING,
      hauteur: DataTypes.STRING,
      mois_floraison: DataTypes.STRING,
      periode_floraison: DataTypes.STRING,
      besoin_eau: DataTypes.STRING,
      photo: DataTypes.STRING,
      dispo: {
        type: DataTypes.STRING,
        validate: {
          isIn: [['InStock', 'OutStock', 'null']],
        },
      },
      prix: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Prices',
          key: 'id',
        },
      },
      emplacement: DataTypes.STRING,
      quantiteProd: DataTypes.INTEGER,
      catchPhrase: DataTypes.STRING,
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
      timestamps: false,
    }
  );
  return Plante;
};
