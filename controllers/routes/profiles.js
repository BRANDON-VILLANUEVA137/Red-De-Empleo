// controllers/routes/profiles.js

import express from 'express';
import {
    getAllProfiles,
    getProfileById,
    createProfile,
    updateProfile,
    deleteProfile
  } from '../profileController.js'; // solo si profileController.js está en la carpeta `controllers`
  

const router = express.Router();

router.get('/', getAllProfiles);
router.get('/:id', getProfileById);
router.post('/', createProfile);
router.put('/:id', updateProfile);
router.delete('/:id', deleteProfile);

export default router;
