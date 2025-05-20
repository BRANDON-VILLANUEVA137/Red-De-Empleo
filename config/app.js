import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connection from './config/db.js'; // Ajusta la ruta según tu estructura
import loginRoutes from './../controller/routes/loginRoutes.js';
import profileRoutes from './../controller/routes/profileRoutes.js';
import postulacionRoutes from './../controller/routes/postulacionRoutes.js';23
import jobRoutes from './../controller/routes/jobRoutes.js';  // Asegúrate de que la ruta sea correcta
import categoriasRoutes from './../controller/routes/categoriasRoutes.js'; // <-- ya existe ✅
import applicationRoutes from './../controller/routes/applicationRoutes.js';
import authRoutes from './../controller/routes/authRoutes.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración simplificada de CORS para desarrollo
// Reemplaza la configuración CORS actual con esto:
const corsOptions = {
  origin: ['http://localhost:3000', 'http://127.0.0.1:15580', 'http://localhost:5500', 'http://127.0.0.1:5500'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('Public')); // Asegúrate que coincida con tu carpeta

// Rutas API unificadas
app.use('/api/auth', loginRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/jobs', jobRoutes);  // Ahora sí coincide el nombre
app.use('/api/categories', categoriasRoutes); // Para categorías (debes tener esta ruta)
app.use('/api/applications', postulacionRoutes);

// Ruta de prueba
app.get('/api/status', (req, res) => {
  res.json({ status: 'active', version: '1.0.0' });
});

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
  connection.connect(err => {
    if (err) {
      console.error('Error conectando a MySQL:', err);
    } else {
      console.log('✅ Conectado a MySQL como ID:', connection.threadId);
    }
  });
});