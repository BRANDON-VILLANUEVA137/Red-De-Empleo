// routes/profileRoutes.js

import express from 'express';
import {
    getAllProfiles,
    getProfileById,
    createProfile,
    updateProfile,
    deleteProfile
} from '../profileController.js'; // O ajusta el path si el controller está en otra carpeta

const router = express.Router();

router.get('/', getAllProfiles);
router.get('/:id', getProfileById);
router.post('/', createProfile);
router.put('/:id', updateProfile);
router.delete('/:id', deleteProfile);

export default router;

