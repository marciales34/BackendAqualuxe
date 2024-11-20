const express = require("express");
const upload = require("../multerConfig"); // Usa el archivo multerConfig.js para evitar duplicidad
const Vehiculo = require("../models/Vehiculo");
const router = express.Router();



router.post("/registrar", async (req, res) => {
  try {
    console.log("Cuerpo de la solicitud recibido:", req.body);

    const { marca, tipo, modelo, placa, color, usuario_id, imagenUrl } = req.body;

    if (!imagenUrl) {
      return res.status(400).json({ message: "La URL de la imagen es requerida" });
    }

    const nuevoVehiculo = await Vehiculo.create({
      marca,
      tipo,
      modelo,
      placa,
      color,
      imagen: imagenUrl,
      usuario_id,
    });

    res.status(201).json({
      message: "Vehículo registrado exitosamente",
      data: nuevoVehiculo,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Ocurrió un error al registrar el vehículo",
      error: error.message,
    });
  }
});



// Ruta para obtener todos los vehículos
router.get("/obtener", async (req, res) => {
  try {
    const vehiculos = await Vehiculo.findAll();
    res.status(200).json({
      message: "Vehículos obtenidos exitosamente.",
      data: vehiculos,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los vehículos.", error });
  }
});

// Ruta para obtener un vehículo por ID
router.get("/obtener/:id", async (req, res) => {
  try {
    const vehiculo = await Vehiculo.findByPk(req.params.id);
    if (!vehiculo) {
      return res.status(404).json({ message: "Vehículo no encontrado." });
    }
    res.status(200).json({
      message: "Vehículo obtenido exitosamente.",
      data: vehiculo,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener el vehículo.", error });
  }
});

router.get("/VehiculoCliente/:usuario_id", async (req, res) => {
  try {
    // Buscar los vehículos por el usuario_id
    const vehiculos = await Vehiculo.findAll({
      where: { usuario_id: req.params.usuario_id }, // Filtramos por usuario_id
    });

    if (vehiculos.length === 0) {
      return res.status(404).json({ message: "No se encontraron vehículos para este usuario." });
    }

    res.status(200).json({
      message: "Vehículos obtenidos exitosamente.",
      data: vehiculos,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los vehículos.", error });
  }
});


module.exports = router;
