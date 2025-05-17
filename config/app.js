import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import loginRoutes from './../controllers/routes/loginRoutes.js'; // Ruta de login/registro
import adminRoutes from './../controllers/routes/adminRoutes.js'; // Rutas del panel admin
import connection from './db.js'; // Conexión a la base de datos (db.js)

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de CORS (permitir acceso desde Netlify o cualquier frontend que lo necesite)
const allowedOrigins = [
  'http://localhost:3000', // Localhost para desarrollo
  'https://tu-dominio-de-netlify.netlify.app' // Dominio de tu frontend en Netlify
];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('Public'));

// Middleware básico de autenticación para admin (placeholder)
const adminAuthMiddleware = (req, res, next) => {
  // Aquí se debe implementar la lógica real de autenticación y autorización
  // Por ejemplo, verificar token JWT o sesión y rol de usuario
  // Por ahora, dejamos pasar todas las peticiones
  next();
};

// Rutas API
app.use('/api', loginRoutes);
app.use('/api/admin', adminAuthMiddleware, adminRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'Backend funcionando correctamente' });
});

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});
