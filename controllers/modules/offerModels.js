import db from '../../config/db.js';

const OfferModel = {
    createOffer: async (titulo, descripcion, empresaId, fechaPublicacion) => {
        const [result] = await db.query(
            'INSERT INTO ofertas (titulo, descripcion, empresa_id, fecha_publicacion) VALUES (?, ?, ?, ?)',
            [titulo, descripcion, empresaId, fechaPublicacion]
        );
        return result.insertId;
    },
    getAllOffers: async () => {
        const [rows] = await db.query('SELECT * FROM ofertas');
        return rows;
    },
    getOfferById: async (id) => {
        const [rows] = await db.query('SELECT * FROM ofertas WHERE id = ?', [id]);
        return rows[0];
    },
    updateOffer: async (id, titulo, descripcion, empresaId, fechaPublicacion) => {
        const [result] = await db.query(
            'UPDATE ofertas SET titulo = ?, descripcion = ?, empresa_id = ?, fecha_publicacion = ? WHERE id = ?',
            [titulo, descripcion, empresaId, fechaPublicacion, id]
        );
        return result.affectedRows;
    },
    deleteOffer: async (id) => {
        const [result] = await db.query('DELETE FROM ofertas WHERE id = ?', [id]);
        return result.affectedRows;
    }
};

export default OfferModel;
