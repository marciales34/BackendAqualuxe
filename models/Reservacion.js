/*models/Reservacion.js
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database");

class Reservacion extends Model {}

Reservacion.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    hora: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    servicio_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'servicios',
        key: 'id',
      },
      allowNull: false,
    },
    vehiculo_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'vehiculos',
        key: 'id',
      },
      allowNull: false,
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'usuarios',
        key: 'id',
      },
      allowNull: false,
    },
    autolavado_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'autolavados',
        key: 'id_autolavados',
      },
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "Reservacion",
    tableName: "reservas",
  }
);

module.exports = Reservacion;
*/