// routes/usuarios.js
const express = require("express");
const router = express.Router();
const Autolavado = require("../models/Autolavado");

//Registrar Datos de Clientes, trabajadores y administradores en la base de datos.
router.post("/crear-autolavado", async (req, res) => {
    const { nombre_autolavado, horario, direccion, } = req.body; // Asegúrate de capturar todos los campos
    try {
      const autolavado = await Autolavado.create({ 
        nombre_autolavado, 
        horario, 
        direccion
      });
      res.status(201).json({ message: "Autolavado registrado exitosamente", autolavado });
    } catch (err) {
      console.error("Error al registrar usuario:", err);
      res.status(500).json({ error: "Error al registrar autolavado" });
    }
  });
  
router.get("/autolavados", async (req, res) => {
  try {
    const autolavado = await Autolavado.findAll();
    res.json(autolavado);
  } catch (err) {
    console.error("Error al obtener autolavados:", err);
    res.status(500).json({ error: "Error al obtener autolavados" });
  }

});
  // Editar un autolavado por su ID
router.put("/editar-autolavado/:id", async (req, res) => {
    const { id } = req.params; // Obtener el ID del autolavado desde los parámetros
    const { nombre_autolavado, horario, direccion } = req.body; // Datos a actualizar

    try {
        // Buscar el autolavado por ID
        const autolavado = await Autolavado.findByPk(id);

        // Verificar si el autolavado existe
        if (!autolavado) {
            return res.status(404).json({ error: "Autolavado no encontrado" });
        }

        // Actualizar los campos proporcionados
        autolavado.nombre_autolavado = nombre_autolavado || autolavado.nombre_autolavado;
        autolavado.horario = horario || autolavado.horario;
        autolavado.direccion = direccion || autolavado.direccion;

        // Guardar los cambios en la base de datos
        await autolavado.save();

        res.json({ message: "Autolavado actualizado exitosamente", autolavado });
    } catch (err) {
        console.error("Error al actualizar autolavado:", err);
        res.status(500).json({ error: "Error al actualizar autolavado" });
    }
});

// Obtener un autolavado por su ID
router.get("/autolavado/:id", async (req, res) => {
    const { id } = req.params; // Obtener el ID del autolavado desde los parámetros

    try {
        // Buscar el autolavado por su ID
        const autolavado = await Autolavado.findByPk(id);

        // Verificar si el autolavado existe
        if (!autolavado) {
            return res.status(404).json({ error: "Autolavado no encontrado" });
        }

        // Responder con los datos del autolavado
        res.json(autolavado);
    } catch (err) {
        console.error("Error al obtener el autolavado:", err);
        res.status(500).json({ error: "Error al obtener el autolavado" });
    }
});

module.exports = router;