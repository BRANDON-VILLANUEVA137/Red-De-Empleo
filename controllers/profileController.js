import db from '../config/db.js';

// Helper para validar datos del perfil
const validateProfileData = (data) => {
  if (!data.nombre || !data.habilidades) {
    throw new Error('Nombre y habilidades son campos obligatorios');
  }
};

export const getAllProfiles = async (req, res) => {
  try {
    const [rows] = await db.promise().query('SELECT * FROM profiles');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ 
      error: 'Error al obtener perfiles',
      details: err.message 
    });
  }
};

export const getProfileById = async (req, res) => {
  try {
    const [rows] = await db.promise().query(
      'SELECT * FROM profiles WHERE id = ?', 
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Perfil no encontrado' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ 
      error: 'Error al obtener perfil',
      details: err.message 
    });
  }
};

export const createProfile = async (req, res) => {
  try {
    validateProfileData(req.body);
    const [result] = await db.promise().query(
      'INSERT INTO profiles SET ?',
      [req.body]
    );
    res.status(201).json({ 
      id: result.insertId, 
      ...req.body 
    });
  } catch (err) {
    res.status(400).json({ 
      error: 'Error al crear perfil',
      details: err.message 
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    validateProfileData(req.body);
    const { affectedRows } = await db.promise().query(
      'UPDATE profiles SET ? WHERE id = ?',
      [req.body, req.params.id]
    );
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Perfil no encontrado' });
    }
    res.json({ message: 'Perfil actualizado exitosamente' });
  } catch (err) {
    res.status(400).json({ 
      error: 'Error al actualizar perfil',
      details: err.message 
    });
  }
};

export const deleteProfile = async (req, res) => {
  try {
    const { affectedRows } = await db.promise().query(
      'DELETE FROM profiles WHERE id = ?',
      [req.params.id]
    );
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Perfil no encontrado' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ 
      error: 'Error al eliminar perfil',
      details: err.message 
    });
  }
};