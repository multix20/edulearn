// backend/src/models/EmailCapture.js
// Modelo para capturar y gestionar emails de usuarios que descargan fichas
import mongoose from 'mongoose';

const fichaDescargadaSchema = new mongoose.Schema({
  fichaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ficha',
    required: true
  },
  fecha: {
    type: Date,
    default: Date.now
  }
}, { _id: false });

const emailCaptureSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'El email es obligatorio'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: props => `${props.value} no es un email válido`
    }
  },

  nombre: {
    type: String,
    trim: true,
    maxlength: [100, 'El nombre no puede tener más de 100 caracteres']
  },

  fichasDescargadas: {
    type: [fichaDescargadaSchema],
    default: []
  },

  totalDescargas: {
    type: Number,
    default: 0,
    min: [0, 'El total de descargas no puede ser negativo']
  },

  ultimaDescarga: {
    type: Date,
    default: null
  },

  source: {
    type: String,
    enum: {
      values: ['descarga', 'newsletter', 'landing'],
      message: 'Source inválido. Debe ser: descarga, newsletter o landing'
    },
    default: 'descarga',
    lowercase: true
  },

  nivelesInteres: [{
    type: String,
    trim: true,
    lowercase: true
  }],

  mailchimpSynced: {
    type: Boolean,
    default: false
  },

  mailchimpSubscriberId: {
    type: String,
    default: null
  },

  unsubscribed: {
    type: Boolean,
    default: false
  },

  unsubscribedAt: {
    type: Date,
    default: null
  },

  // Metadata adicional
  metadata: {
    userAgent: String,
    ip: String,
    referrer: String
  },

  // Campos de tracking para marketing
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],

  notas: {
    type: String,
    maxlength: [500, 'Las notas no pueden tener más de 500 caracteres']
  }

}, {
  timestamps: true,
  collection: 'email_captures'
});

// ========================================
// MÉTODOS DE INSTANCIA
// ========================================

// Registrar nueva descarga
emailCaptureSchema.methods.registrarDescarga = function(fichaId) {
  this.fichasDescargadas.push({
    fichaId: fichaId,
    fecha: new Date()
  });
  this.totalDescargas += 1;
  this.ultimaDescarga = new Date();
  return this.save();
};

// Verificar si ya descargó una ficha específica
emailCaptureSchema.methods.yaDescargo = function(fichaId) {
  return this.fichasDescargadas.some(
    descarga => descarga.fichaId.toString() === fichaId.toString()
  );
};

// Agregar nivel de interés
emailCaptureSchema.methods.agregarNivelInteres = function(nivel) {
  if (!this.nivelesInteres.includes(nivel)) {
    this.nivelesInteres.push(nivel);
    return this.save();
  }
  return Promise.resolve(this);
};

// Marcar como sincronizado con Mailchimp
emailCaptureSchema.methods.marcarSincronizado = function(subscriberId = null) {
  this.mailchimpSynced = true;
  if (subscriberId) {
    this.mailchimpSubscriberId = subscriberId;
  }
  return this.save();
};

// Darse de baja
emailCaptureSchema.methods.darseDeBaja = function() {
  this.unsubscribed = true;
  this.unsubscribedAt = new Date();
  return this.save();
};

// Reactivar suscripción
emailCaptureSchema.methods.reactivar = function() {
  this.unsubscribed = false;
  this.unsubscribedAt = null;
  return this.save();
};

// Agregar tag
emailCaptureSchema.methods.agregarTag = function(tag) {
  if (!this.tags.includes(tag.toLowerCase())) {
    this.tags.push(tag.toLowerCase());
    return this.save();
  }
  return Promise.resolve(this);
};

// ========================================
// MÉTODOS ESTÁTICOS
// ========================================

// Buscar o crear email
emailCaptureSchema.statics.buscarOCrear = async function(emailData) {
  const { email, nombre, source, fichaId } = emailData;

  let emailCapture = await this.findOne({ email: email.toLowerCase() });

  if (!emailCapture) {
    // Crear nuevo registro
    emailCapture = new this({
      email: email.toLowerCase(),
      nombre: nombre || null,
      source: source || 'descarga',
      totalDescargas: 1,
      ultimaDescarga: new Date()
    });

    if (fichaId) {
      emailCapture.fichasDescargadas.push({
        fichaId: fichaId,
        fecha: new Date()
      });
    }

    await emailCapture.save();
  } else if (fichaId) {
    // Registrar nueva descarga si no la tiene ya
    if (!emailCapture.yaDescargo(fichaId)) {
      await emailCapture.registrarDescarga(fichaId);
    }
  }

  return emailCapture;
};

