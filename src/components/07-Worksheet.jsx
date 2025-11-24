import React from 'react';

const Worksheet = () => {
  return (
    <div id="worksheet" className="relative min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Contenedor principal */}
      <div className="max-w-7xl mx-auto">
        {/* Encabezado */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Mis Hojas de Trabajo
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Explora y completa ejercicios interactivos para mejorar tus habilidades
          </p>
        </div>

        {/* Filtros y búsqueda */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex gap-2 flex-wrap">
            <button className="px-4 py-2 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700 transition-all duration-200">
              Todas
            </button>
            <button className="px-4 py-2 bg-white text-gray-700 rounded-xl font-medium hover:bg-gray-100 transition-all duration-200 border border-gray-200">
              Matemáticas
            </button>
            <button className="px-4 py-2 bg-white text-gray-700 rounded-xl font-medium hover:bg-gray-100 transition-all duration-200 border border-gray-200">
              Ciencias
            </button>
            <button className="px-4 py-2 bg-white text-gray-700 rounded-xl font-medium hover:bg-gray-100 transition-all duration-200 border border-gray-200">
              Lenguaje
            </button>
          </div>
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Buscar hojas..."
              className="w-full px-4 py-2 pl-10 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-violet-400 transition-all duration-200"
            />
            <svg className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Grid de hojas de trabajo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Tarjeta de hoja de trabajo 1 */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer border border-gray-100">
            <div className="h-32 bg-gradient-to-br from-violet-400 to-purple-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-all duration-300"></div>
              <div className="absolute bottom-3 right-3 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs font-medium">
                Nuevo
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🔢</span>
                <span className="text-xs font-semibold text-violet-600 bg-violet-100 px-2 py-1 rounded-lg">
                  MATEMÁTICAS
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-violet-600 transition-colors duration-200">
                Suma y Resta Básica
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Practica operaciones básicas con números del 1 al 100
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-yellow-500">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-xs font-medium text-gray-700">4.5</span>
                </div>
                <span className="text-xs text-gray-500">15 ejercicios</span>
              </div>
            </div>
          </div>

          {/* Tarjeta de hoja de trabajo 2 */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer border border-gray-100">
            <div className="h-32 bg-gradient-to-br from-blue-400 to-cyan-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-all duration-300"></div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🔬</span>
                <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-lg">
                  CIENCIAS
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                El Sistema Solar
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Descubre los planetas y sus características principales
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-yellow-500">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-xs font-medium text-gray-700">4.8</span>
                </div>
                <span className="text-xs text-gray-500">20 ejercicios</span>
              </div>
            </div>
          </div>

          {/* Tarjeta de hoja de trabajo 3 */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer border border-gray-100">
            <div className="h-32 bg-gradient-to-br from-pink-400 to-rose-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-all duration-300"></div>
              <div className="absolute bottom-3 right-3 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs font-medium">
                Popular
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">📚</span>
                <span className="text-xs font-semibold text-pink-600 bg-pink-100 px-2 py-1 rounded-lg">
                  LENGUAJE
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors duration-200">
                Vocabulario Avanzado
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Amplía tu vocabulario con palabras nuevas y útiles
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-yellow-500">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-xs font-medium text-gray-700">4.9</span>
                </div>
                <span className="text-xs text-gray-500">25 ejercicios</span>
              </div>
            </div>
          </div>

          {/* Tarjeta de hoja de trabajo 4 */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer border border-gray-100">
            <div className="h-32 bg-gradient-to-br from-green-400 to-emerald-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-all duration-300"></div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🌍</span>
                <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-lg">
                  GEOGRAFÍA
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-200">
                Capitales del Mundo
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Aprende las capitales de los países más importantes
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-yellow-500">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-xs font-medium text-gray-700">4.7</span>
                </div>
                <span className="text-xs text-gray-500">30 ejercicios</span>
              </div>
            </div>
          </div>

          {/* Tarjeta de hoja de trabajo 5 */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer border border-gray-100">
            <div className="h-32 bg-gradient-to-br from-orange-400 to-amber-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-all duration-300"></div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🎨</span>
                <span className="text-xs font-semibold text-orange-600 bg-orange-100 px-2 py-1 rounded-lg">
                  ARTE
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-200">
                Historia del Arte
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Conoce los movimientos artísticos más importantes
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-yellow-500">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-xs font-medium text-gray-700">4.6</span>
                </div>
                <span className="text-xs text-gray-500">18 ejercicios</span>
              </div>
            </div>
          </div>

          {/* Tarjeta de hoja de trabajo 6 */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer border border-gray-100">
            <div className="h-32 bg-gradient-to-br from-indigo-400 to-blue-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-all duration-300"></div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">⏰</span>
                <span className="text-xs font-semibold text-indigo-600 bg-indigo-100 px-2 py-1 rounded-lg">
                  HISTORIA
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors duration-200">
                Historia Universal
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Explora los eventos más importantes de la historia
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-yellow-500">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-xs font-medium text-gray-700">4.8</span>
                </div>
                <span className="text-xs text-gray-500">22 ejercicios</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sección de progreso */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Tu Progreso</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-violet-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-3xl font-bold text-white">12</span>
              </div>
              <p className="text-gray-600 font-medium">Hojas completadas</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-3xl font-bold text-white">85%</span>
              </div>
              <p className="text-gray-600 font-medium">Precisión promedio</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-3xl font-bold text-white">45</span>
              </div>
              <p className="text-gray-600 font-medium">Minutos de estudio</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Worksheet;
