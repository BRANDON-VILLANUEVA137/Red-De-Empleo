import express from 'express';

const router = express.Router();

// Define company-specific routes here
router.get('/profile', (req, res) => {
  res.json({ message: 'Perfil de empresa' });
});

// Add more company routes as needed

export default router;
