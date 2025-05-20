// app.js

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import bcrypt from 'bcryptjs';
import connection from './config/db.js'; // Asegúrate que la ruta esté bien

// Rutas Felipe
import loginRoutes from './../controller/routes/loginRoutes.js';
import profileRoutes from './../controller/routes/profileRoutes.js';
import postulacionRoutes from './../controller/routes/postulacionRoutes.js';
import jobRoutes from './../controller/routes/jobRoutes.js';
import categoriasRoutes from './../controller/routes/categoriasRoutes.js';
import applicationRoutes from './../controller/routes/applicationRoutes.js';
import authRoutes from './../controller/routes/authRoutes.js';

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

// Ruta de prueba
app.get('/api/status', (req, res) => {
  res.json({ status: 'active', version: '1.0.0' });
});

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
  connection.connect(err => {
    if (err) {
      console.error('❌ Error conectando a MySQL:', err);
    } else {
      console.log('✅ Conectado a MySQL como ID:', connection.threadId);
    }
  });
});
