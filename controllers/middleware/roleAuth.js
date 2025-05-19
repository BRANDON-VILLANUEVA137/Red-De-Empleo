const roleAuthMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.session.usuario || !req.session.usuario.id_rol) {
      return res.status(401).json({ message: 'No autenticado' });
    }
    if (!allowedRoles.includes(req.session.usuario.id_rol)) {
      return res.status(403).json({ message: 'No autorizado' });
    }
    next();
  };
};

export default roleAuthMiddleware;
