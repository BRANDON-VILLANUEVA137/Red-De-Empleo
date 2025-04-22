import db from '../../config/db.js'; // Asegúrate que tu archivo se llame db.js, y tenga export default

const UserModel = {
    findByEmail: async (email) => {
        const [rows] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        return rows[0];
    },
    createUser: async (nombre, email, password, esEmpresa) => {
        const [result] = await db.query(
            'INSERT INTO usuarios (nombre, email, password, es_empresa) VALUES (?, ?, ?, ?)',
            [nombre, email, password, esEmpresa]
        );
        return result.insertId;
    }
};

export default UserModel;
