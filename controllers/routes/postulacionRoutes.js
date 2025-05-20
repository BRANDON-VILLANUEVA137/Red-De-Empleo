import express from 'express';
import {
  getAllPostulaciones,
  getPostulacionById,
  createPostulacion,
  updatePostulacion,
  deletePostulacion
} from '../postulacionController.js';

const router = express.Router();

router.get('/', getAllPostulaciones);
router.get('/:id', getPostulacionById);
router.post('/', createPostulacion);
router.put('/:id', updatePostulacion);
router.delete('/:id', deletePostulacion);

export default router;
