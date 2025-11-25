import React, { useState } from 'react';
import { GraduationCap, Clock, Users, Star, Filter, Search } from 'lucide-react';
import FilterSidebar from './FilterSidebar';

const Courses = () => {
  const [selectedLevel, setSelectedLevel] = useState('Todos');
  const [selectedSubject, setSelectedSubject] = useState('Todas');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({});

  const levels = ['Todos', 'Básico', 'Intermedio', 'Avanzado'];
  const subjects = ['Todas', 'Matemáticas', 'Ciencias', 'Lenguaje', 'Estudios Sociales'];

  const courses = [
    {
      id: 1,
      title: 'Introducción a las Matemáticas',
      subject: 'Matemáticas',
      level: 'Básico',
      icon: '🔢',
      color: 'blue',
      description: 'Aprende los fundamentos de las matemáticas con ejercicios prácticos',
      students: 1250,
      rating: 4.8,
      duration: '8 semanas',
      lessons: 32,
      worksheets: 120,
      price: 'Gratis',
      instructor: 'Prof. María González',
      badge: 'Popular'
    },
    {
      id: 2,
      title: 'Ciencias Naturales',
      subject: 'Ciencias',
      level: 'Intermedio',
      icon: '🔬',
      color: 'green',
      description: 'Explora el mundo natural a través de experimentos y observaciones',
      students: 890,
      rating: 4.6,
      duration: '10 semanas',
      lessons: 40,
      worksheets: 95,
      price: 'Gratis',
      instructor: 'Prof. Carlos Ruiz',
      badge: 'Nuevo'
    },
    {
      id: 3,
      title: 'Comprensión Lectora Avanzada',
      subject: 'Lenguaje',
      level: 'Avanzado',
      icon: '📖',
      color: 'purple',
      description: 'Mejora tus habilidades de lectura y análisis de textos complejos',
      students: 670,
      rating: 4.9,
      duration: '12 semanas',
      lessons: 48,
      worksheets: 85,
      price: 'Gratis',
      instructor: 'Prof. Ana Martínez',
      badge: 'Destacado'
    },
    {
      id: 4,
      title: 'Historia Universal',
      subject: 'Estudios Sociales',
      level: 'Intermedio',
      icon: '🌍',
      color: 'orange',
      description: 'Viaja a través del tiempo y descubre las grandes civilizaciones',
      students: 540,
      rating: 4.7,
      duration: '9 semanas',
      lessons: 36,
      worksheets: 75,
      price: 'Gratis',
      instructor: 'Prof. Roberto Silva',
      badge: null
    },
    {
      id: 5,
      title: 'Álgebra para Principiantes',
      subject: 'Matemáticas',
      level: 'Básico',
      icon: '➗',
      color: 'blue',
      description: 'Domina los conceptos básicos del álgebra paso a paso',
      students: 980,
      rating: 4.5,
      duration: '6 semanas',
      lessons: 24,
      worksheets: 110,
      price: 'Gratis',
      instructor: 'Prof. Luis Fernández',
      badge: 'Popular'
    },
    {
      id: 6,
      title: 'Geografía del Mundo',
      subject: 'Estudios Sociales',
      level: 'Básico',
      icon: '🗺️',
      color: 'orange',
      description: 'Conoce los continentes, países y características geográficas',
      students: 720,
      rating: 4.6,
      duration: '7 semanas',
      lessons: 28,
      worksheets: 65,
      price: 'Gratis',
      instructor: 'Prof. Diana López',
      badge: null
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'from-blue-500 to-cyan-600',
      green: 'from-green-500 to-emerald-600',
      purple: 'from-purple-500 to-pink-600',
      orange: 'from-orange-500 to-red-600'
    };
    return colors[color] || colors.blue;
  };

  const getBadgeColor = (badge) => {
    if (badge === 'Popular') return 'bg-blue-100 text-blue-700';
    if (badge === 'Nuevo') return 'bg-green-100 text-green-700';
    if (badge === 'Destacado') return 'bg-purple-100 text-purple-700';
    return '';
  };

  const filteredCourses = courses.filter(course => {
    const levelMatch = selectedLevel === 'Todos' || course.level === selectedLevel;
    const subjectMatch = selectedSubject === 'Todas' || course.subject === selectedSubject;
    return levelMatch && subjectMatch;
  });

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

  return (
    <div id="courses" className="relative min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex gap-6 max-w-[1600px] mx-auto">
        <FilterSidebar
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          activeFilters={activeFilters}
          onFilterChange={handleFilterChange}
        />

        <div className="flex-1 min-w-0">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <GraduationCap className="w-4 h-4" />
            <span>Cursos Estructurados</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Cursos Educativos
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Programas completos con fichas de trabajo organizadas por lecciones. Aprende a tu propio ritmo con guía profesional.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-bold text-gray-900">Filtros</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Level Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Nivel</label>
              <div className="flex flex-wrap gap-2">
                {levels.map((level) => (
                  <button
                    key={level}
                    onClick={() => setSelectedLevel(level)}
                    className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 ${
                      selectedLevel === level
                        ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Subject Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Asignatura</label>
              <div className="flex flex-wrap gap-2">
                {subjects.map((subject) => (
                  <button
                    key={subject}
                    onClick={() => setSelectedSubject(subject)}
                    className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 ${
                      selectedSubject === subject
                        ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {subject}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
            <p className="text-gray-600 text-sm">Cursos Totales</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">145</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
            <p className="text-gray-600 text-sm">Estudiantes</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">15,420</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
            <p className="text-gray-600 text-sm">Fichas Incluidas</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">2,850</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
            <p className="text-gray-600 text-sm">Valoración Promedio</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">4.7 ⭐</p>
          </div>
        </div>

        {/* Course Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${getColorClasses(course.color)} rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-2xl">{course.icon}</span>
                  </div>
                  {course.badge && (
                    <span className={`${getBadgeColor(course.badge)} px-3 py-1 rounded-full text-xs font-bold`}>
                      {course.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-violet-700 transition-colors duration-300">
                  {course.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4">
                  {course.description}
                </p>

                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                  <span className="font-medium">{course.instructor}</span>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{course.students.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm text-gray-600">{course.rating}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Lecciones</span>
                    <span className="text-lg font-bold text-gray-900">{course.lessons}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Fichas</span>
                    <span className="text-lg font-bold text-gray-900">{course.worksheets}</span>
                  </div>
                  <button className={`px-6 py-3 bg-gradient-to-r ${getColorClasses(course.color)} text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300`}>
                    Comenzar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No se encontraron cursos</h3>
            <p className="text-gray-600">Intenta ajustar los filtros para ver más resultados</p>
          </div>
        )}

        <button
          onClick={() => setIsFilterOpen(true)}
          className="md:hidden fixed bottom-6 right-6 bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 transition-colors z-30"
        >
          <Filter className="w-6 h-6" />
        </button>

        </div>
      </div>
    </div>
  );
};

export default Courses;
