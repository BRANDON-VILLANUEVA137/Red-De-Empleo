import db from '../../config/db.js';
import bcrypt from 'bcrypt';

const UserModel = {
  findByEmail: (email, callback) => {
    db.query('SELECT * FROM usuarios WHERE email = ?', [email], callback);
  },
  createUser: (nombre, email, password, esEmpresa, callback) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) return callback(err);
      db.query(
        'INSERT INTO usuarios (nombre, email, password, es_empresa) VALUES (?, ?, ?, ?)',
        [nombre, email, hash, esEmpresa],
        callback
      );
    });
  },
  validatePassword: (password, hash, callback) => {
    bcrypt.compare(password, hash, callback);
  }
};

export default UserModel;
