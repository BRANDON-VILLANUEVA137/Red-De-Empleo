// middlewares/authMiddleware.js

// ✅ Protege rutas de API
export function protegerRutaAPI(req, res, next) {
  if (req.session && req.session.usuario) {
    next(); // Usuario autenticado
  } else {
    res.status(401).json({ mensaje: 'No autorizado. Inicia sesión.' });
  }
}

// ✅ Protege rutas de vistas (HTML)
export function protegerVista(req, res, next) {
  if (req.session && req.session.usuario) {
    next(); // Usuario autenticado
  } else {
    res.redirect('/views/login.html'); // Ajusta a tu ruta real
  }
}

// ✅ Solo admins (para API o vistas, según el caso)
export function soloAdmin(req, res, next) {
  if (req.session && req.session.usuario && req.session.usuario.id_rol === 3) {
    next();
  } else {
    res.status(403).json({ mensaje: 'Acceso denegado. Solo administradores.' });
  }
}
