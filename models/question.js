"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Question.belongsTo(models.Reponse, {
        foreignKey: "reponse_1",
        as: "Reponse1",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });
      Question.belongsTo(models.Reponse, {
        foreignKey: "reponse_2",
        as: "Reponse2",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });
      Question.belongsTo(models.Reponse, {
        foreignKey: "reponse_3",
        as: "Reponse3",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });
      Question.belongsTo(models.Reponse, {
        foreignKey: "reponse_4",
        as: "Reponse4",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });
      Question.belongsTo(models.Reponse, {
        foreignKey: "reponse_5",
        as: "Reponse5",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });
      Question.belongsTo(models.Reponse, {
        foreignKey: "reponse_6",
        as: "Reponse6",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });
    }
  }
  Question.init(
    {
      texte_question: DataTypes.STRING,
      reponse_1: {
        type: DataTypes.INTEGER,
        references: {
          model: "reponses",
          key: "id",
        },
      },
      reponse_2: {
        type: DataTypes.INTEGER,
        references: {
          model: "reponses",
          key: "id",
        },
      },
      reponse_3: {
        type: DataTypes.INTEGER,
        references: {
          model: "reponses",
          key: "id",
        },
      },
      reponse_4: {
        type: DataTypes.INTEGER,
        references: {
          model: "reponses",
          key: "id",
        },
      },
      reponse_5: {
        type: DataTypes.INTEGER,
        references: {
          model: "reponses",
          key: "id",
        },
      },
      reponse_6: {
        type: DataTypes.INTEGER,
        references: {
          model: "reponses",
          key: "id",
        },
      },
      start: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Question",
      timestamps: false,
    }
  );
  return Question;
};
