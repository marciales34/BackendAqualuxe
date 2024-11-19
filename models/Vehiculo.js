// models/Vehiculo.js
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database");

class Vehiculo extends Model {}

Vehiculo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    marca: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipo: {
      type: DataTypes.ENUM("deportivo", "clásico", "SUV", "sedán", "camioneta"), // Agrega más tipos según tus necesidades
      allowNull: false,
    },
    modelo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    placa: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imagen: {
      type: DataTypes.STRING, // BLOB para imagenes, puede cambiarse si lo necesitas
      allowNull: false, // Ahora no permite NULL
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'usuarios',
        key: 'id',
      },
      allowNull: false, // Ahora no permite NULL
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "Vehiculo",
    tableName: "vehiculos",
  }
);

module.exports = Vehiculo;
