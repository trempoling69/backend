const sequelize = require("sequelize");
require("dotenv").config();

exports.sequelizeconn = new sequelize(process.env.DB_TABLENAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOSTNAME,
  dialect: process.env.DB_DIALECT,
});
