// src/utils/constants.js
// Constantes para el sistema educativo chileno

// ========================================
// NIVELES EDUCATIVOS
// ========================================
export const NIVELES = [
  // Educación Básica
  { value: '1-basico', label: '1° Básico', orden: 1, ciclo: 'basica' },
  { value: '2-basico', label: '2° Básico', orden: 2, ciclo: 'basica' },
  { value: '3-basico', label: '3° Básico', orden: 3, ciclo: 'basica' },
  { value: '4-basico', label: '4° Básico', orden: 4, ciclo: 'basica' },
  { value: '5-basico', label: '5° Básico', orden: 5, ciclo: 'basica' },
  { value: '6-basico', label: '6° Básico', orden: 6, ciclo: 'basica' },
  { value: '7-basico', label: '7° Básico', orden: 7, ciclo: 'basica' },
  { value: '8-basico', label: '8° Básico', orden: 8, ciclo: 'basica' },

  // Educación Media
  { value: '1-medio', label: '1° Medio', orden: 9, ciclo: 'media' },
  { value: '2-medio', label: '2° Medio', orden: 10, ciclo: 'media' },
  { value: '3-medio', label: '3° Medio', orden: 11, ciclo: 'media' },
  { value: '4-medio', label: '4° Medio', orden: 12, ciclo: 'media' }
];

// ========================================
// ASIGNATURAS
// ========================================
export const ASIGNATURAS = [
  {
    value: 'lenguaje',
    label: 'Lenguaje y Comunicación',
    labelCorto: 'Lenguaje',
    color: '#3B82F6',
    colorClasses: 'bg-blue-100 text-blue-700 border-blue-200',
    gradientClasses: 'from-blue-400 to-blue-600',
    icon: '📚',
    descripcion: 'Comprensión lectora, escritura y comunicación oral'
  },
  {
    value: 'matematica',
    label: 'Matemática',
    labelCorto: 'Matemática',
    color: '#10B981',
    colorClasses: 'bg-green-100 text-green-700 border-green-200',
    gradientClasses: 'from-green-400 to-green-600',
    icon: '🔢',
    descripcion: 'Números, operaciones, geometría y datos'
  },
  {
    value: 'ciencias',
    label: 'Ciencias Naturales',
    labelCorto: 'Ciencias',
    color: '#8B5CF6',
    colorClasses: 'bg-purple-100 text-purple-700 border-purple-200',
    gradientClasses: 'from-purple-400 to-purple-600',
    icon: '🔬',
    descripcion: 'Biología, química, física y ciencias de la Tierra'
  },
  {
    value: 'historia',
    label: 'Historia, Geografía y Ciencias Sociales',
    labelCorto: 'Historia',
    color: '#F59E0B',
    colorClasses: 'bg-amber-100 text-amber-700 border-amber-200',
    gradientClasses: 'from-amber-400 to-amber-600',
    icon: '🌍',
    descripcion: 'Historia, geografía, formación ciudadana'
  },
  {
    value: 'ingles',
    label: 'Inglés',
    labelCorto: 'Inglés',
    color: '#EF4444',
    colorClasses: 'bg-red-100 text-red-700 border-red-200',
    gradientClasses: 'from-red-400 to-red-600',
    icon: '🇬🇧',
    descripcion: 'Inglés como lengua extranjera'
  },
  {
    value: 'otra',
    label: 'Otra',
    labelCorto: 'Otra',
    color: '#6B7280',
    colorClasses: 'bg-gray-100 text-gray-700 border-gray-200',
    gradientClasses: 'from-gray-400 to-gray-600',
    icon: '📖',
    descripcion: 'Otras asignaturas del currículum'
  }
];

// ========================================
// TEXTOS ESCOLARES
// ========================================
export const TEXTOS_ESCOLARES = [
  { value: 'santillana', label: 'Santillana', descripcion: 'Editorial Santillana' },
  { value: 'sm', label: 'SM', descripcion: 'Editorial SM' },
  { value: 'cal-y-canto', label: 'Cal y Canto', descripcion: 'Editorial Cal y Canto' },
  { value: 'mineduc', label: 'MINEDUC', descripcion: 'Textos del Ministerio de Educación' },
  { value: 'otro', label: 'Otro', descripcion: 'Otra editorial' },
  { value: 'ninguno', label: 'Ninguno', descripcion: 'No asociado a texto escolar' }
];

// ========================================
// TIPOS DE ACTIVIDAD
// ========================================
export const TIPOS_ACTIVIDAD = [
  {
    value: 'guia',
    label: 'Guía de Aprendizaje',
    labelCorto: 'Guía',
    icon: '📝',
    color: '#3B82F6',
    descripcion: 'Guía práctica para desarrollar contenidos'
  },
  {
    value: 'evaluacion',
    label: 'Evaluación',
    labelCorto: 'Evaluación',
    icon: '📊',
    color: '#EF4444',
    descripcion: 'Prueba o evaluación de conocimientos'
  },
  {
    value: 'taller',
    label: 'Taller',
    labelCorto: 'Taller',
    icon: '🛠️',
    color: '#10B981',
    descripcion: 'Actividad práctica o taller grupal'
  },
  {
    value: 'juego',
    label: 'Juego Educativo',
    labelCorto: 'Juego',
    icon: '🎮',
    color: '#F59E0B',
    descripcion: 'Juego o actividad lúdica de aprendizaje'
  },
  {
    value: 'lectura',
    label: 'Lectura',
    labelCorto: 'Lectura',
    icon: '📖',
    color: '#8B5CF6',
    descripcion: 'Texto de lectura comprensiva'
  },
  {
    value: 'reforzamiento',
    label: 'Reforzamiento',
    labelCorto: 'Refuerzo',
    icon: '💪',
    color: '#06B6D4',
    descripcion: 'Material de reforzamiento de contenidos'
  }
];

