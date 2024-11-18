// routes/usuarios.js
const express = require("express");
const router = express.Router();
const Usuario = require("../models/Usuario");


//Registrar Datos de Clientes, trabajadores y administradores en la base de datos.
router.post("/registrar", async (req, res) => {
    const { nombre, correo, password, telefono, ciudad, direccion, rol } = req.body; // Asegúrate de capturar todos los campos
    try {
      const usuario = await Usuario.create({ 
        nombre, 
        correo, 
        password, 
        telefono, 
        ciudad, 
        direccion, 
        rol 
      });
      res.status(201).json({ message: "Usuario registrado exitosamente", usuario });
    } catch (err) {
      console.error("Error al registrar usuario:", err);
      res.status(500).json({ error: "Error al registrar usuario" });
    }
  });
  
  

// Obtener todos los usuarios de la base de datos... 

router.get("/todos-los-usuarios", async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (err) {
    console.error("Error al obtener usuarios:", err);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});

// Obtener los datos para realizar el Login en la aplicación..
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Verificar que los campos no estén vacíos
  if (!email || !password) {
      return res.status(400).json({ error: "Correo y contraseña son requeridos." });
  }

  try {
      // Buscar el usuario por su correo
      const usuario = await Usuario.findOne({ where: { correo: email } });

      if (!usuario) {
          return res.status(404).json({ error: "Usuario no encontrado" });
      }

      // Verificar la contraseña (asegúrate de tener contraseñas seguras en tu base de datos)
      if (usuario.password !== password) {
          return res.status(401).json({ error: "Contraseña incorrecta" });
      }

      // Si el inicio de sesión es exitoso, devolver el rol del usuario junto con el mensaje de éxito
      res.status(200).json({ 
          message: "Inicio de sesión exitoso", 
          usuario: { 
              rol: usuario.rol 
          } 
      });
  } catch (err) {
      console.error("Error al iniciar sesión:", err);
      res.status(500).json({ error: "Error al iniciar sesión" });
  }
});

  
  

// Exportar el router
module.exports = router;
