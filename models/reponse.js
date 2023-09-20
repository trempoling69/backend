'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reponse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Reponse.init(
    {
      text_reponse: DataTypes.STRING,
      id_question_suivante: DataTypes.INTEGER,
      type_tri: DataTypes.STRING,
      colonne_filtre: DataTypes.STRING,
      filtre: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Reponse',
    }
  );
  return Reponse;
};
