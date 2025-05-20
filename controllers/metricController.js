import MetricModel from './modules/metricModels.js';

const metricController = {
    getAllMetrics: async (req, res) => {
        try {
            const metrics = await MetricModel.getAllMetrics();
            res.json(metrics);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener métricas' });
        }
    },
    getMetricById: async (req, res) => {
        try {
            const metric = await MetricModel.getMetricById(req.params.id);
            if (!metric) return res.status(404).json({ message: 'Métrica no encontrada' });
            res.json(metric);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener métrica' });
        }
    },
    createMetric: async (req, res) => {
        try {
            const { nombre, valor, fechaMedicion } = req.body;
            const id = await MetricModel.createMetric(nombre, valor, fechaMedicion);
            res.status(201).json({ message: 'Métrica creada', id });
        } catch (error) {
            res.status(500).json({ message: 'Error al crear métrica' });
        }
    },
    updateMetric: async (req, res) => {
        try {
            const { nombre, valor, fechaMedicion } = req.body;
            const affectedRows = await MetricModel.updateMetric(req.params.id, nombre, valor, fechaMedicion);
            if (affectedRows === 0) return res.status(404).json({ message: 'Métrica no encontrada' });
            res.json({ message: 'Métrica actualizada' });
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar métrica' });
        }
    },
    deleteMetric: async (req, res) => {
        try {
            const affectedRows = await MetricModel.deleteMetric(req.params.id);
            if (affectedRows === 0) return res.status(404).json({ message: 'Métrica no encontrada' });
            res.json({ message: 'Métrica eliminada' });
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar métrica' });
        }
    }
};

export default metricController;
