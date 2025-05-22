// app.js

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import bcrypt from 'bcryptjs';
import pool from './db.js'; // o desde donde lo tengas

// No necesitas llamar a .connect() aquí.
// Ya se verifica la conexión automáticamente en db.js

// Rutas Felipe
import loginRoutes from './../controllers/routes/loginRoutes.js';
import profileRoutes from './../controllers/routes/profileRoutes.js';
import postulacionRoutes from './../controllers/routes/postulacionRoutes.js';
import jobRoutes from './../controllers/routes/jobRoutes.js';
import categoriasRoutes from './../controllers/routes/categoriasRoutes.js';

// Rutas Brandon (panel admin y roles)
import adminRoutes from './../controllers/routes/adminRoutes.js';
import companyRoutes from './../controllers/routes/companyRoutes.js';
import userRoutes from './../controllers/routes/userRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS combinado (desarrollo + producción)
const allowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:5500',
  'http://localhost:5500',
  'http://127.0.0.1:15580',
  'https://red-de-empleo-production.up.railway.app',
  'https://red-de-empleo.netlify.app'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('Public'));

// Sesiones
app.use(session({
  secret: 'clave_secreta_super_segura',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 2
  }
}));

// Rutas principales
app.use('/api/auth', loginRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/categories', categoriasRoutes);
app.use('/api/applications', postulacionRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/user', userRoutes);
// Rutas API
app.use('/api', loginRoutes);
app.use('/api/admin', (req, res, next) => {
  if (req.path === '/offers') {
    console.log(`Request to /api/admin/offers - Method: ${req.method} - Time: ${new Date().toISOString()}`);
  }
  next();
}, adminRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/user', userRoutes);
// Ruta de prueba
app.get('/api/status', (req, res) => {
  res.json({ status: 'active', version: '1.0.0' });
});

// Middleware global para manejo de errores
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(500).json({ message: 'Error interno del servidor' });
});

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});
