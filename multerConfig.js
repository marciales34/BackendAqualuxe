// multerConfig.js
const multer = require('multer');
const path = require('path');

// Configuración del almacenamiento de las imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Define dónde guardar las imágenes subidas
    cb(null, './uploads'); // Carpeta de destino
  },
  filename: (req, file, cb) => {
    // Define el nombre del archivo subido
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Nombre único basado en la fecha
  },
});

// Configurar el filtro de archivos para aceptar solo imágenes
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true); // Aceptar archivo
  } else {
    cb(new Error('Solo se permiten imágenes (jpeg, jpg, png).'), false); // Rechazar archivo
  }
};

// Crear instancia de Multer con las configuraciones definidas
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Límite de tamaño (5MB)
});

module.exports = upload;
