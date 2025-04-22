import express from 'express';
import authController from './authController.js';

const router = express.Router();

router.post('/api/login', authController.login);
router.post('/api/register', authController.register);

export default router;
