// config/db.js
import mysql from 'mysql2/promise'; // Versión promise recomendada

const createConnection = async () => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'RED_DE_EMPLEO',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  console.log('✅ Conexión a MySQL establecida correctamente');
  return connection;
};

export default createConnection;