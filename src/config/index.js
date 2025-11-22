// src/config/index.js
export const EDULEARN_CONFIG = {
  // URLs de la API (usando variables de entorno de Vite)
  API: {
    BASE_URL: import.meta.env.VITE_API_URL || 'https://api.edulearn.com',
    ENDPOINTS: {
      subjects: '/api/subjects',
      grades: '/api/grades',
      worksheets: '/api/worksheets',
      games: '/api/games',
      search: '/api/search',
      auth: '/api/auth'
    }
  },
  
  // Configuración de búsqueda
  SEARCH: {
    MIN_CHARS: 2,
    DEBOUNCE_DELAY: 300,
    MAX_RESULTS: 20
  },
  
  // Configuración de animaciones
  ANIMATIONS: {
    STATS_DURATION: 2000,
    FADE_IN_DELAY: 100,
    SMOOTH_SCROLL_DURATION: 800
  },
  
  // Configuración de mensajes
  MESSAGES: {
    DISPLAY_DURATION: 4000,
    FADE_DURATION: 300
  },
  
  // Breakpoints para responsive
  BREAKPOINTS: {
    MOBILE: 768,
    TABLET: 1024,
    DESKTOP: 1200
  }
};

export const APP_CONSTANTS = {
  // Estados de carga
  LOADING_STATES: {
    IDLE: 'idle',
    LOADING: 'loading',
    SUCCESS: 'success',
    ERROR: 'error'
  },
  
  // Tipos de mensaje
  MESSAGE_TYPES: {
    INFO: 'info',
    SUCCESS: 'success',
    WARNING: 'warning',
    ERROR: 'error'
  },
  
  // Categorías de recursos
  RESOURCE_TYPES: {
    WORKSHEET: 'worksheet',
    GAME: 'game',
    LESSON: 'lesson',
    ASSESSMENT: 'assessment'
  },
  
  // Materias disponibles
  SUBJECTS: [
    { id: 'math', name: 'Matemáticas', icon: '🔢', color: 'blue' },
    { id: 'science', name: 'Ciencias', icon: '🔬', color: 'green' },
    { id: 'language', name: 'Lenguaje', icon: '📚', color: 'purple' },
    { id: 'social', name: 'Estudios Sociales', icon: '🌍', color: 'orange' }
  ],
  
  // Grados académicos
  GRADES: [
    { id: 'k', name: 'Kinder', order: 0 },
    { id: 'g1', name: '1° Grado', order: 1 },
    { id: 'g2', name: '2° Grado', order: 2 },
    { id: 'g3', name: '3° Grado', order: 3 },
    { id: 'g4', name: '4° Grado', order: 4 },
    { id: 'g5', name: '5° Grado', order: 5 }
  ]
};

export const LOCALIZATION = {
  DEFAULT_LANG: 'es',
  SUPPORTED_LANGS: ['es', 'en', 'pt'],
  
  MESSAGES: {
    es: {
      search: {
        placeholder: 'Buscar hojas de trabajo, juegos y más...',
        noResults: 'No se encontraron resultados',
        searching: 'Buscando...',
        minChars: 'Ingresa al menos {min} caracteres'
      },
      navigation: {
        subjects: 'Materias',
        grades: 'Grados',
        worksheets: 'Hojas de Trabajo',
        games: 'Juegos',
        create: 'Crear Hoja',
        resources: 'Más Recursos'
      },
      auth: {
        login: 'Iniciar Sesión',
        signup: 'Registrarse',
        logout: 'Cerrar Sesión',
        welcome: 'Bienvenido'
      },
      messages: {
        loading: 'Cargando...',
        error: 'Ha ocurrido un error',
        success: 'Operación exitosa',
        required: 'Este campo es obligatorio',
        invalidEmail: 'Ingresa un email válido',
        passwordTooShort: 'La contraseña debe tener al menos 6 caracteres'
      }
    }
  }
};

// Función para obtener mensajes localizados
export const getMessage = (key, lang = LOCALIZATION.DEFAULT_LANG, params = {}) => {
  const keys = key.split('.');
  let value = LOCALIZATION.MESSAGES[lang];
  
  for (const k of keys) {
    if (value && value.hasOwnProperty(k)) {
      value = value[k];
    } else {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
  }
  
  // Reemplazar parámetros si existen
  if (typeof value === 'string' && Object.keys(params).length > 0) {
    Object.entries(params).forEach(([param, val]) => {
      value = value.replace(new RegExp(`\\{${param}\\}`, 'g'), val);
    });
  }
  
  return value;
};

// Detectar si estamos en desarrollo
export const isDevelopment = () => import.meta.env.DEV;
export const isProduction = () => import.meta.env.PROD;