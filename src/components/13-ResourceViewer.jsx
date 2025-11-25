import React, { useState } from 'react';
import { Filter, BookOpen, GraduationCap, FileText } from 'lucide-react';
import FilterSidebar from './FilterSidebar';

const ResourceViewer = ({ viewMode = 'fichas', initialFilter = null }) => {
  const [selectedCategory, setSelectedCategory] = useState(initialFilter || 'Todas');
  const [selectedGrade, setSelectedGrade] = useState('Todos');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({});
  const [sortBy, setSortBy] = useState('popular');
  const [searchQuery, setSearchQuery] = useState('');

  // Actualizar el filtro cuando cambia initialFilter
  React.useEffect(() => {
    if (initialFilter) {
      setSelectedCategory(initialFilter);
    }
  }, [initialFilter]);

  // Configuración según el modo de vista
  const viewConfig = {
    asignaturas: {
      title: 'Asignaturas Disponibles',
      subtitle: 'Descubre fichas de trabajo organizadas por asignatura. Cada materia cuenta con cursos especializados y recursos educativos.',
      icon: BookOpen,
      iconBg: 'bg-blue-100 text-blue-700',
      gradientFrom: 'from-slate-50 via-blue-50',
      gradientTo: 'to-indigo-50'
    },
    cursos: {
      title: 'Cursos Educativos',
      subtitle: 'Programas completos con fichas de trabajo organizadas por lecciones. Aprende a tu propio ritmo con guía profesional.',
      icon: GraduationCap,
      iconBg: 'bg-purple-100 text-purple-700',
      gradientFrom: 'from-slate-50 via-purple-50',
      gradientTo: 'to-pink-50'
    },
    fichas: {
      title: 'Biblioteca de Fichas de Trabajo',
      subtitle: 'Descubre miles de fichas organizadas por asignatura y nivel. Perfectas para complementar tus clases y motivar a tus estudiantes.',
      icon: FileText,
      iconBg: 'bg-violet-100 text-violet-700',
      gradientFrom: 'from-slate-50 via-blue-50',
      gradientTo: 'to-indigo-50'
    }
  };

  const config = viewConfig[viewMode] || viewConfig.fichas;
  const Icon = config.icon;

  // Categorías/Asignaturas
  const categories = [
    { name: 'Todas', icon: '📚', color: 'violet' },
    { name: 'Matemáticas', icon: '🔢', color: 'violet' },
    { name: 'Ciencias', icon: '🔬', color: 'blue' },
    { name: 'Lenguaje', icon: '📖', color: 'pink' },
    { name: 'Geografía', icon: '🌍', color: 'green' },
    { name: 'Historia', icon: '⏰', color: 'indigo' },
    { name: 'Arte', icon: '🎨', color: 'orange' }
  ];

  const grades = ['Todos', '1° Grado', '2° Grado', '3° Grado', '4° Grado', '5° Grado', '6° Grado'];

  // Datos de fichas (en producción vendrían de la BD)
  const fichas = [
    {
      id: 1,
      title: 'Suma y Resta Básica',
      subject: 'Matemáticas',
      grade: '2° Grado',
      icon: '🔢',
      color: 'violet',
      description: 'Practica operaciones básicas con números del 1 al 100',
      exercises: 15,
      rating: 4.5,
      difficulty: 'Básico',
      duration: '20 min',
      badge: 'Nuevo',
      downloads: 1250,
      type: 'worksheet'
    },
    {
      id: 2,
      title: 'El Sistema Solar',
      subject: 'Ciencias',
      grade: '3° Grado',
      icon: '🔬',
      color: 'blue',
      description: 'Descubre los planetas y sus características principales',
      exercises: 20,
      rating: 4.8,
      difficulty: 'Intermedio',
      duration: '30 min',
      downloads: 2100,
      type: 'worksheet'
    },
    {
      id: 3,
      title: 'Vocabulario Avanzado',
      subject: 'Lenguaje',
      grade: '4° Grado',
      icon: '📚',
      color: 'pink',
      description: 'Amplía tu vocabulario con palabras nuevas y útiles',
      exercises: 25,
      rating: 4.9,
      difficulty: 'Avanzado',
      duration: '25 min',
      badge: 'Popular',
      downloads: 3450,
      type: 'worksheet'
    },
    {
      id: 4,
      title: 'Capitales del Mundo',
      subject: 'Geografía',
      grade: '5° Grado',
      icon: '🌍',
      color: 'green',
      description: 'Aprende las capitales de los países más importantes',
      exercises: 30,
      rating: 4.7,
      difficulty: 'Intermedio',
      duration: '35 min',
      downloads: 1890,
      type: 'worksheet'
    },
    {
      id: 5,
      title: 'Historia del Arte',
      subject: 'Arte',
      grade: '6° Grado',
      icon: '🎨',
      color: 'orange',
      description: 'Conoce los movimientos artísticos más importantes',
      exercises: 18,
      rating: 4.6,
      difficulty: 'Intermedio',
      duration: '40 min',
      downloads: 1670,
      type: 'worksheet'
    },
    {
      id: 6,
      title: 'Historia Universal',
      subject: 'Historia',
      grade: '5° Grado',
      icon: '⏰',
      color: 'indigo',
      description: 'Explora los eventos más importantes de la historia',
      exercises: 22,
      rating: 4.8,
      difficulty: 'Avanzado',
      duration: '45 min',
      downloads: 2340,
      type: 'worksheet'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      violet: 'from-violet-400 to-purple-500 text-violet-600 bg-violet-100 border-violet-200',
      blue: 'from-blue-400 to-cyan-500 text-blue-600 bg-blue-100 border-blue-200',
      pink: 'from-pink-400 to-rose-500 text-pink-600 bg-pink-100 border-pink-200',
      green: 'from-green-400 to-emerald-500 text-green-600 bg-green-100 border-green-200',
      orange: 'from-orange-400 to-amber-500 text-orange-600 bg-orange-100 border-orange-200',
      indigo: 'from-indigo-400 to-blue-500 text-indigo-600 bg-indigo-100 border-indigo-200'
    };
    return colors[color] || colors.violet;
  };

  const handleFilterChange = (section, item) => {
    if (section === 'clearAll') {
      setActiveFilters({});
      return;
    }

    setActiveFilters(prev => {
      const currentFilters = prev[section] || [];
      const isActive = currentFilters.includes(item);

      return {
        ...prev,
        [section]: isActive
          ? currentFilters.filter(f => f !== item)
          : [...currentFilters, item]
      };
    });
  };

  // Filtrado de fichas
  const filteredFichas = fichas.filter(ficha => {
    const categoryMatch = selectedCategory === 'Todas' || ficha.subject === selectedCategory;
    const gradeMatch = selectedGrade === 'Todos' || ficha.grade === selectedGrade;
    const searchMatch = searchQuery === '' ||
      ficha.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ficha.description.toLowerCase().includes(searchQuery.toLowerCase());

    return categoryMatch && gradeMatch && searchMatch;
  });

  // Ordenamiento
  const sortedFichas = [...filteredFichas].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.downloads - a.downloads;
      case 'rating':
        return b.rating - a.rating;
      case 'recent':
        return b.id - a.id;
      default:
        return 0;
    }
  });

  return (
    <div id="resource-viewer" className={`relative min-h-screen bg-gradient-to-br ${config.gradientFrom} ${config.gradientTo} py-12 px-4 sm:px-6 lg:px-8`}>
      {/* Contenedor principal con sidebar */}
      <div className="flex gap-6 max-w-[1600px] mx-auto">
        {/* Sidebar de Filtros */}
        <FilterSidebar
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          activeFilters={activeFilters}
          onFilterChange={handleFilterChange}
        />

        {/* Contenido Principal */}
        <div className="flex-1 min-w-0">
          {/* Encabezado */}
          <div className="text-center mb-10">
            <div className={`inline-flex items-center gap-2 ${config.iconBg} px-4 py-2 rounded-full text-sm font-semibold mb-4`}>
              <Icon className="w-4 h-4" />
              <span>{viewMode === 'asignaturas' ? 'Explora por Asignaturas' : viewMode === 'cursos' ? 'Cursos Estructurados' : 'Recursos para Profesores'}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              {config.title}
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-6">
              {config.subtitle}
            </p>

            {/* Estadísticas destacadas */}
            <div className="flex flex-wrap justify-center gap-6 mt-8">
              <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-xl shadow-sm">
                <span className="text-2xl">📄</span>
                <div className="text-left">
                  <div className="text-2xl font-bold text-gray-900">38,000+</div>
                  <div className="text-xs text-gray-600">Fichas disponibles</div>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-xl shadow-sm">
                <span className="text-2xl">🎯</span>
                <div className="text-left">
                  <div className="text-2xl font-bold text-gray-900">15</div>
                  <div className="text-xs text-gray-600">Asignaturas</div>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-xl shadow-sm">
                <span className="text-2xl">⭐</span>
                <div className="text-left">
                  <div className="text-2xl font-bold text-gray-900">4.8</div>
                  <div className="text-xs text-gray-600">Valoración media</div>
                </div>
              </div>
            </div>
          </div>

          {/* Filtros por Asignatura */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>🎯</span>
              <span>Explora por Asignatura</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`p-4 rounded-xl font-semibold transition-all duration-200 border-2 ${
                    selectedCategory === category.name
                      ? 'bg-violet-600 text-white border-violet-600 shadow-lg scale-105'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-violet-300 hover:shadow-md'
                  }`}
                >
                  <div className="text-3xl mb-2">{category.icon}</div>
                  <div className="text-xs sm:text-sm">{category.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Filtros adicionales */}
          <div className="mb-8 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Filtro por nivel */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  📚 Nivel Escolar
                </label>
                <select
                  value={selectedGrade}
                  onChange={(e) => setSelectedGrade(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-violet-400 transition-all duration-200 font-medium"
                >
                  {grades.map((grade) => (
                    <option key={grade} value={grade}>{grade}</option>
                  ))}
                </select>
              </div>

              {/* Ordenar por */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  🔄 Ordenar por
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-violet-400 transition-all duration-200 font-medium"
                >
                  <option value="popular">Más populares</option>
                  <option value="rating">Mejor valoradas</option>
                  <option value="recent">Más recientes</option>
                </select>
              </div>

              {/* Búsqueda */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  🔍 Buscar fichas
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Escribe un tema..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 pl-10 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-violet-400 transition-all duration-200"
                  />
                  <svg className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Grid de fichas */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                {selectedCategory === 'Todas' ? 'Todas las Fichas' : `Fichas de ${selectedCategory}`}
              </h3>
              <span className="text-sm text-gray-600 bg-white px-4 py-2 rounded-lg border border-gray-200">
                {sortedFichas.length} resultados
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedFichas.map((ficha) => (
                <div
                  key={ficha.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer border-2 border-gray-100 hover:border-violet-300"
                >
                  {/* Encabezado de la tarjeta */}
                  <div className={`h-40 bg-gradient-to-br ${getColorClasses(ficha.color).split(' ')[0]} ${getColorClasses(ficha.color).split(' ')[1]} relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-all duration-300"></div>

                    {/* Badge */}
                    {ficha.badge && (
                      <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-700 shadow-lg">
                        {ficha.badge}
                      </div>
                    )}

                    {/* Icono grande centrado */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-7xl opacity-90 group-hover:scale-110 transition-transform duration-300">
                        {ficha.icon}
                      </div>
                    </div>

                    {/* Nivel */}
                    <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700">
                      {ficha.grade}
                    </div>
                  </div>

                  {/* Contenido de la tarjeta */}
                  <div className="p-6">
                    {/* Asignatura y dificultad */}
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-xs font-bold px-3 py-1 rounded-lg ${getColorClasses(ficha.color).split(' ')[2]} ${getColorClasses(ficha.color).split(' ')[3]}`}>
                        {ficha.subject.toUpperCase()}
                      </span>
                      <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-lg">
                        {ficha.difficulty}
                      </span>
                    </div>

                    {/* Título */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-violet-600 transition-colors duration-200">
                      {ficha.title}
                    </h3>

                    {/* Descripción */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {ficha.description}
                    </p>

                    {/* Metadatos */}
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{ficha.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span>{ficha.exercises} ejercicios</span>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-1 text-yellow-500">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-sm font-bold text-gray-700">{ficha.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        <span className="text-xs">{ficha.downloads.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Botón flotante para abrir filtros en móvil */}
          <button
            onClick={() => setIsFilterOpen(true)}
            className="md:hidden fixed bottom-6 right-6 bg-violet-600 text-white p-4 rounded-full shadow-lg hover:bg-violet-700 transition-colors z-30"
          >
            <Filter className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResourceViewer;
