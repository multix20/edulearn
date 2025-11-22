// backend/src/middleware/auth.middleware.js
import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';

// ========================================
// PROTEGER RUTAS (Requiere autenticación)
// ========================================
export const protect = async (req, res, next) => {
  try {
    let token;
    
    // 1. Verificar si el token existe en headers o cookies
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      // Token en header: Bearer <token>
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.token) {
      // Token en cookie
      token = req.cookies.token;
    }
    
    // 2. Verificar que el token exista
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No autorizado - Token no proporcionado'
      });
    }
    
    // 3. Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 4. Buscar usuario
    const user = await User.findById(decoded.id);
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'No autorizado - Usuario no encontrado'
      });
    }
    
    // 5. Verificar que el usuario esté activo
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'No autorizado - Usuario inactivo'
      });
    }
    
    // 6. Adjuntar usuario al request
    req.user = user;
    next();
    
  } catch (error) {
    console.error('Error en middleware de autenticación:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'No autorizado - Token inválido'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'No autorizado - Token expirado'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error en autenticación'
    });
  }
};

// ========================================
// AUTORIZAR ROLES
// ========================================
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `El rol '${req.user.role}' no tiene permiso para acceder a este recurso`
      });
    }
    next();
  };
};

// ========================================
// VERIFICAR PROPIEDAD DEL RECURSO
// ========================================
export const checkOwnership = (Model, paramName = 'id') => {
  return async (req, res, next) => {
    try {
      const resource = await Model.findById(req.params[paramName]);
      
      if (!resource) {
        return res.status(404).json({
          success: false,
          message: 'Recurso no encontrado'
        });
      }
      
      // Verificar si el usuario es el dueño o es admin
      if (
        resource.author.toString() !== req.user.id &&
        req.user.role !== 'admin'
      ) {
        return res.status(403).json({
          success: false,
          message: 'No tienes permiso para modificar este recurso'
        });
      }
      
      // Adjuntar recurso al request
      req.resource = resource;
      next();
      
    } catch (error) {
      console.error('Error verificando propiedad:', error);
      res.status(500).json({
        success: false,
        message: 'Error al verificar permisos'
      });
    }
  };
};

// ========================================
// MIDDLEWARE OPCIONAL DE AUTENTICACIÓN
// ========================================
// Similar a protect, pero no lanza error si no hay token
export const optionalAuth = async (req, res, next) => {
  try {
    let token;
    
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.token) {
      token = req.cookies.token;
    }
    
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        
        if (user && user.isActive) {
          req.user = user;
        }
      } catch (error) {
        // Token inválido o expirado, simplemente continuar sin usuario
        console.log('Token inválido en optionalAuth');
      }
    }
    
    next();
  } catch (error) {
    console.error('Error en optionalAuth:', error);
    next();
  }
};

export default {
  protect,
  authorize,
  checkOwnership,
  optionalAuth
};