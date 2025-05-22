import OfferModel from './modules/offerModels.js';

const offerController = {
getAllOffers: async (req, res) => {
        try {
            const offers = await OfferModel.getAllOffers();
            res.json(offers);
        } catch (error) {
            console.error('Error in getAllOffers:', error);
            res.status(500).json({ message: 'Error al obtener ofertas' });
        }
    },
    getOfferById: async (req, res) => {
        try {
            const offer = await OfferModel.getOfferById(req.params.id);
            if (!offer) return res.status(404).json({ message: 'Oferta no encontrada' });
            res.json(offer);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener oferta' });
        }
    },
    createOffer: async (req, res) => {
        try {
            const { titulo, descripcion, empresaId, fechaPublicacion } = req.body;
            const id = await OfferModel.createOffer(titulo, descripcion, empresaId, fechaPublicacion);
            res.status(201).json({ message: 'Oferta creada', id });
        } catch (error) {
            res.status(500).json({ message: 'Error al crear oferta' });
        }
    },
    updateOffer: async (req, res) => {
        try {
            const { titulo, descripcion, empresaId, fechaPublicacion } = req.body;
            const affectedRows = await OfferModel.updateOffer(req.params.id, titulo, descripcion, empresaId, fechaPublicacion);
            if (affectedRows === 0) return res.status(404).json({ message: 'Oferta no encontrada' });
            res.json({ message: 'Oferta actualizada' });
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar oferta' });
        }
    },
    deleteOffer: async (req, res) => {
        try {
            const affectedRows = await OfferModel.deleteOffer(req.params.id);
            if (affectedRows === 0) return res.status(404).json({ message: 'Oferta no encontrada' });
            res.json({ message: 'Oferta eliminada' });
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar oferta' });
        }
    }
};

export default offerController;
