// models/Trabajador.js
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database");

class Trabajador extends Model {}

Trabajador.init(
  {
    id_trabajadores: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellidos: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hoja_vida: {
      type: DataTypes.STRING,
      allowNull: true, // Asumiendo que puede ser opcional
    },
  },
  {
    sequelize,
    modelName: "Trabajador",
    tableName: "trabajadores",
  }
);

module.exports = Trabajador;
