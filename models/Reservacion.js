// models/Reservacion.js
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database");

class Reservacion extends Model {}

Reservacion.init(
  {
    id_reservaciones: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fecha_reservacion: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    hora_reservacion: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    id_servicios: {
      type: DataTypes.INTEGER,
      references: {
        model: 'servicios',
        key: 'id_servicios',
      },
      allowNull: false,
    },
    id_usuarios: {
      type: DataTypes.INTEGER,
      references: {
        model: 'usuarios',
        key: 'id_usuarios',
      },
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Reservacion",
    tableName: "reservaciones",
  }
);

module.exports = Reservacion;
