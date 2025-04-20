import express from 'express';
import cors from 'cors';
import 'dotenv/config';
//import indexRoutes from './controllers/routes/indexRoutes.js'; // Nota el .js

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

// Rutas
//app.use('/api', indexRoutes);

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});