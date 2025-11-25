// backend/src/routes/download.routes.js
import express from 'express';
import {
  captureAndSendFicha,
  getDownloadStats,
  checkIfDownloaded
} from '../controllers/downloadController.js';

const router = express.Router();

// ========================================
// RUTAS PÚBLICAS
// ========================================

// @desc    Capturar email y enviar ficha por correo
// @route   POST /api/download/capture
// @access  Public
// @body    { email, nombre (opcional), fichaId }
router.post('/capture', captureAndSendFicha);

// @desc    Verificar si un email ya descargó una ficha
// @route   GET /api/download/check
// @access  Public
// @query   ?email=example@mail.com&fichaId=123abc
router.get('/check', checkIfDownloaded);

// @desc    Obtener estadísticas de descargas
// @route   GET /api/download/stats
// @access  Public
router.get('/stats', getDownloadStats);

export default router;
