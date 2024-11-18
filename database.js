
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("aqualuxe", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

module.exports = sequelize;
