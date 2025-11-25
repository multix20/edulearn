import React, { useState } from 'react';
import { Filter, BookOpen, GraduationCap, FileText, ChevronRight, Home, X } from 'lucide-react';
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
    } else {
      // Si initialFilter es null, resetear a 'Todas'
      setSelectedCategory('Todas');
    }
  }, [initialFilter]);

  // Resetear filtros cuando cambia el viewMode
  React.useEffect(() => {
    if (!initialFilter) {
      setSelectedCategory('Todas');
      setSelectedGrade('Todos');
      setSearchQuery('');
    }
  }, [viewMode, initialFilter]);

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
    <div id="resource-viewer" className="relative min-h-screen bg-white py-6 px-4 sm:px-6 lg:px-8">
      {/* Contenedor principal con sidebar */}
      <div className="flex gap-6 max-w-[1600px] mx-auto">
        {/* Sidebar de Filtros - Siempre visible en desktop */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <FilterSidebar
            isOpen={true}
            onClose={() => {}}
            activeFilters={activeFilters}
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* Sidebar móvil */}
        <FilterSidebar
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          activeFilters={activeFilters}
          onFilterChange={handleFilterChange}
        />

        {/* Contenido Principal */}
        <div className="flex-1 min-w-0">
          {/* Header estilo education.com */}
          <div className="mb-6">
            {/* Título principal */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {selectedGrade !== 'Todos' && selectedCategory !== 'Todas'
                ? `${selectedGrade} ${selectedCategory} Worksheets`
                : selectedCategory !== 'Todas'
                ? `${selectedCategory} Worksheets`
                : selectedGrade !== 'Todos'
                ? `${selectedGrade} Worksheets`
                : 'All Worksheets'}
            </h1>

            {/* Pills de filtros activos + Sort by */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 flex-wrap">
                {selectedCategory !== 'Todas' && (
                  <button
                    onClick={() => setSelectedCategory('Todas')}
                    className="flex items-center gap-2 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors"
                  >
                    {selectedCategory}
                    <X className="w-4 h-4" />
                  </button>
                )}
                {selectedGrade !== 'Todos' && (
                  <button
                    onClick={() => setSelectedGrade('Todos')}
                    className="flex items-center gap-2 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors"
                  >
                    {selectedGrade}
                    <X className="w-4 h-4" />
                  </button>
                )}
                {(selectedCategory !== 'Todas' || selectedGrade !== 'Todos') && (
                  <button
                    onClick={() => {
                      setSelectedCategory('Todas');
                      setSelectedGrade('Todos');
                    }}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Sort by */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:border-blue-500"
                >
                  <option value="popular">Most popular</option>
                  <option value="rating">Highest rated</option>
                  <option value="recent">Most recent</option>
                </select>
              </div>
            </div>
          </div>


          {/* Grid de fichas */}
          <div className="mb-8">

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {sortedFichas.map((ficha) => (
                <div
                  key={ficha.id}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition-all duration-200 overflow-hidden cursor-pointer border border-gray-200 hover:border-blue-400"
                >
                  {/* Thumbnail */}
                  <div className={`h-48 bg-gradient-to-br ${getColorClasses(ficha.color).split(' ')[0]} ${getColorClasses(ficha.color).split(' ')[1]} relative overflow-hidden`}>
                    {/* Icono grande centrado */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-6xl opacity-90">
                        {ficha.icon}
                      </div>
                    </div>

                    {/* Badge */}
                    {ficha.badge && (
                      <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded text-xs font-bold">
                        {ficha.badge}
                      </div>
                    )}
                  </div>

                  {/* Contenido */}
                  <div className="p-3">
                    <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2 hover:text-blue-600">
                      {ficha.title}
                    </h3>
                    <p className="text-xs text-gray-500 mb-2">Worksheet</p>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-xs font-semibold text-gray-700">{ficha.rating}</span>
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
