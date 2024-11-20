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
  
  // Obtener usuario por su ID
router.get("/usuario/:id", async (req, res) => {
  const { id } = req.params;  // Captura el id desde los parámetros de la URL

  try {
    // Buscar el usuario en la base de datos por su id
    const usuario = await Usuario.findOne({ where: { id } });

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Si el usuario existe, devolver sus datos
    res.json(usuario);
  } catch (err) {
    console.error("Error al obtener el usuario:", err);
    res.status(500).json({ error: "Error al obtener el usuario" });
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

      // Si el inicio de sesión es exitoso, devolver el id y rol del usuario junto con el mensaje de éxito
      res.status(200).json({ 
          message: "Inicio de sesión exitoso", 
          usuario: { 
              id: usuario.id,   // Aquí añadimos el campo id
              rol: usuario.rol  // El rol del usuario
          } 
      });
  } catch (err) {
      console.error("Error al iniciar sesión:", err);
      res.status(500).json({ error: "Error al iniciar sesión" });
  }
});

router.put("/editar-usuario/:id", async (req, res) => {
  const { id } = req.params;
  const { nombre, correo, password, telefono, direccion, ciudad } = req.body;

  try {
      const usuario = await Usuario.findByPk(id);

      if (!usuario) {
          return res.status(404).json({ error: "Usuario no encontrado" });
      }

      // Actualizar los campos proporcionados
      usuario.nombre = nombre || usuario.nombre;
      usuario.correo = correo || usuario.correo;
      usuario.password = password || usuario.password;
      usuario.telefono = telefono || usuario.telefono;
      usuario.ciudad = ciudad || usuario.ciudad;
      usuario.direccion = direccion || usuario.direccion;

      // Guardar los cambios en la base de datos
      await usuario.save();

      res.json({ message: "Usuario actualizado exitosamente", usuario });
  } catch (err) {
      console.error("Error al actualizar Usuario:", err);
      res.status(500).json({ error: "Error al actualizar Usuario" });
  }
});

router.get("/usuario/:id", async (req, res) => {
  const { id } = req.params; // Obtener el ID del Usuario desde los parámetros

  try {
      // Buscar el Usuario por su ID
      const usuario = await Usuario.findByPk(id);

      // Verificar si el Usuario existe
      if (!usuario) {
          return res.status(404).json({ error: "Usuario no encontrado" });
      }

      // Responder con los datos del Usuario
      res.json(usuario);
  } catch (err) {
      console.error("Error al obtener el Usuario:", err);
      res.status(500).json({ error: "Error al obtener el Usuario" });
  }
}); 
  

// Exportar el router
module.exports = router;
