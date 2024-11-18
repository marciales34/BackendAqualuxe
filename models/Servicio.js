// models/Servicio.js
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database");

class Servicio extends Model {}

Servicio.init(
  {
    id_servicios: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    precio: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Servicio",
    tableName: "servicios",
  }
);

module.exports = Servicio;
