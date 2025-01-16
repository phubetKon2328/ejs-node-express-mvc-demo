const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("node-mysql-demo", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
