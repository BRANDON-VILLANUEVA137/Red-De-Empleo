import EmpleoModel from './modules/offerModels.js';

const empleoController = {
    getAllEmpleos: async (req, res) => {
        try {
            const empleos = await EmpleoModel.getAllEmpleos();
            res.json(empleos);
        } catch (error) {
            console.error('Error en getAllEmpleos:', error);
            res.status(500).json({ message: 'Error al obtener empleos' });
        }
    },

    getEmpleoById: async (req, res) => {
        try {
            const empleo = await EmpleoModel.getEmpleoById(req.params.id);
            if (!empleo) return res.status(404).json({ message: 'Empleo no encontrado' });
            res.json(empleo);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener empleo' });
        }
    },

    createEmpleo: async (req, res) => {
        try {
            const { titulo, descripcion, ubicacion, requisitos, idEmpleador, categoriaId } = req.body;
            const id = await EmpleoModel.createEmpleo(titulo, descripcion, ubicacion, requisitos, idEmpleador, categoriaId);
            res.status(201).json({ message: 'Empleo creado', id });
        } catch (error) {
            console.error('Error en createEmpleo:', error);
            res.status(500).json({ message: 'Error al crear empleo' });
        }
    },

    updateEmpleo: async (req, res) => {
        try {
            const { titulo, descripcion, ubicacion, requisitos, idEmpleador, categoriaId } = req.body;
            const affectedRows = await EmpleoModel.updateEmpleo(
                req.params.id,
                titulo,
                descripcion,
                ubicacion,
                requisitos,
                idEmpleador,
                categoriaId
            );
            if (affectedRows === 0) return res.status(404).json({ message: 'Empleo no encontrado' });
            res.json({ message: 'Empleo actualizado' });
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar empleo' });
        }
    },

    deleteEmpleo: async (req, res) => {
        try {
            const affectedRows = await EmpleoModel.deleteEmpleo(req.params.id);
            if (affectedRows === 0) return res.status(404).json({ message: 'Empleo no encontrado' });
            res.json({ message: 'Empleo eliminado' });
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar empleo' });
        }
    }
};

export default empleoController;
