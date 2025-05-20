// config/db.js
import mysql from 'mysql2';
import 'dotenv/config';

const connection = mysql.createConnection({
  host: 'localhost',      // Servidor local
  user: 'root',           // Tu usuario
  password: 'pipe2004tr', // Tu contraseña
  database: 'red_empleo', // Nombre de la BD
  port: 3306              // Puerto default
});

connection.connect((err) => {
  if (err) {
    console.error('❌ Error al conectar a MySQL:', err.stack);
    return;
  }
  console.log('✅ Conectado a MySQL como ID:', connection.threadId);
});

export default connection;