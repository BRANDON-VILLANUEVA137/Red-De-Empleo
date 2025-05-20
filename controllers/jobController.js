import db from '../config/db.js';

// Helper para verificar categoría
const checkCategoryExists = async (categoria_id) => {
  if (!categoria_id) return true;
  const [results] = await db.promise().query('SELECT id FROM categorias WHERE id = ?', [categoria_id]);
  return results.length > 0;
};

// Obtener todos los empleos (con filtros opcionales)
export const getAllJobs = async (req, res) => {
  try {
    let query = 'SELECT * FROM empleos';
    const params = [];
    
    // Filtros desde query params (ej: /api/jobs?categoria_id=1&ubicacion=Remoto)
    if (req.query.categoria_id) {
      query += ' WHERE categoria_id = ?';
      params.push(req.query.categoria_id);
    }
    
    if (req.query.ubicacion) {
      query += params.length ? ' AND' : ' WHERE';
      query += ' ubicacion LIKE ?';
      params.push(`%${req.query.ubicacion}%`);
    }
    
    const [jobs] = await db.promise().query(query, params);
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener empleos', details: err.message });
  }
};

// Obtener empleo por ID
export const getJobById = async (req, res) => {
  try {
    const [results] = await db.promise().query('SELECT * FROM empleos WHERE id = ?', [req.params.id]);
    if (!results.length) return res.status(404).json({ error: 'Empleo no encontrado' });
    res.json(results[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener empleo', details: err.message });
  }
};

// Crear nuevo empleo (usado por tu formulario)
export const createJob = async (req, res) => {
  const { id_empleador, titulo, descripcion, ubicacion, requisitos, categoria_id } = req.body;

  // Validaciones
  if (!id_empleador || !titulo) {
    return res.status(400).json({ error: 'id_empleador y título son obligatorios' });
  }

  if (categoria_id && !(await checkCategoryExists(categoria_id))) {
    return res.status(400).json({ error: 'La categoría no existe' });
  }

  try {
    const [result] = await db.promise().query(
      'INSERT INTO empleos SET ?',
      { id_empleador, titulo, descripcion, ubicacion, requisitos, categoria_id }
    );
    
    res.status(201).json({ 
      id: result.insertId,
      message: 'Empleo creado correctamente',
      data: { titulo, ubicacion, categoria_id }
    });
  } catch (err) {
    res.status(500).json({ 
      error: 'Error al crear empleo',
      details: err.message,
      sqlError: err.code // MySQL error code
    });
  }
};

// Actualizar empleo
export const updateJob = async (req, res) => {
  try {
    const { affectedRows } = await db.promise().query(
      'UPDATE empleos SET ? WHERE id = ?',
      [req.body, req.params.id]
    );
    
    if (affectedRows === 0) {
      return res.status(404).json({ error: 'Empleo no encontrado' });
    }
    
    res.json({ message: 'Empleo actualizado correctamente' });
  } catch (err) {
    res.status(500).json({ 
      error: 'Error al actualizar empleo',
      details: err.message 
    });
  }
};

// Eliminar empleo
export const deleteJob = async (req, res) => {
  try {
    const { affectedRows } = await db.promise().query(
      'DELETE FROM empleos WHERE id = ?',
      [req.params.id]
    );
    
    if (affectedRows === 0) {
      return res.status(404).json({ error: 'Empleo no encontrado' });
    }
    
    res.json({ message: 'Empleo eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ 
      error: 'Error al eliminar empleo',
      details: err.message 
    });
  }
};

// Nuevos métodos para filtros (RF3)
export const getJobsByCategory = async (req, res) => {
  try {
    const [jobs] = await db.promise().query(
      'SELECT * FROM empleos WHERE categoria_id = ?',
      [req.params.categoria_id]
    );
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: 'Error al filtrar por categoría', details: err.message });
  }
};

export const getJobsByLocation = async (req, res) => {
  try {
    const [jobs] = await db.promise().query(
      'SELECT * FROM empleos WHERE ubicacion LIKE ?',
      [`%${req.params.ubicacion}%`]
    );
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: 'Error al filtrar por ubicación', details: err.message });
  }
};