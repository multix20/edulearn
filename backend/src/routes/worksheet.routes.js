// backend/src/routes/worksheet.routes.js
import express from 'express';
import { protect, authorize, optionalAuth } from '../middleware/auth.middleware.js';
import Worksheet from '../models/Worksheet.model.js';

const router = express.Router();

// ========================================
// RUTAS PÚBLICAS
// ========================================

// @desc    Obtener todas las hojas de trabajo publicadas
// @route   GET /api/worksheets
// @access  Public
router.get('/', optionalAuth, async (req, res) => {
  try {
    const { subject, grade, difficulty, page = 1, limit = 12, sort = '-createdAt' } = req.query;
    
    // Construir query
    const query = { isPublished: true };
    
    if (subject) query.subject = subject;
    if (grade) query.grade = grade;
    if (difficulty) query.difficulty = difficulty;
    
    // Paginación
    const skip = (page - 1) * limit;
    
    // Ejecutar query
    const worksheets = await Worksheet.find(query)
      .populate('author', 'name avatar')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));
    
    // Contar total
    const total = await Worksheet.countDocuments(query);
    
    res.status(200).json({
      success: true,
      count: worksheets.length,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
      worksheets
    });
  } catch (error) {
    console.error('Error al obtener worksheets:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener hojas de trabajo'
    });
  }
});

// @desc    Obtener worksheets populares
// @route   GET /api/worksheets/popular
// @access  Public
router.get('/popular', async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    
    const worksheets = await Worksheet.getPopular(parseInt(limit));
    
    res.status(200).json({
      success: true,
      count: worksheets.length,
      worksheets
    });
  } catch (error) {
    console.error('Error al obtener worksheets populares:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener hojas de trabajo populares'
    });
  }
});

// @desc    Obtener worksheets recientes
// @route   GET /api/worksheets/recent
// @access  Public
router.get('/recent', async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    
    const worksheets = await Worksheet.getRecent(parseInt(limit));
    
    res.status(200).json({
      success: true,
      count: worksheets.length,
      worksheets
    });
  } catch (error) {
    console.error('Error al obtener worksheets recientes:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener hojas de trabajo recientes'
    });
  }
});

// @desc    Obtener una hoja de trabajo por ID
// @route   GET /api/worksheets/:id
// @access  Public
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const worksheet = await Worksheet.findById(req.params.id)
      .populate('author', 'name avatar role');
    
    if (!worksheet) {
      return res.status(404).json({
        success: false,
        message: 'Hoja de trabajo no encontrada'
      });
    }
    
    // Incrementar vistas
    await worksheet.incrementViews();
    
    res.status(200).json({
      success: true,
      worksheet
    });
  } catch (error) {
    console.error('Error al obtener worksheet:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener hoja de trabajo'
    });
  }
});

// ========================================
// RUTAS PROTEGIDAS
// ========================================

// @desc    Crear nueva hoja de trabajo
// @route   POST /api/worksheets
// @access  Private (Teacher/Admin)
router.post('/', protect, authorize('teacher', 'admin'), async (req, res) => {
  try {
    // Agregar autor automáticamente
    req.body.author = req.user.id;
    
    const worksheet = await Worksheet.create(req.body);
    
    res.status(201).json({
      success: true,
      worksheet
    });
  } catch (error) {
    console.error('Error al crear worksheet:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error al crear hoja de trabajo'
    });
  }
});

// @desc    Actualizar hoja de trabajo
// @route   PUT /api/worksheets/:id
// @access  Private (Owner/Admin)
router.put('/:id', protect, async (req, res) => {
  try {
    let worksheet = await Worksheet.findById(req.params.id);
    
    if (!worksheet) {
      return res.status(404).json({
        success: false,
        message: 'Hoja de trabajo no encontrada'
      });
    }
    
    // Verificar que el usuario sea el autor o admin
    if (
      worksheet.author.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({
        success: false,
        message: 'No tienes permiso para modificar esta hoja de trabajo'
      });
    }
    
    worksheet = await Worksheet.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    res.status(200).json({
      success: true,
      worksheet
    });
  } catch (error) {
    console.error('Error al actualizar worksheet:', error);
    res.status(500).json({
      success: false,
      message: 'Error al actualizar hoja de trabajo'
    });
  }
});

// @desc    Eliminar hoja de trabajo
// @route   DELETE /api/worksheets/:id
// @access  Private (Owner/Admin)
router.delete('/:id', protect, async (req, res) => {
  try {
    const worksheet = await Worksheet.findById(req.params.id);
    
    if (!worksheet) {
      return res.status(404).json({
        success: false,
        message: 'Hoja de trabajo no encontrada'
      });
    }
    
    // Verificar que el usuario sea el autor o admin
    if (
      worksheet.author.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({
        success: false,
        message: 'No tienes permiso para eliminar esta hoja de trabajo'
      });
    }
    
    await worksheet.deleteOne();
    
    res.status(200).json({
      success: true,
      message: 'Hoja de trabajo eliminada correctamente'
    });
  } catch (error) {
    console.error('Error al eliminar worksheet:', error);
    res.status(500).json({
      success: false,
      message: 'Error al eliminar hoja de trabajo'
    });
  }
});

// @desc    Publicar/despublicar hoja de trabajo
// @route   PUT /api/worksheets/:id/publish
// @access  Private (Owner/Admin)
router.put('/:id/publish', protect, async (req, res) => {
  try {
    const worksheet = await Worksheet.findById(req.params.id);
    
    if (!worksheet) {
      return res.status(404).json({
        success: false,
        message: 'Hoja de trabajo no encontrada'
      });
    }
    
    // Verificar permisos
    if (
      worksheet.author.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({
        success: false,
        message: 'No tienes permiso para modificar esta hoja de trabajo'
      });
    }
    
    // Toggle publish
    if (worksheet.isPublished) {
      await worksheet.unpublish();
    } else {
      await worksheet.publish();
    }
    
    res.status(200).json({
      success: true,
      worksheet
    });
  } catch (error) {
    console.error('Error al publicar worksheet:', error);
    res.status(500).json({
      success: false,
      message: 'Error al publicar hoja de trabajo'
    });
  }
});

// @desc    Incrementar descargas
// @route   POST /api/worksheets/:id/download
// @access  Public
router.post('/:id/download', async (req, res) => {
  try {
    const worksheet = await Worksheet.findById(req.params.id);
    
    if (!worksheet) {
      return res.status(404).json({
        success: false,
        message: 'Hoja de trabajo no encontrada'
      });
    }
    
    await worksheet.incrementDownloads();
    
    res.status(200).json({
      success: true,
      message: 'Descarga registrada'
    });
  } catch (error) {
    console.error('Error al registrar descarga:', error);
    res.status(500).json({
      success: false,
      message: 'Error al registrar descarga'
    });
  }
});

export default router;