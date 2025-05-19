import express from 'express';
import roleAuthMiddleware from '../middleware/roleAuth.js';

const router = express.Router();

// Apply roleAuthMiddleware to allow only company users (id_rol 1)
router.use(roleAuthMiddleware([1]));

// Define company-specific routes here
router.get('/profile', (req, res) => {
  res.json({ message: 'Perfil de empresa' });
});

// Add more company routes as needed

export default router;
