'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Type.hasMany(models.Plante, {
        foreignKey: 'type_id',
      });
    }
  }
  Type.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: 'Type',
    }
  );
  return Type;
};
