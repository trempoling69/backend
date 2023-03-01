const sequelize = require("sequelize");
const dbuser = require("./user");
const dbplantes = require("./plante");
const dbquiz = require("./quiz");
const dbquestion = require("./question");
const dbreponse = require("./reponse");
var con = require("./conn");
var sequelizeconn = con.sequelizeconn;

const User = dbuser(sequelizeconn, sequelize);

const Plante = dbplantes(sequelizeconn, sequelize);

const Quiz = dbquiz(sequelizeconn, sequelize);

const Question = dbquestion(sequelizeconn, sequelize);

const Reponse = dbreponse(sequelizeconn, sequelize);

Question.belongsTo(Reponse, { foreignKey: 'reponse_1', as: 'Reponse1' });
Question.belongsTo(Reponse, { foreignKey: 'reponse_2', as: 'Reponse2' });
Question.belongsTo(Reponse, { foreignKey: 'reponse_3', as: 'Reponse3' });
Question.belongsTo(Reponse, { foreignKey: 'reponse_4', as: 'Reponse4' });
Question.belongsTo(Reponse, { foreignKey: 'reponse_5', as: 'Reponse5' });
Question.belongsTo(Reponse, { foreignKey: 'reponse_6', as: 'Reponse6' });

module.exports = { User, Plante, Quiz, Question, Reponse };

