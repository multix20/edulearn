// backend/src/routes/auth.routes.js
import express from 'express';
import {
  register,
  login,
  logout,
  getMe,
  updateDetails,
  updatePassword
} from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// ========================================
// RUTAS PÚBLICAS
// ========================================

// Registro de usuario
router.post('/register', register);

// Login de usuario
router.post('/login', login);

// ========================================
// RUTAS PROTEGIDAS (Requieren autenticación)
// ========================================

// Logout
router.post('/logout', protect, logout);

// Obtener usuario actual
router.get('/me', protect, getMe);

// Actualizar detalles del usuario
router.put('/updatedetails', protect, updateDetails);

// Actualizar contraseña
router.put('/updatepassword', protect, updatePassword);

export default router;