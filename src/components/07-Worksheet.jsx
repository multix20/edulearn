import React, { useState } from 'react';

const Worksheet = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [selectedGrade, setSelectedGrade] = useState('Todos');

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
      downloads: 1250
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
      downloads: 2100
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
      downloads: 3450
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
      downloads: 1890
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
      downloads: 1670
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
      downloads: 2340
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

  return (
    <div id="worksheet" className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Contenedor principal */}
      <div className="max-w-7xl mx-auto">

        {/* Encabezado mejorado para profesores */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <span>👨‍🏫</span>
            <span>Recursos para Profesores</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Biblioteca de Fichas de Trabajo
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            Descubre miles de fichas organizadas por asignatura y nivel. Perfectas para complementar tus clases y motivar a tus estudiantes.
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

        {/* Filtros por Asignatura - Destacado */}
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
              <select className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-violet-400 transition-all duration-200 font-medium">
                <option>Más populares</option>
                <option>Mejor valoradas</option>
                <option>Más recientes</option>
                <option>Más descargadas</option>
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
                  className="w-full px-4 py-3 pl-10 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-violet-400 transition-all duration-200"
                />
                <svg className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Grid de fichas mejorado */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">
              {selectedCategory === 'Todas' ? 'Todas las Fichas' : `Fichas de ${selectedCategory}`}
            </h3>
            <span className="text-sm text-gray-600 bg-white px-4 py-2 rounded-lg border border-gray-200">
              {fichas.length} resultados
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {fichas.map((ficha) => (
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

        {/* Sección de progreso mejorada */}
        <div className="mt-12 bg-gradient-to-br from-violet-600 to-purple-600 rounded-3xl shadow-2xl p-8 text-white">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Tu Impacto Educativo</h2>
              <p className="text-violet-100">Estadísticas de uso de tus fichas este mes</p>
            </div>
            <button className="bg-white text-violet-600 px-6 py-3 rounded-xl font-semibold hover:bg-violet-50 transition-all duration-200 shadow-lg">
              Ver Detalles
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">📥</span>
                </div>
                <div>
                  <div className="text-3xl font-bold">1,250</div>
                  <div className="text-sm text-violet-100">Descargas</div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">👥</span>
                </div>
                <div>
                  <div className="text-3xl font-bold">342</div>
                  <div className="text-sm text-violet-100">Estudiantes</div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">⭐</span>
                </div>
                <div>
                  <div className="text-3xl font-bold">4.8</div>
                  <div className="text-sm text-violet-100">Valoración</div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">📊</span>
                </div>
                <div>
                  <div className="text-3xl font-bold">89%</div>
                  <div className="text-sm text-violet-100">Completadas</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Worksheet;
