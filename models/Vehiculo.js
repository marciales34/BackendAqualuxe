// models/Vehiculo.js
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database");

class Vehiculo extends Model {}

Vehiculo.init(
  {
    id_vehiculos: {
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
      type: DataTypes.STRING, // Aquí se almacena la ruta de la imagen
      allowNull: true,
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
    modelName: "Vehiculo",
    tableName: "vehiculos",
  }
);

module.exports = Vehiculo;
