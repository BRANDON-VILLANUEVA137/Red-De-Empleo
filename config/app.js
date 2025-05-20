//app.js

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import loginRoutes from './../controllers/routes/loginRoutes.js'; // Ruta de login/registro

// Parte del HEAD
import connection from './db.js'; // Conexión a la base de datos (db.js)
import logger from 'morgan';
import { Server } from 'socket.io'; // Socket.io para la comunicación en tiempo real
import { createServer } from 'node:http'; // Crear servidor HTTP

// Parte del origin/main
import adminRoutes from './../controllers/routes/adminRoutes.js'; // Rutas del panel admin
import companyRoutes from './../controllers/routes/companyRoutes.js'; // Rutas para empresa
import userRoutes from './../controllers/routes/userRoutes.js'; // Rutas para usuario normal
import session from 'express-session';
import bcrypt from 'bcryptjs';
dotenv.config();

const app = express();
const server = createServer(app)
const io = new Server(server, {
  connectionStateRecovery:true
});

const PORT = process.env.PORT || 3000;

// ✅ SERVIR ARCHIVOS ESTÁTICOS DESDE LA CARPETA PUBLIC
app.use(express.static(process.cwd() + '/public'));

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
app.use(session({
  secret: 'clave_secreta_super_segura',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,           // true si usas HTTPS (estás en Railway ✅)
    sameSite: 'none',       // NECESARIO para que funcione con Netlify (cross-site)
    maxAge: 1000 * 60 * 60 * 2
  }
}));




// Rutas API2
app.use('/api', loginRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/user', userRoutes);

//Cuando se conecta un cliente chat
io.on('connection',(socket) =>{
  console.log('Usuario conectado')
  //Cuando se desconecta un cliente
  socket.on('disconnect', () =>{
    console.log('Usuario desconectado')
  })

  //Cuando se envía un mensaje
  socket.on('chat mensaje', (msg)=>{
    io.emit('chat mensaje', msg)
  })

})

// Escuchar peticiones HTTP
app.use(logger('dev'));


//Ruta de Chat
app.get('/chat',(req, res ) => {
  res.sendFile(process.cwd() +'/views/inicio_sesion/Chat.html');    
});

//Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'Backend funcionando correctamente' });
});

// Inicio del servidor
server.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});
