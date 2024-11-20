const express = require("express");
const Reservacion = require("../models/Reservacion"); // Ruta correcta hacia el modelo Reservacion
const router = express.Router();

// Registrar una nueva reservación
router.post("/registrar", async (req, res) => {
  try {
    const { fecha, hora, servicio_id, vehiculo_id, usuario_id, autolavado_id } = req.body;

    // Validación de campos
    if (!fecha || !hora || !servicio_id || !vehiculo_id || !usuario_id || !autolavado_id) {
      return res.status(400).json({ message: error });
    }

    // Crear una nueva reservación
    const nuevaReservacion = await Reservacion.create({
      fecha,
      hora,
      servicio_id,
      vehiculo_id,
      usuario_id,
      autolavado_id,
    });

    res.status(201).json({
      message: "Reservación creada exitosamente.",
      data: nuevaReservacion,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear la reservación.", error });
  }
});

router.get("/obtener", async (req, res) => {
    try {
      const reservaciones = await Reservacion.findAll();
  
      res.status(200).json({
        message: "Reservaciones obtenidas exitosamente.",
        data: reservaciones,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener las reservaciones.", error });
    }
  });
  

router.get("/obtener/:id", async (req, res) => {
    try {
      const { id } = req.params; // Obtener el parámetro dinámico
  
      const reservacion = await Reservacion.findByPk(id);
  
      if (!reservacion) {
        return res.status(404).json({ message: "Reservación no encontrada." });
      }
  
      res.status(200).json({
        message: "Reservación encontrada.",
        data: reservacion,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener la reservación.", error });
    }
  });
  

module.exports = router;
