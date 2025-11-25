// backend/src/models/Ficha.model.js
// Modelo para Fichas de Trabajo - Sistema Educativo Chileno
import mongoose from 'mongoose';

const objetivoAprendizajeSchema = new mongoose.Schema({
  codigo: {
    type: String,
    required: true,
    trim: true
  },
  descripcion: {
    type: String,
    required: true,
    trim: true
  },
  eje: {
    type: String,
    required: true,
    trim: true
  }
}, { _id: false });

const fichaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, 'El título es obligatorio'],
    trim: true,
    minlength: [3, 'El título debe tener al menos 3 caracteres'],
    maxlength: [200, 'El título no puede tener más de 200 caracteres']
  },

  descripcion: {
    type: String,
    required: [true, 'La descripción es obligatoria'],
    trim: true,
    minlength: [10, 'La descripción debe tener al menos 10 caracteres'],
    maxlength: [1000, 'La descripción no puede tener más de 1000 caracteres']
  },

  pdfUrl: {
    type: String,
    required: [true, 'El PDF es obligatorio'],
    trim: true
  },

  thumbnailUrl: {
    type: String,
    required: [true, 'La imagen preview es obligatoria'],
    trim: true
  },

  // Sistema educativo chileno: Educación Básica (1° a 8°) y Media (1° a 4°)
  nivel: {
    type: String,
    required: [true, 'El nivel es obligatorio'],
    enum: {
      values: [
        '1-basico', '2-basico', '3-basico', '4-basico',
        '5-basico', '6-basico', '7-basico', '8-basico',
        '1-medio', '2-medio', '3-medio', '4-medio'
      ],
      message: 'Nivel inválido. Debe ser desde 1-basico hasta 8-basico o 1-medio hasta 4-medio'
    }
  },

  // Asignaturas del currículum chileno
  asignatura: {
    type: String,
    required: [true, 'La asignatura es obligatoria'],
    enum: {
      values: ['lenguaje', 'matematica', 'ciencias', 'historia', 'ingles', 'otra'],
      message: 'Asignatura inválida'
    },
    lowercase: true
  },

  // Objetivos de Aprendizaje según Bases Curriculares MINEDUC
  objetivosAprendizaje: {
    type: [objetivoAprendizajeSchema],
    validate: {
      validator: function(v) {
        return Array.isArray(v) && v.length > 0;
      },
      message: 'Debe incluir al menos un objetivo de aprendizaje'
    }
  },

  // Textos escolares oficiales en Chile
  textoEscolar: {
    type: String,
    enum: {
      values: ['santillana', 'sm', 'cal-y-canto', 'mineduc', 'otro', 'ninguno'],
      message: 'Texto escolar inválido'
    },
    default: 'ninguno',
    lowercase: true
  },

  unidad: {
    type: String,
    trim: true,
    maxlength: [100, 'La unidad no puede tener más de 100 caracteres']
  },

  tipo: {
    type: String,
    enum: {
      values: ['guia', 'evaluacion', 'taller', 'juego', 'lectura', 'reforzamiento'],
      message: 'Tipo de ficha inválido'
    },
    default: 'guia',
    lowercase: true
  },

  tags: [{
    type: String,
    trim: true,
    lowercase: true,
    maxlength: [50, 'Cada tag no puede tener más de 50 caracteres']
  }],

  descargas: {
    type: Number,
    default: 0,
    min: [0, 'Las descargas no pueden ser negativas']
  },

  vistas: {
    type: Number,
    default: 0,
    min: [0, 'Las vistas no pueden ser negativas']
  },

  isPremium: {
    type: Boolean,
    default: false
  },

  createdBy: {
    type: String,
    default: 'admin',
    trim: true
  },

  // Estadísticas adicionales
  stats: {
    favoritos: {
      type: Number,
      default: 0,
      min: 0
    },
    valoracionPromedio: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    totalValoraciones: {
      type: Number,
      default: 0,
      min: 0
    }
  },

  // Estado de publicación
  isPublished: {
    type: Boolean,
    default: false
  },

  publishedAt: {
    type: Date,
    default: null
  }

}, {
  timestamps: true,
  collection: 'fichas'
});

// ========================================
// MÉTODOS DE INSTANCIA
// ========================================

// Incrementar vistas
fichaSchema.methods.incrementarVistas = function() {
  this.vistas += 1;
  return this.save();
};

// Incrementar descargas
fichaSchema.methods.incrementarDescargas = function() {
  this.descargas += 1;
  return this.save();
};

// Agregar a favoritos
fichaSchema.methods.agregarFavorito = function() {
  this.stats.favoritos += 1;
  return this.save();
};

