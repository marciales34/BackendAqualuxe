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
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ciudad: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    modelName: "Trabajador",
    tableName: "trabajadores",
  }
);

module.exports = Trabajador;
