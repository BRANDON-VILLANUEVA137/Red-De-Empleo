const adminAuthMiddleware = (req, res, next) => {
  if (!req.session.usuario || !req.session.usuario.id_rol) {
    return res.status(401).json({ message: 'No autenticado' });
  }
  if (req.session.usuario.id_rol !== 3) {
    return res.status(403).json({ message: 'No autorizado' });
  }
  next();
};

export default adminAuthMiddleware;
