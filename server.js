// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./database");

const usuariosRoutes = require("./routes/usuarios"); // Asegúrate de que la ruta sea correcta
<<<<<<< HEAD
const reservacionesRoutes = require("./routes/reservaciones");
const vehiculosRoutes = require("./routes/vehiculos");
const path = require('path');


=======
const autolavadosRoutes = require("./routes/autolavados");
>>>>>>> 76cb0e6c43d6f78063f271edc62a5d911eb4161a

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

<<<<<<< HEAD
// Servir archivos estáticos desde la carpeta uploads
// Suponiendo que las imágenes se guardan en el directorio 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/usuarios", usuariosRoutes); // Asegúrate de que usuariosRoutes sea un router válido
app.use("/reservaciones", reservacionesRoutes);
app.use("/vehiculos", vehiculosRoutes); // Ruta para reservaciones
=======
// Usar las rutas
>>>>>>> 76cb0e6c43d6f78063f271edc62a5d911eb4161a

app.use("/usuarios", usuariosRoutes);
app.use("/autolavados", autolavadosRoutes); // Asegúrate de que usuariosRoutes sea un router válido

app.listen(PORT, '0.0.0.0',() => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
