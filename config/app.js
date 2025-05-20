import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import loginRoutes from './../controllers/routes/loginRoutes.js'; // Ruta de login/registro
import connection from './db.js'; // Conexión a la base de datos (db.js)
import logger from 'morgan';
import { Server } from 'socket.io'; // Socket.io para la comunicación en tiempo real
import { createServer } from 'node:http'; // Crear servidor HTTP
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
app.use(express.static('public'));

// Rutas API2
app.use('/api', loginRoutes);

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
