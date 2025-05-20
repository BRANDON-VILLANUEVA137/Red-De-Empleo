import db from '../../config/db.js';

const ReportModel = {
    createReport: async (titulo, descripcion, fechaReporte) => {
        const [result] = await db.query(
            'INSERT INTO reportes (titulo, descripcion, fecha_reporte) VALUES (?, ?, ?)',
            [titulo, descripcion, fechaReporte]
        );
        return result.insertId;
    },
    getAllReports: async () => {
        const [rows] = await db.query('SELECT * FROM reportes');
        return rows;
    },
    getReportById: async (id) => {
        const [rows] = await db.query('SELECT * FROM reportes WHERE id = ?', [id]);
        return rows[0];
    },
    updateReport: async (id, titulo, descripcion, fechaReporte) => {
        const [result] = await db.query(
            'UPDATE reportes SET titulo = ?, descripcion = ?, fecha_reporte = ? WHERE id = ?',
            [titulo, descripcion, fechaReporte, id]
        );
        return result.affectedRows;
    },
    deleteReport: async (id) => {
        const [result] = await db.query('DELETE FROM reportes WHERE id = ?', [id]);
        return result.affectedRows;
    }
};

export default ReportModel;
