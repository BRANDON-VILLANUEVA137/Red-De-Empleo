// loginController.js

const loginController = {
  login: (req, res) => {
    const { email, password } = req.body;

    UserModel.findByEmail(email, (err, results) => {
      if (err) return res.status(500).json({ message: 'Error del servidor' });
      if (results.length === 0) return res.status(401).json({ message: 'Correo no registrado' });

      const user = results[0];
      UserModel.validatePassword(password, user.password, (err, isMatch) => {
        if (err) return res.status(500).json({ message: 'Error al validar contraseña' });
        if (!isMatch) return res.status(401).json({ message: 'Contraseña incorrecta' });

        req.session.user = {
          id: user.id,
          email: user.email,
          es_empresa: user.es_empresa
        };

        res.status(200).json({ message: 'Inicio de sesión exitoso' });
      });
    });
  },

  register: (req, res) => {
    const { nombre, email, password, esEmpresa } = req.body;

    UserModel.createUser(nombre, email, password, esEmpresa, (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ message: 'Correo ya registrado' });
        }
        return res.status(500).json({ message: 'Error al registrar usuario' });
      }

      res.status(201).json({ message: 'Usuario registrado correctamente' });
    });
  }
};

export default loginController;
