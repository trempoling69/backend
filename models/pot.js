'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Pot.hasMany(models.Plante, {
        foreignKey: 'potId',
        as: 'fk_plante',
      });
    }
  }
  Pot.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      size: DataTypes.INTEGER,
      color: DataTypes.STRING,
      brand: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Pot',
    }
  );
  return Pot;
};
