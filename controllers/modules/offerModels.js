import db from '../../config/db.js';

const EmpleoModel = {
    createEmpleo: async (titulo, descripcion, ubicacion, requisitos, idEmpleador, categoriaId) => {
        const [result] = await db.query(
            `INSERT INTO empleos 
                (titulo, descripcion, ubicacion, requisitos, id_empleador, categoria_id) 
             VALUES (?, ?, ?, ?, ?, ?)`,
            [titulo, descripcion, ubicacion, requisitos, idEmpleador, categoriaId]
        );
        return result.insertId;
    },

    getAllEmpleos: async () => {
        const [rows] = await db.query('SELECT * FROM empleos');
        return rows;
    },

    getEmpleoById: async (id) => {
        const [rows] = await db.query('SELECT * FROM empleos WHERE id = ?', [id]);
        return rows[0];
    },

    updateEmpleo: async (id, titulo, descripcion, ubicacion, requisitos, idEmpleador, categoriaId) => {
        const [result] = await db.query(
            `UPDATE empleos SET 
                titulo = ?, 
                descripcion = ?, 
                ubicacion = ?, 
                requisitos = ?, 
                id_empleador = ?, 
                categoria_id = ?
             WHERE id = ?`,
            [titulo, descripcion, ubicacion, requisitos, idEmpleador, categoriaId, id]
        );
        return result.affectedRows;
    },

    deleteEmpleo: async (id) => {
        const [result] = await db.query('DELETE FROM empleos WHERE id = ?', [id]);
        return result.affectedRows;
    }
};

export default EmpleoModel;
