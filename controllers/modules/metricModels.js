import db from '../../config/db.js';

const MetricModel = {
    createMetric: async (nombre, valor, fechaMedicion) => {
        const [result] = await db.query(
            'INSERT INTO metricas (nombre, valor, fecha_medicion) VALUES (?, ?, ?)',
            [nombre, valor, fechaMedicion]
        );
        return result.insertId;
    },
    getAllMetrics: async () => {
        const [rows] = await db.query('SELECT * FROM metricas');
        return rows;
    },
    getMetricById: async (id) => {
        const [rows] = await db.query('SELECT * FROM metricas WHERE id = ?', [id]);
        return rows[0];
    },
    updateMetric: async (id, nombre, valor, fechaMedicion) => {
        const [result] = await db.query(
            'UPDATE metricas SET nombre = ?, valor = ?, fecha_medicion = ? WHERE id = ?',
            [nombre, valor, fechaMedicion, id]
        );
        return result.affectedRows;
    },
    deleteMetric: async (id) => {
        const [result] = await db.query('DELETE FROM metricas WHERE id = ?', [id]);
        return result.affectedRows;
    }
};

export default MetricModel;