// ========================================
// DIFICULTADES
// ========================================
export const DIFICULTADES = [
  { value: 'basico', label: 'Básico', color: '#10B981' },
  { value: 'intermedio', label: 'Intermedio', color: '#F59E0B' },
  { value: 'avanzado', label: 'Avanzado', color: '#EF4444' }
];

// ========================================
// EJES CURRICULARES POR ASIGNATURA
// ========================================
export const EJES_CURRICULARES = {
  lenguaje: [
    'Lectura',
    'Escritura',
    'Comunicación Oral'
  ],
  matematica: [
    'Números y Operaciones',
    'Patrones y Álgebra',
    'Geometría',
    'Medición',
    'Datos y Probabilidades'
  ],
  ciencias: [
    'Ciencias de la Vida',
    'Ciencias Físicas y Químicas',
    'Ciencias de la Tierra y el Universo'
  ],
  historia: [
    'Historia',
    'Geografía',
    'Formación Ciudadana'
  ],
  ingles: [
    'Comprensión Auditiva',
    'Comprensión Lectora',
    'Expresión Oral',
    'Expresión Escrita'
  ],
  otra: ['General']
};

// ========================================
// FUNCIONES HELPER
// ========================================

/**
 * Obtener información de un nivel por su value
 */
export const getNivelByValue = (value) => {
  return NIVELES.find(nivel => nivel.value === value);
};

/**
 * Obtener información de una asignatura por su value
 */
export const getAsignaturaByValue = (value) => {
  return ASIGNATURAS.find(asignatura => asignatura.value === value);
};

/**
 * Obtener texto escolar por su value
 */
export const getTextoEscolarByValue = (value) => {
  return TEXTOS_ESCOLARES.find(texto => texto.value === value);
};

/**
 * Obtener tipo de actividad por su value
 */
export const getTipoActividadByValue = (value) => {
  return TIPOS_ACTIVIDAD.find(tipo => tipo.value === value);
};

/**
 * Obtener ejes curriculares por nivel y asignatura
 */
export const getEjesPorAsignatura = (asignatura) => {
  return EJES_CURRICULARES[asignatura] || EJES_CURRICULARES.otra;
};

/**
 * Obtener objetivos de aprendizaje por nivel y asignatura
 * Esta función puede ser expandida para incluir OAs específicos del MINEDUC
 */
export const getOAsPorNivelAsignatura = (nivel, asignatura) => {
  // Por ahora retorna un array vacío
  // En el futuro se puede cargar desde una base de datos o archivo JSON
  // con todos los Objetivos de Aprendizaje del currículum nacional

  const nivelInfo = getNivelByValue(nivel);
  const asignaturaInfo = getAsignaturaByValue(asignatura);

  if (!nivelInfo || !asignaturaInfo) {
    return [];
  }

  // Placeholder - aquí se cargarían los OAs reales del MINEDUC
  return [
    {
      codigo: `OA-${asignatura}-${nivel}-01`,
      descripcion: `Objetivo de Aprendizaje 1 para ${asignaturaInfo.label} - ${nivelInfo.label}`,
      eje: getEjesPorAsignatura(asignatura)[0]
    },
    {
      codigo: `OA-${asignatura}-${nivel}-02`,
      descripcion: `Objetivo de Aprendizaje 2 para ${asignaturaInfo.label} - ${nivelInfo.label}`,
      eje: getEjesPorAsignatura(asignatura)[0]
    }
  ];
};

/**
 * Filtrar niveles por ciclo
 */
export const getNivelesPorCiclo = (ciclo) => {
  return NIVELES.filter(nivel => nivel.ciclo === ciclo);
};

/**
 * Obtener label formateado de nivel + asignatura
 */
export const getFormatLabel = (nivel, asignatura) => {
  const nivelInfo = getNivelByValue(nivel);
  const asignaturaInfo = getAsignaturaByValue(asignatura);

  if (!nivelInfo || !asignaturaInfo) {
    return '';
  }

  return `${nivelInfo.label} - ${asignaturaInfo.labelCorto}`;
};

/**
 * Validar si un nivel es válido
 */
export const isValidNivel = (nivel) => {
  return NIVELES.some(n => n.value === nivel);
};

/**
 * Validar si una asignatura es válida
 */
export const isValidAsignatura = (asignatura) => {
  return ASIGNATURAS.some(a => a.value === asignatura);
};

// ========================================
// EXPORTS DEFAULT
// ========================================
export default {
  NIVELES,
  ASIGNATURAS,
  TEXTOS_ESCOLARES,
  TIPOS_ACTIVIDAD,
  DIFICULTADES,
  EJES_CURRICULARES,
  getNivelByValue,
  getAsignaturaByValue,
  getTextoEscolarByValue,
  getTipoActividadByValue,
  getEjesPorAsignatura,
  getOAsPorNivelAsignatura,
  getNivelesPorCiclo,
  getFormatLabel,
  isValidNivel,
  isValidAsignatura
};
