const express = require("express");
const upload = require("../multerConfig"); // Usa el archivo multerConfig.js para evitar duplicidad
const Vehiculo = require("../models/Vehiculo");
const router = express.Router();



// Endpoint para registrar un vehículo
router.post("/registrar", upload.single("imagen"), async (req, res) => {
  try {
    const { marca, tipo, modelo, placa, color, usuario_id } = req.body;

    // Guarda la ruta de la imagen si se cargó
    const imagenPath = req.file ? `/uploads/${req.file.filename}` : null;

    // Crear el vehículo en la base de datos
    const nuevoVehiculo = await Vehiculo.create({
      marca,
      tipo,
      modelo,
      placa,
      color,
      imagen: imagenPath, // Guarda la ruta
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

module.exports = router;
