// authUserModel.js
import db from '../config/db.js';

const UserModel = {
  findByEmail: async (correo) => {
    const [rows] = await db.execute('SELECT * FROM usuarios WHERE correo = ?', [correo]);
    return rows[0];
  },

  createUser: async (nombre, correo, contrasena, id_rol) => {
    const [result] = await db.execute(
      'INSERT INTO usuarios (nombre, correo, contrasena, id_rol) VALUES (?, ?, ?, ?)',
      [nombre, correo, contrasena, id_rol]
    );
    return result.insertId;
  }
};

export default UserModel;
