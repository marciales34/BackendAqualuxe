// models/Reservacion.js
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database");

class Autolavado extends Model {}

Autolavado.init(
  {
    id_autolavado: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre_autolavado: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    horario: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Autolavado",
    tableName: "autolavados",
  }
);

module.exports = Autolavado;
