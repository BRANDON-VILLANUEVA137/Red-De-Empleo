import express from 'express';

const router = express.Router();

// Define normal user-specific routes here
router.get('/profile', (req, res) => {
  res.json({ message: 'Perfil de usuario normal' });
});

// Add more user routes as needed

export default router;
