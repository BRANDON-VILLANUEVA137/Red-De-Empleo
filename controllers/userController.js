import UserModel from './modules/userModels.js';

const userController = {
    getAllUsers: async (req, res) => {
        try {
            const search = req.query.search || '';
            const users = await UserModel.getAllUsers(search);
            // Map id_rol to tipoCuenta string
            const usersWithTipoCuenta = users.map(user => {
                let tipoCuenta = 'Usuario';
                if (user.id_rol === 1) tipoCuenta = 'Empresa';
                else if (user.id_rol === 3) tipoCuenta = 'Admin';
                return { ...user, tipoCuenta };
            });
            res.json(usersWithTipoCuenta);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener usuarios' });
        }
    },
    getUserById: async (req, res) => {
        try {
            const user = await UserModel.getUserById(req.params.id);
            if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
            res.json(user);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener usuario' });
        }
    },
    createUser: async (req, res) => {
        try {
            const { nombre, email, password, esEmpresa, id_rol } = req.body;

            // Solo administradores pueden crear otros administradores
            if (id_rol === 3) {
                if (!req.session.usuario || req.session.usuario.id_rol !== 3) {
                    return res.status(403).json({ message: 'No autorizado para crear administrador' });
                }
            }

            const id = await UserModel.createUser(nombre, email, password, esEmpresa);
            res.status(201).json({ message: 'Usuario creado', id });
        } catch (error) {
            res.status(500).json({ message: 'Error al crear usuario' });
        }
    },
    updateUser: async (req, res) => {
        try {
            const { nombre, correo, id_rol } = req.body;
            console.log('Datos recibidos:', { nombre, correo, id_rol });

            const affectedRows = await UserModel.updateUser(req.params.id, nombre, correo, id_rol);
            if (affectedRows === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
            res.json({ message: 'Usuario actualizado' });
        } catch (error) {
            console.error('Error en updateUser:', error);
            res.status(500).json({ message: 'Error al actualizar usuario', error: error.message });
        }
    },
    deleteUser: async (req, res) => {
        try {
            const affectedRows = await UserModel.deleteUser(req.params.id);
            if (affectedRows === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
            res.json({ message: 'Usuario eliminado' });
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar usuario' });
        }
    }
};

export default userController;