// Remover de favoritos
fichaSchema.methods.removerFavorito = function() {
  if (this.stats.favoritos > 0) {
    this.stats.favoritos -= 1;
  }
  return this.save();
};

// Actualizar valoración
fichaSchema.methods.actualizarValoracion = function(nuevaValoracion) {
  const puntosActuales = this.stats.valoracionPromedio * this.stats.totalValoraciones;
  this.stats.totalValoraciones += 1;
  this.stats.valoracionPromedio = (puntosActuales + nuevaValoracion) / this.stats.totalValoraciones;
  return this.save();
};

// Publicar ficha
fichaSchema.methods.publicar = function() {
  this.isPublished = true;
  this.publishedAt = new Date();
  return this.save();
};

// Despublicar ficha
fichaSchema.methods.despublicar = function() {
  this.isPublished = false;
  return this.save();
};

// ========================================
// MÉTODOS ESTÁTICOS
// ========================================

// Buscar fichas por filtros
fichaSchema.statics.buscarPorFiltros = function(filtros = {}) {
  const query = { isPublished: true };

  if (filtros.asignatura) query.asignatura = filtros.asignatura;
  if (filtros.nivel) query.nivel = filtros.nivel;
  if (filtros.tipo) query.tipo = filtros.tipo;
  if (filtros.textoEscolar) query.textoEscolar = filtros.textoEscolar;
  if (filtros.isPremium !== undefined) query.isPremium = filtros.isPremium;

  // Búsqueda por tags
  if (filtros.tags && Array.isArray(filtros.tags)) {
    query.tags = { $in: filtros.tags };
  }

  return this.find(query).sort({ createdAt: -1 });
};

// Obtener fichas populares
fichaSchema.statics.obtenerPopulares = function(limite = 10) {
  return this.find({ isPublished: true })
    .sort({ vistas: -1, descargas: -1 })
    .limit(limite);
};

// Obtener fichas recientes
fichaSchema.statics.obtenerRecientes = function(limite = 10) {
  return this.find({ isPublished: true })
    .sort({ publishedAt: -1 })
    .limit(limite);
};

// Buscar por objetivos de aprendizaje
fichaSchema.statics.buscarPorObjetivo = function(codigoOA) {
  return this.find({
    isPublished: true,
    'objetivosAprendizaje.codigo': codigoOA
  });
};

// Buscar por texto escolar
fichaSchema.statics.buscarPorTextoEscolar = function(textoEscolar) {
  return this.find({
    isPublished: true,
    textoEscolar: textoEscolar
  }).sort({ createdAt: -1 });
};

// Estadísticas por nivel
fichaSchema.statics.estadisticasPorNivel = function() {
  return this.aggregate([
    { $match: { isPublished: true } },
    {
      $group: {
        _id: '$nivel',
        total: { $sum: 1 },
        descargas: { $sum: '$descargas' },
        vistas: { $sum: '$vistas' }
      }
    },
    { $sort: { _id: 1 } }
  ]);
};

// Estadísticas por asignatura
fichaSchema.statics.estadisticasPorAsignatura = function() {
  return this.aggregate([
    { $match: { isPublished: true } },
    {
      $group: {
        _id: '$asignatura',
        total: { $sum: 1 },
        descargas: { $sum: '$descargas' },
        vistas: { $sum: '$vistas' }
      }
    },
    { $sort: { total: -1 } }
  ]);
};

// ========================================
// ÍNDICES PARA BÚSQUEDAS RÁPIDAS
// ========================================

// Índice compuesto para búsquedas por nivel y asignatura (más común)
fichaSchema.index({ nivel: 1, asignatura: 1 });

// Índice para búsquedas por tags
fichaSchema.index({ tags: 1 });

// Índice para búsquedas por texto escolar
fichaSchema.index({ textoEscolar: 1 });

// Índices para filtros comunes
fichaSchema.index({ isPublished: 1 });
fichaSchema.index({ isPremium: 1 });

// Índices para ordenamiento
fichaSchema.index({ vistas: -1 });
fichaSchema.index({ descargas: -1 });
fichaSchema.index({ publishedAt: -1 });
fichaSchema.index({ createdAt: -1 });

// Índice para búsqueda de texto completo
fichaSchema.index({
  titulo: 'text',
  descripcion: 'text',
  tags: 'text'
}, {
  weights: {
    titulo: 10,
    tags: 5,
    descripcion: 1
  },
  name: 'fichas_text_index'
});

// Índice para objetivos de aprendizaje
fichaSchema.index({ 'objetivosAprendizaje.codigo': 1 });

const Ficha = mongoose.model('Ficha', fichaSchema);

export default Ficha;
