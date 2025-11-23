// backend/src/models/User.model.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true,
    minlength: [2, 'El nombre debe tener al menos 2 caracteres'],
    maxlength: [50, 'El nombre no puede tener más de 50 caracteres']
  },
  
  email: {
    type: String,
    required: [true, 'El email es obligatorio'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Por favor ingresa un email válido']
  },
  
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
    minlength: [6, 'La contraseña debe tener al menos 6 caracteres'],
    select: false // No incluir password en queries por defecto
  },
  
  role: {
    type: String,
    enum: ['teacher', 'admin'],
    default: 'teacher'
  },
  
  avatar: {
    type: String,
    default: '/images/avatar-default.jpg'
  },
  
  provider: {
    type: String,
    enum: ['local', 'google', 'facebook'],
    default: 'local'
  },
  
  providerId: {
    type: String,
    default: null
  },
  
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  
  // Estadísticas del usuario
  stats: {
    worksheetsCompleted: {
      type: Number,
      default: 0
    },
    gamesPlayed: {
      type: Number,
      default: 0
    },
    points: {
      type: Number,
      default: 0
    },
    level: {
      type: Number,
      default: 1
    }
  },
  
  // Favoritos
  favorites: [{
    resourceId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'favorites.resourceType'
    },
    resourceType: {
      type: String,
      enum: ['Worksheet', 'Game', 'Lesson']
    },
    addedAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Colecciones personales
  collections: [{
    name: String,
    description: String,
    resources: [{
      resourceId: mongoose.Schema.Types.ObjectId,
      resourceType: String
    }],
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  lastLogin: {
    type: Date,
    default: null
  },
  
  isActive: {
    type: Boolean,
    default: true
  }
  
}, {
  timestamps: true // Agrega createdAt y updatedAt automáticamente
});

// ========================================
// MIDDLEWARE PRE-SAVE: Hashear password
// ========================================
userSchema.pre('save', async function(next) {
  // Solo hashear si el password fue modificado
  if (!this.isModified('password')) return next();
  
  try {
    // Generar salt y hashear password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// ========================================
// MÉTODOS DE INSTANCIA
// ========================================

// Comparar password
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error('Error al comparar contraseñas');
  }
};

// Obtener datos públicos del usuario (sin password)
userSchema.methods.toPublicJSON = function() {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    role: this.role,
    avatar: this.avatar,
    stats: this.stats,
    isEmailVerified: this.isEmailVerified,
    createdAt: this.createdAt
  };
};

// ========================================
// ÍNDICES
// ========================================
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });
userSchema.index({ createdAt: -1 });

const User = mongoose.model('User', userSchema);

export default User;