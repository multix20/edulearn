// backend/src/models/Worksheet.model.js
import mongoose from 'mongoose';

const worksheetSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'El título es obligatorio'],
    trim: true,
    minlength: [3, 'El título debe tener al menos 3 caracteres'],
    maxlength: [200, 'El título no puede tener más de 200 caracteres']
  },
  
  description: {
    type: String,
    required: [true, 'La descripción es obligatoria'],
    trim: true,
    minlength: [10, 'La descripción debe tener al menos 10 caracteres'],
    maxlength: [1000, 'La descripción no puede tener más de 1000 caracteres']
  },
  
  subject: {
    type: String,
    required: [true, 'La materia es obligatoria'],
    enum: ['math', 'science', 'language', 'social', 'art', 'music', 'physical'],
    lowercase: true
  },
  
  grade: {
    type: String,
    required: [true, 'El grado es obligatorio'],
    enum: ['k', 'g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7', 'g8']
  },
  
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'intermediate'
  },
  
  // Archivo PDF de la hoja de trabajo
  fileUrl: {
    type: String,
    required: [true, 'El archivo PDF es obligatorio']
  },
  
  // Imagen de vista previa
  thumbnail: {
    type: String,
    default: '/images/worksheet-default.jpg'
  },
  
  // Duración estimada en minutos
  duration: {
    type: Number,
    required: [true, 'La duración es obligatoria'],
    min: [5, 'La duración mínima es 5 minutos'],
    max: [180, 'La duración máxima es 180 minutos']
  },
  
  // Número de preguntas/ejercicios
  questions: {
    type: Number,
    default: 10,
    min: [1, 'Debe tener al menos 1 pregunta']
  },
  
  // Tags para búsqueda
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  
  // Objetivos de aprendizaje
  learningObjectives: [{
    type: String,
    trim: true
  }],
  
  // Autor/creador
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Estadísticas
  stats: {
    views: {
      type: Number,
      default: 0
    },
    downloads: {
      type: Number,
      default: 0
    },
    favorites: {
      type: Number,
      default: 0
    },
    completions: {
      type: Number,
      default: 0
    },
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    totalRatings: {
      type: Number,
      default: 0
    }
  },
  
  // Estado
  isPublished: {
    type: Boolean,
    default: false
  },
  
  isPremium: {
    type: Boolean,
    default: false
  },
  
  // Fecha de publicación
  publishedAt: {
    type: Date,
    default: null
  }
  
}, {
  timestamps: true
});

// ========================================
// MÉTODOS DE INSTANCIA
// ========================================

// Incrementar vistas
worksheetSchema.methods.incrementViews = function() {
  this.stats.views += 1;
  return this.save();
};

// Incrementar descargas
worksheetSchema.methods.incrementDownloads = function() {
  this.stats.downloads += 1;
  return this.save();
};

// Agregar a favoritos
worksheetSchema.methods.addToFavorites = function() {
  this.stats.favorites += 1;
  return this.save();
};

// Remover de favoritos
worksheetSchema.methods.removeFromFavorites = function() {
  if (this.stats.favorites > 0) {
    this.stats.favorites -= 1;
  }
  return this.save();
};

// Actualizar rating
worksheetSchema.methods.updateRating = function(newRating) {
  const totalPoints = this.stats.averageRating * this.stats.totalRatings;
  this.stats.totalRatings += 1;
  this.stats.averageRating = (totalPoints + newRating) / this.stats.totalRatings;
  return this.save();
};

// Publicar worksheet
worksheetSchema.methods.publish = function() {
  this.isPublished = true;
  this.publishedAt = new Date();
  return this.save();
};

// Despublicar worksheet
worksheetSchema.methods.unpublish = function() {
  this.isPublished = false;
  return this.save();
};

// ========================================
// MÉTODOS ESTÁTICOS
// ========================================

// Buscar worksheets por filtros
worksheetSchema.statics.findByFilters = function(filters = {}) {
  const query = { isPublished: true };
  
  if (filters.subject) query.subject = filters.subject;
  if (filters.grade) query.grade = filters.grade;
  if (filters.difficulty) query.difficulty = filters.difficulty;
  if (filters.isPremium !== undefined) query.isPremium = filters.isPremium;
  
  return this.find(query)
    .populate('author', 'name avatar')
    .sort({ createdAt: -1 });
};

// Obtener worksheets populares
worksheetSchema.statics.getPopular = function(limit = 10) {
  return this.find({ isPublished: true })
    .sort({ 'stats.views': -1, 'stats.favorites': -1 })
    .limit(limit)
    .populate('author', 'name avatar');
};

// Obtener worksheets recientes
worksheetSchema.statics.getRecent = function(limit = 10) {
  return this.find({ isPublished: true })
    .sort({ publishedAt: -1 })
    .limit(limit)
    .populate('author', 'name avatar');
};

// ========================================
// ÍNDICES
// ========================================
worksheetSchema.index({ subject: 1, grade: 1 });
worksheetSchema.index({ isPublished: 1 });
worksheetSchema.index({ 'stats.views': -1 });
worksheetSchema.index({ publishedAt: -1 });
worksheetSchema.index({ tags: 1 });

const Worksheet = mongoose.model('Worksheet', worksheetSchema);

export default Worksheet;