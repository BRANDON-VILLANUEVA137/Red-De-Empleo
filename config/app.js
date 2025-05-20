//app.js

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import loginRoutes from './../controllers/routes/loginRoutes.js'; // Ruta de login/registro
import adminRoutes from './../controllers/routes/adminRoutes.js'; // Rutas del panel admin
import companyRoutes from './../controllers/routes/companyRoutes.js'; // Rutas para empresa
import userRoutes from './../controllers/routes/userRoutes.js'; // Rutas para usuario normal
import session from 'express-session';
import bcrypt from 'bcryptjs';
import { protegerRutaAPI, soloAdmin } from '../middlewares/authMiddleware.js';
import { protegerVista } from '../middlewares/authMiddleware.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de CORS (permitir acceso desde Netlify o cualquier frontend que lo necesite)
const allowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:5500',// Localhost para desarrollo
  'https://red-de-empleo-production.up.railway.app', 
  'https://red-de-empleo.netlify.app' // Dominio de tu frontend en Netlify
];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  credentials: true // ← ¡ESTO ES LO MÁS IMPORTANTE!
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('Public'));

//Manejo de sesiones
const isProduction = process.env.NODE_ENV === 'production';
const productionDomain = 'red-de-empleo-production.up.railway.app';

app.use(session({
  secret: 'clave_secreta_super_segura',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: isProduction,           // true si usas HTTPS en producción
    sameSite: 'none',       // NECESARIO para que funcione con Netlify (cross-site)
    domain: isProduction ? productionDomain : undefined,
    maxAge: 1000 * 60 * 60 * 2
  }
}));


app.get('/views/admin/index.html', protegerVista, (req, res) => {
  res.sendFile('index.html', { root: 'Public/views/admin' }); // Ajusta si está en otra carpeta
});


// Rutas API
app.use('/api', loginRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/user', userRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'Backend funcionando correctamente' });
});

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});
