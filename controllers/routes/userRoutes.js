import express from 'express';
import roleAuthMiddleware from '../middleware/roleAuth.js';

const router = express.Router();

// Apply roleAuthMiddleware to allow only normal users (id_rol 2)
router.use(roleAuthMiddleware([2]));

// Define normal user-specific routes here
router.get('/profile', (req, res) => {
  res.json({ message: 'Perfil de usuario normal' });
});

// Add more user routes as needed

export default router;
