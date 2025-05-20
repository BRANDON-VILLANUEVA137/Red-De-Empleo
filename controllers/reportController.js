import ReportModel from './modules/reportModels.js';

const reportController = {
    getAllReports: async (req, res) => {
        try {
            const reports = await ReportModel.getAllReports();
            res.json(reports);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener reportes' });
        }
    },
    getReportById: async (req, res) => {
        try {
            const report = await ReportModel.getReportById(req.params.id);
            if (!report) return res.status(404).json({ message: 'Reporte no encontrado' });
            res.json(report);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener reporte' });
        }
    },
    createReport: async (req, res) => {
        try {
            const { titulo, descripcion, fechaReporte } = req.body;
            const id = await ReportModel.createReport(titulo, descripcion, fechaReporte);
            res.status(201).json({ message: 'Reporte creado', id });
        } catch (error) {
            res.status(500).json({ message: 'Error al crear reporte' });
        }
    },
    updateReport: async (req, res) => {
        try {
            const { titulo, descripcion, fechaReporte } = req.body;
            const affectedRows = await ReportModel.updateReport(req.params.id, titulo, descripcion, fechaReporte);
            if (affectedRows === 0) return res.status(404).json({ message: 'Reporte no encontrado' });
            res.json({ message: 'Reporte actualizado' });
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar reporte' });
        }
    },
    deleteReport: async (req, res) => {
        try {
            const affectedRows = await ReportModel.deleteReport(req.params.id);
            if (affectedRows === 0) return res.status(404).json({ message: 'Reporte no encontrado' });
            res.json({ message: 'Reporte eliminado' });
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar reporte' });
        }
    }
};

export default reportController;
