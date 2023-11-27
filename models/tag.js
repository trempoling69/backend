'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tag.hasMany(models.Plante, {
        foreignKey: 'feuillage_id',
        as: 'feuillage',
      });
      Tag.hasMany(models.Plante, {
        foreignKey: 'exposition_id',
        as: 'exposition',
      });
      Tag.hasMany(models.Plante, {
        foreignKey: 'besoin_eau_id',
        as: 'besoin_eau',
      });
      Tag.hasMany(models.Plante, {
        foreignKey: 'periode_floraison_id',
        as: 'periode_floraison',
      });
      Tag.hasMany(models.Plante, {
        foreignKey: 'collection_id',
        as: 'collection',
      });
      Tag.hasMany(models.Plante, {
        foreignKey: 'type_id',
        as: 'type',
      });
    }
  }
  Tag.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: { type: DataTypes.STRING, allowNull: false },
      tag_type: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: 'Tag',
    }
  );
  return Tag;
};
