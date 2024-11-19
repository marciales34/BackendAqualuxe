// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./database");

const usuariosRoutes = require("./routes/usuarios"); // Asegúrate de que la ruta sea correcta
const autolavadosRoutes = require("./routes/autolavados");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Conectar a la base de datos
sequelize.sync()
  .then(() => {
    console.log("Conexión exitosa a la base de datos MySQL");
  })
  .catch(err => {
    console.error("Error al conectar con la base de datos:", err);
  });

// Usar las rutas

app.use("/usuarios", usuariosRoutes);
app.use("/autolavados", autolavadosRoutes); // Asegúrate de que usuariosRoutes sea un router válido

app.listen(PORT, '0.0.0.0',() => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
