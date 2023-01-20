const sequelize = require('sequelize')
const dbuser = require("./user");
const dbplantes = require("./plante");
const dbquiz = require("./quiz");
var con = require("./conn")
var sequelizeconn = con.sequelizeconn

exports.User = dbuser(sequelizeconn, sequelize);

exports.Plante = dbplantes(sequelizeconn, sequelize);

exports.Quiz = dbquiz(sequelizeconn, sequelize);