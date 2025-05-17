import db from '../../config/db.js';

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
    },
    getAllUsers: async () => {
        const [rows] = await db.query('SELECT id, nombre, email, es_empresa FROM usuarios');
        return rows;
    },
    getUserById: async (id) => {
        const [rows] = await db.query('SELECT id, nombre, email, es_empresa FROM usuarios WHERE id = ?', [id]);
        return rows[0];
    },
    updateUser: async (id, nombre, email, esEmpresa) => {
        const [result] = await db.query(
            'UPDATE usuarios SET nombre = ?, email = ?, es_empresa = ? WHERE id = ?',
            [nombre, email, esEmpresa, id]
        );
        return result.affectedRows;
    },
    deleteUser: async (id) => {
        const [result] = await db.query('DELETE FROM usuarios WHERE id = ?', [id]);
        return result.affectedRows;
    }
};

export default UserModel;
