import express from 'express';
const router = express.Router();

// Ruta para obtener categorías de ejemplo
router.get('/', (req, res) => {
  const categoriasEjemplo = [
    { id: 1, nombre: 'Tecnología' },
    { id: 2, nombre: 'Educación' },
    { id: 3, nombre: 'Salud' }
  ];
  res.json(categoriasEjemplo);
});

export default router;
