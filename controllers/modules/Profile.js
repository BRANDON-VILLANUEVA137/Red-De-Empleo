// models/Profile.js

import db from '../../config/db.js';


export const getAllProfiles = () => {
    return db.query('SELECT * FROM profiles');
  };
  
  export const getProfileById = (id) => {
    return db.query('SELECT * FROM profiles WHERE id = ?', [id]);
  };
  
  export const createProfile = (data) => {
    return db.query('INSERT INTO profiles SET ?', [data]);
  };
  
  export const updateProfile = (id, data) => {
    return db.query('UPDATE profiles SET ? WHERE id = ?', [data, id]);
  };
  
  export const deleteProfile = (id) => {
    return db.query('DELETE FROM profiles WHERE id = ?', [id]);
  };






const Profile = {
  getAll: (callback) => {
    db.query('SELECT * FROM profiles', callback);
  },

  getById: (id, callback) => {
    db.query('SELECT * FROM profiles WHERE id = ?', [id], callback);
  },

  create: (data, callback) => {
    const { nombre, correo, ubicacion, experiencia, habilidades } = data;
    db.query(
      'INSERT INTO profiles (nombre, correo, ubicacion, experiencia, habilidades) VALUES (?, ?, ?, ?, ?)',
      [nombre, correo, ubicacion, experiencia, habilidades],
      callback
    );
  },

  update: (id, data, callback) => {
    const { nombre, correo, ubicacion, experiencia, habilidades } = data;
    db.query(
      'UPDATE profiles SET nombre = ?, correo = ?, ubicacion = ?, experiencia = ?, habilidades = ? WHERE id = ?',
      [nombre, correo, ubicacion, experiencia, habilidades, id],
      callback
    );
  },

  delete: (id, callback) => {
    db.query('DELETE FROM profiles WHERE id = ?', [id], callback);
  }
};

export default Profile;
