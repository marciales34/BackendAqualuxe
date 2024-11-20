// routes/servicios.js
const express = require('express');
const router = express.Router();
const Servicio = require('../models/Servicio');  // Importa el modelo




// Ruta para obtener todos los servicios
router.get('/obtener', async (req, res) => {
  try {
    // Obtener todos los servicios desde la base de datos
    const servicios = await Servicio.findAll();
    
    // Si no se encuentran servicios, enviar una respuesta vacía
    if (servicios.length === 0) {
      return res.status(404).json({ message: 'No se encontraron servicios' });
    }
    
    // Enviar los servicios como respuesta JSON
    res.json(servicios);
  } catch (error) {
    // Si ocurre un error, manejarlo y devolver una respuesta 500 (error del servidor)
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los servicios' });
  }
});

module.exports = router;