// Obtener emails activos (no unsubscribed)
emailCaptureSchema.statics.obtenerActivos = function() {
  return this.find({ unsubscribed: false }).sort({ createdAt: -1 });
};

// Obtener emails sin sincronizar con Mailchimp
emailCaptureSchema.statics.obtenerSinSincronizar = function() {
  return this.find({
    mailchimpSynced: false,
    unsubscribed: false
  }).sort({ createdAt: -1 });
};

// Estadísticas de capturas
emailCaptureSchema.statics.obtenerEstadisticas = async function() {
  const stats = await this.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: 1 },
        activos: {
          $sum: { $cond: [{ $eq: ['$unsubscribed', false] }, 1, 0] }
        },
        sinSincronizar: {
          $sum: { $cond: [{ $eq: ['$mailchimpSynced', false] }, 1, 0] }
        },
        totalDescargas: { $sum: '$totalDescargas' },
        promedioDescargas: { $avg: '$totalDescargas' }
      }
    }
  ]);

  return stats[0] || {
    total: 0,
    activos: 0,
    sinSincronizar: 0,
    totalDescargas: 0,
    promedioDescargas: 0
  };
};

// Estadísticas por source
emailCaptureSchema.statics.estadisticasPorSource = function() {
  return this.aggregate([
    {
      $group: {
        _id: '$source',
        total: { $sum: 1 },
        activos: {
          $sum: { $cond: [{ $eq: ['$unsubscribed', false] }, 1, 0] }
        }
      }
    },
    { $sort: { total: -1 } }
  ]);
};

// Obtener emails recientes
emailCaptureSchema.statics.obtenerRecientes = function(limite = 50) {
  return this.find({ unsubscribed: false })
    .sort({ createdAt: -1 })
    .limit(limite);
};

// Buscar por ficha descargada
emailCaptureSchema.statics.buscarPorFicha = function(fichaId) {
  return this.find({
    'fichasDescargadas.fichaId': fichaId,
    unsubscribed: false
  }).sort({ 'fichasDescargadas.fecha': -1 });
};

// Obtener top descargadores
emailCaptureSchema.statics.topDescargadores = function(limite = 10) {
  return this.find({ unsubscribed: false })
    .sort({ totalDescargas: -1 })
    .limit(limite)
    .select('email nombre totalDescargas ultimaDescarga');
};

// ========================================
// ÍNDICES
// ========================================

// Índice único en email
emailCaptureSchema.index({ email: 1 }, { unique: true });

// Índice para búsquedas por estado
emailCaptureSchema.index({ unsubscribed: 1 });
emailCaptureSchema.index({ mailchimpSynced: 1 });

// Índice para búsquedas por source
emailCaptureSchema.index({ source: 1 });

// Índice para ordenamiento por fecha
emailCaptureSchema.index({ createdAt: -1 });
emailCaptureSchema.index({ ultimaDescarga: -1 });

// Índice para búsquedas por fichas descargadas
emailCaptureSchema.index({ 'fichasDescargadas.fichaId': 1 });

// Índice para top descargadores
emailCaptureSchema.index({ totalDescargas: -1 });

// ========================================
// HOOKS/MIDDLEWARE
// ========================================

// Pre-save: Convertir email a lowercase
emailCaptureSchema.pre('save', function(next) {
  if (this.email) {
    this.email = this.email.toLowerCase().trim();
  }
  next();
});

// Pre-save: Actualizar ultimaDescarga si se agregan fichas
emailCaptureSchema.pre('save', function(next) {
  if (this.isModified('fichasDescargadas') && this.fichasDescargadas.length > 0) {
    const ultimaFecha = this.fichasDescargadas[this.fichasDescargadas.length - 1].fecha;
    if (!this.ultimaDescarga || ultimaFecha > this.ultimaDescarga) {
      this.ultimaDescarga = ultimaFecha;
    }
  }
  next();
});

const EmailCapture = mongoose.model('EmailCapture', emailCaptureSchema);

export default EmailCapture;
