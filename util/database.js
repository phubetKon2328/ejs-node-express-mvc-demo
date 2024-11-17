const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("node-mysql-demo", "root", "ocz125yh", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
