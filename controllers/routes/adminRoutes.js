import express from 'express';
import userController from '../userController.js';
import offerController from '../offerController.js';
import reportController from '../reportController.js';
import metricController from '../metricController.js';
import adminAuthMiddleware from '../middleware/adminAuth.js';

const router = express.Router();

// Apply adminAuthMiddleware to all routes in this router
router.use(adminAuthMiddleware);

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

export default router;
