import connection from '../config/db.js';

// Obtener todas las postulaciones
export const getAllPostulaciones = (req, res) => {
  connection.query('SELECT * FROM postulaciones', (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener postulaciones' });
    res.json(results);
  });
};

// Obtener una postulación por ID
export const getPostulacionById = (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM postulaciones WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener postulación' });
    res.json(results[0]);
  });
};

// Crear una nueva postulación
export const createPostulacion = (req, res) => {
  const { id_empleo, id_trabajador, estado } = req.body;
  connection.query(
    'INSERT INTO postulaciones (id_empleo, id_trabajador, estado) VALUES (?, ?, ?)',
    [id_empleo, id_trabajador, estado || 'postulado'], // Se usa 'postulado' por defecto si no envían nada
    (err, results) => {
      if (err) return res.status(500).json({ error: 'Error al crear postulación', err });
      res.status(201).json({ id: results.insertId, id_empleo, id_trabajador, estado: estado || 'postulado' });
    }
  );
};

// Actualizar el estado de una postulación
export const updatePostulacion = (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;
  connection.query(
    'UPDATE postulaciones SET estado = ? WHERE id = ?',
    [estado, id],
    (err) => {
      if (err) return res.status(500).json({ error: 'Error al actualizar postulación' });
      res.json({ id, estado });
    }
  );
};

// Eliminar una postulación
export const deletePostulacion = (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM postulaciones WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: 'Error al eliminar postulación' });
    res.status(204).send();
  });
};
