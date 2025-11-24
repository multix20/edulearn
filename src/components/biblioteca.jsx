import React, { useState } from 'react';

const LearningLibrary = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const libraryItems = [
    {
      id: 1,
      icon: "📚",
      title: "Planes de lecciones",
      description: "Los planes de lecciones gratuitos y listos para usar facilitan la impartición de una instrucción significativa y alineada con los estándares tanto en el aula como en entornos de educación en el hogar.",
      buttonText: "Planifica mi lección de hoy",
      buttonColor: "from-violet-600 to-purple-600",
      bgGradient: "from-blue-50 to-violet-50",
      iconBg: "from-blue-500 to-violet-500"
    },
    {
      id: 2,
      icon: "📝",
      title: "Hojas de trabajo",
      description: "¡Tenemos una hoja de trabajo para todo lo que tu estudiante esté aprendiendo! Nuestros imprimibles facilitan la práctica de todo, desde la escritura a mano hasta la multiplicación, palabras reconocibles a simple vista y mucho más.",
      buttonText: "Échale un vistazo",
      buttonColor: "from-emerald-600 to-teal-600",
      bgGradient: "from-emerald-50 to-teal-50",
      iconBg: "from-emerald-500 to-teal-500"
    },
    {
      id: 3,
      icon: "🎮",
      title: "Juegos",
      description: "¡Convierte tu tiempo de estudio en una aventura! Perfecciona tu fluidez matemática y aprende las letras con juegos inmersivos como \"Fracciones de panqueques\" y \"Carrera de esquí de sustantivos irregulares\".",
      buttonText: "Juega ahora",
      buttonColor: "from-orange-600 to-red-600",
      bgGradient: "from-orange-50 to-red-50",
      iconBg: "from-orange-500 to-red-500"
    },
    {
      id: 4,
      icon: "⚗️",
      title: "Actividades",
      description: "¡Nuestras actividades seleccionadas dan vida a los temas a través de experimentos científicos prácticos, proyectos de arte creativo, propuestas de escritura inspiradoras y mucho más!",
      buttonText: "Haz algo ahora",
      buttonColor: "from-indigo-600 to-blue-600",
      bgGradient: "from-indigo-50 to-blue-50",
      iconBg: "from-indigo-500 to-blue-500"
    }
  ];

  return (
    <section className="relative py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-50 via-white to-violet-50 overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-br from-violet-200/30 to-purple-200/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-tl from-blue-200/30 to-teal-200/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      {/* Elemento decorativo - avión de papel */}
      <div className="absolute top-10 sm:top-20 left-10 sm:left-20 hidden lg:block">
        <div className="relative">
          <svg className="w-12 sm:w-16 h-12 sm:h-16 text-teal-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M2.5 19l7-7 7 7-7-7 7-7-7 7-7-7 7 7z" opacity="0.3"/>
            <path d="M21 2L3 20l7-7L21 2z"/>
          </svg>
          <div className="absolute -top-2 -left-20 w-32 h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header de la sección */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm border border-violet-200/50 rounded-full mb-4 sm:mb-6">
            <span className="text-violet-600 font-medium text-xs sm:text-sm">✨ Descubre nuestros recursos</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 px-4">
            <span className="bg-gradient-to-r from-gray-900 via-violet-800 to-blue-800 bg-clip-text text-transparent">
              Nuestra biblioteca de aprendizaje
            </span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8 sm:mb-10 px-4">
            Con miles de recursos digitales e imprimibles, encuentre el mejor recurso para su estudiante.
          </p>

          {/* Botón principal */}
          <button className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl sm:rounded-2xl font-semibold text-base sm:text-lg shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/30 hover:-translate-y-1 transition-all duration-300 group">
            <span>Sumérgete de lleno</span>
            <svg className="ml-2 w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>

        {/* Grid de recursos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {libraryItems.map((item) => (
            <div
              key={item.id}
              className={`relative group p-6 sm:p-8 bg-gradient-to-br ${item.bgGradient} border border-white/50 rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden`}
              onMouseEnter={() => setHoveredCard(item.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Efecto de brillo en hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-full transition-all duration-1000"></div>

              {/* Elementos decorativos */}
              <div className="absolute -top-4 -right-4 w-16 sm:w-24 h-16 sm:h-24 bg-gradient-to-br from-white/20 to-white/5 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-tl from-white/20 to-white/5 rounded-full blur-xl"></div>

              <div className="relative">
                {/* Icono */}
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className={`w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br ${item.iconBg} rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                    <span className="text-2xl sm:text-3xl filter drop-shadow-sm">{item.icon}</span>
                  </div>

                  {/* Título */}
                  <h3 className="ml-3 sm:ml-4 text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors duration-300">
                    {item.title}
                  </h3>
                </div>

                {/* Descripción */}
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 group-hover:text-gray-700 transition-colors duration-300">
                  {item.description}
                </p>

                {/* Botón de acción */}
                <button
                  className={`inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r ${item.buttonColor} text-white rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 group/btn`}
                >
                  <span>{item.buttonText}</span>
                  <svg className="ml-2 w-3 sm:w-4 h-3 sm:h-4 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>

                {/* Indicador de progreso/estado */}
                <div className="absolute top-2 sm:top-4 right-2 sm:right-4">
                  <div className={`w-2 sm:w-3 h-2 sm:h-3 rounded-full transition-all duration-300 ${
                    hoveredCard === item.id
                      ? 'bg-green-400 shadow-lg shadow-green-400/50 scale-125'
                      : 'bg-gray-300'
                  }`}></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sección de estadísticas */}
        <div className="mt-12 sm:mt-16 md:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {[
            { number: "10,000+", label: "Recursos disponibles" },
            { number: "500+", label: "Planes de lección" },
            { number: "1,000+", label: "Hojas de trabajo" },
            { number: "200+", label: "Juegos interactivos" }
          ].map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="relative inline-block">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-violet-600 to-purple-600 transition-all duration-500"></div>
              </div>
              <div className="text-gray-600 text-xs sm:text-sm font-medium mt-2 group-hover:text-gray-800 transition-colors duration-300">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Call to action final */}
        <div className="mt-12 sm:mt-16 md:mt-20 text-center px-4">
          <div className="inline-flex flex-col items-center px-6 sm:px-8 py-6 sm:py-8 bg-white/80 backdrop-blur-xl border border-white/50 rounded-2xl sm:rounded-3xl shadow-xl max-w-md mx-auto">
            <div className="text-xl sm:text-2xl mb-2">🚀</div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
              ¿Listo para empezar tu aventura de aprendizaje?
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
              Únete a miles de estudiantes que ya están aprendiendo con nosotros
            </p>
            <button className="px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 w-full sm:w-auto">
              Comenzar gratis
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearningLibrary;