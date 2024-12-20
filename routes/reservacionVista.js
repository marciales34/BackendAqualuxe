const express = require("express");
const { Reservacion, Servicio, Vehiculo, Usuario, Autolavado } = require("../models"); // Importa los modelos
const router = express.Router();

router.get("/reservaciones", async (req, res) => {
  try {
    // Obtener todas las reservaciones
    const reservaciones = await Reservacion.findAll();

    // Recorrer las reservaciones y realizar consultas manuales por ID
    const respuesta = await Promise.all(
      reservaciones.map(async (reserva) => {
        const servicio = await Servicio.findOne({ where: { id: reserva.servicio_id } });
        const vehiculo = await Vehiculo.findOne({ where: { id: reserva.vehiculo_id } });
        const usuario = await Usuario.findOne({ where: { id: reserva.usuario_id } });
        const autolavado = await Autolavado.findOne({ where: { id_autolavado: reserva.autolavado_id } });

        return {
          id: reserva.id,
          fecha: reserva.fecha,
          hora: reserva.hora,
          servicio: servicio ? servicio.nombre : null,
          vehiculo: vehiculo ? vehiculo.placa : null,
          usuario: usuario ? usuario.nombre : null,
          autolavado: autolavado ? autolavado.nombre_autolavado : null,
        };
      })
    );

    res.status(200).json(respuesta);
  } catch (error) {
    console.error("Error al obtener reservaciones:", error);
    res.status(500).json({ error: "Error al obtener las reservaciones." });
  }
});


router.get("/reservaciones-usu/:usuarioId", async (req, res) => {
  const { usuarioId } = req.params; // Obtener el ID del usuario de los parámetros de la URL

  try {
    // Obtener todas las reservaciones para el usuario específico
    const reservaciones = await Reservacion.findAll({
      where: { usuario_id: usuarioId },
    });

    if (reservaciones.length === 0) {
      return res.status(404).json({ error: "No se encontraron reservaciones para este usuario." });
    }

    // Consultar las tablas relacionadas para cada reservación
    const respuesta = await Promise.all(
      reservaciones.map(async (reserva) => {
        const servicio = await Servicio.findOne({ where: { id: reserva.servicio_id } });
        const vehiculo = await Vehiculo.findOne({ where: { id: reserva.vehiculo_id } });
        const usuario = await Usuario.findOne({ where: { id: reserva.usuario_id } });
        const autolavado = await Autolavado.findOne({ where: { id_autolavado: reserva.autolavado_id } });

        return {
          id: reserva.id,
          fecha: reserva.fecha,
          hora: reserva.hora,
          servicio: servicio ? servicio.nombre : null, // Reemplaza "nombre" por la columna correcta
          vehiculo: vehiculo ? vehiculo.placa : null, // Reemplaza "nombre" por la columna correcta
          autolavado: autolavado ? autolavado.nombre_autolavado : null, // Reemplaza "nombre" por la columna correcta
        };
      })
    );

    res.status(200).json(respuesta);
  } catch (error) {
    console.error("Error al obtener las reservaciones:", error);
    res.status(500).json({ error: "Error al obtener las reservaciones." });
  }
});



module.exports = router;
