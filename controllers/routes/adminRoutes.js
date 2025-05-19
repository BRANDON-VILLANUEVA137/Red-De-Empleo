
import express from 'express';
import userController from '../userController.js';
import offerController from '../offerController.js';
import reportController from '../reportController.js';
import metricController from '../metricController.js';
import adminAuthMiddleware from '../middleware/adminAuth.js';
import { getAllAdministradores, addAdministrador } from '../modules/adminModels.js';

const router = express.Router();

// Apply adminAuthMiddleware to all routes in this router
// router.use(adminAuthMiddleware);

// Rutas para usuarios
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.post('/users', userController.createUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

// Rutas para ofertas
router.get('/offers', offerController.getAllOffers);
router.get('/offers/:id', offerController.getOfferById);
router.post('/offers', offerController.createOffer);
router.put('/offers/:id', offerController.updateOffer);
router.delete('/offers/:id', offerController.deleteOffer);

// Rutas para reportes
router.get('/reports', reportController.getAllReports);
router.get('/reports/:id', reportController.getReportById);
router.post('/reports', reportController.createReport);
router.put('/reports/:id', reportController.updateReport);
router.delete('/reports/:id', reportController.deleteReport);

// Rutas para métricas
router.get('/metrics', metricController.getAllMetrics);
router.get('/metrics/:id', metricController.getMetricById);
router.post('/metrics', metricController.createMetric);
router.put('/metrics/:id', metricController.updateMetric);
router.delete('/metrics/:id', metricController.deleteMetric);

// Rutas para administradores
router.get('/administradores', async (req, res) => {
  try {
    const administradores = await getAllAdministradores();
    res.json(administradores);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener administradores' });
  }
});

router.post('/administradores', async (req, res) => {
  try {
    const { id_usuario, permisos } = req.body;
    if (!id_usuario) {
      return res.status(400).json({ message: 'id_usuario es requerido' });
    }
    const newId = await addAdministrador(id_usuario, permisos || '');
    res.status(201).json({ id: newId });
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar administrador' });
  }
});

export default router;
