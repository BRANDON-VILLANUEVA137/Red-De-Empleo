import pool from '../../config/db.js';

// Get all administradores with user info
export const getAllAdministradores = async () => {
  const query = `
    SELECT a.id, a.id_usuario, a.permisos, u.nombre, u.correo
    FROM administradores a
    JOIN usuarios u ON a.id_usuario = u.id
  `;
  const [rows] = await pool.query(query);
  return rows;
};

// Add a new administrador
export const addAdministrador = async (id_usuario, permisos) => {
  const query = `
    INSERT INTO administradores (id_usuario, permisos)
    VALUES (?, ?)
  `;
  const [result] = await pool.query(query, [id_usuario, permisos]);
  return result.insertId;
};
