import React from 'react';

const Hero = ({
  title = "Descubra un mundo ilimitado de aprendizaje",
  description = "Repasa conceptos y explora nuevos temas con hojas de trabajo, actividades prácticas, rompecabezas, juegos y más: ¡las opciones son infinitas! Accede hoy mismo a nuestra biblioteca de más de 38,000 recursos."
}) => {

  return (
    <section className="relative overflow-hidden min-h-[600px] sm:min-h-[700px] md:min-h-screen bg-gradient-to-br from-sky-300 via-sky-400 to-teal-400">
      {/* Nubes decorativas */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-20 sm:w-32 h-12 sm:h-20 bg-white bg-opacity-80 rounded-full blur-sm"></div>
        <div className="absolute top-20 sm:top-32 left-20 sm:left-40 w-16 sm:w-24 h-10 sm:h-16 bg-white bg-opacity-70 rounded-full blur-sm"></div>
        <div className="absolute top-10 right-10 sm:right-20 w-24 sm:w-40 h-16 sm:h-24 bg-white bg-opacity-75 rounded-full blur-sm"></div>
        <div className="absolute top-32 sm:top-40 right-20 sm:right-40 w-20 sm:w-28 h-14 sm:h-18 bg-white bg-opacity-60 rounded-full blur-sm"></div>
        <div className="absolute bottom-40 left-10 sm:left-20 w-24 sm:w-36 h-16 sm:h-22 bg-white bg-opacity-70 rounded-full blur-sm"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 flex items-center min-h-[600px] sm:min-h-[700px] md:min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center w-full">
          {/* Contenido de texto */}
          <div className="text-left max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white drop-shadow-lg leading-tight">
              {title}
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-white drop-shadow-md leading-relaxed max-w-xl mx-auto lg:mx-0">
              {description}
            </p>
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg text-base sm:text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform w-full sm:w-auto">
              Únete gratis
            </button>
          </div>

          {/* Área de ilustraciones/personajes */}
          <div className="relative lg:block hidden">
            {/* Laptop */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
              <div className="w-48 h-32 bg-gray-800 rounded-lg shadow-2xl">
                <div className="w-full h-24 bg-blue-500 rounded-t-lg relative overflow-hidden">
                  <div className="absolute inset-2 bg-blue-400 rounded">
                    <div className="w-full h-full bg-gradient-to-br from-pink-400 to-purple-500 rounded flex items-center justify-center">
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                      <div className="w-6 h-6 bg-yellow-400 rounded ml-2"></div>
                    </div>
                  </div>
                </div>
                <div className="h-8 bg-gray-700 rounded-b-lg"></div>
              </div>
            </div>

            {/* Personaje naranja (gato) */}
            <div className="absolute top-1/2 right-8 transform -translate-y-1/2 z-40">
              <div className="w-24 h-24 relative">
                <div className="w-full h-full bg-orange-400 rounded-full relative">
                  {/* Orejas */}
                  <div className="absolute -top-2 left-3 w-6 h-8 bg-orange-400 rounded-full transform -rotate-12"></div>
                  <div className="absolute -top-2 right-3 w-6 h-8 bg-orange-400 rounded-full transform rotate-12"></div>
                  {/* Rayas */}
                  <div className="absolute top-2 left-0 right-0 h-1 bg-orange-600 rounded"></div>
                  <div className="absolute top-6 left-0 right-0 h-1 bg-orange-600 rounded"></div>
                  <div className="absolute top-10 left-0 right-0 h-1 bg-orange-600 rounded"></div>
                  {/* Ojos */}
                  <div className="absolute top-6 left-5 w-4 h-4 bg-white rounded-full">
                    <div className="absolute top-1 left-1 w-2 h-2 bg-black rounded-full"></div>
                  </div>
                  <div className="absolute top-6 right-5 w-4 h-4 bg-white rounded-full">
                    <div className="absolute top-1 right-1 w-2 h-2 bg-black rounded-full"></div>
                  </div>
                  {/* Nariz */}
                  <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-2 h-1 bg-pink-400 rounded"></div>
                </div>
                {/* Cuerpo */}
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-12 bg-orange-300 rounded-full"></div>
              </div>
            </div>

            {/* Personaje morado */}
            <div className="absolute top-1/3 left-8 z-20">
              <div className="w-20 h-20 relative">
                <div className="w-full h-full bg-purple-500 rounded-full relative">
                  {/* Ojos */}
                  <div className="absolute top-4 left-3 w-4 h-4 bg-white rounded-full">
                    <div className="absolute top-1 left-1 w-2 h-2 bg-black rounded-full"></div>
                  </div>
                  <div className="absolute top-4 right-3 w-4 h-4 bg-white rounded-full">
                    <div className="absolute top-1 right-1 w-2 h-2 bg-black rounded-full"></div>
                  </div>
                  {/* Máscara/antifaz */}
                  <div className="absolute top-6 left-1 right-1 h-8 bg-teal-400 rounded-lg"></div>
                </div>
                {/* Libro */}
                <div className="absolute -bottom-2 -right-2 w-8 h-6 bg-teal-500 rounded shadow-md transform rotate-12">
                  <div className="w-full h-1 bg-teal-600 mt-1"></div>
                  <div className="w-full h-1 bg-teal-600 mt-1"></div>
                </div>
              </div>
            </div>

            {/* Personaje verde */}
            <div className="absolute bottom-1/3 right-20 z-20">
              <div className="w-18 h-18 bg-green-400 rounded-lg relative transform rotate-6">
                <div className="absolute top-2 left-2 right-2 bottom-2 bg-green-300 rounded">
                  {/* Cara sonriente */}
                  <div className="absolute top-3 left-3 w-2 h-2 bg-black rounded-full"></div>
                  <div className="absolute top-3 right-3 w-2 h-2 bg-black rounded-full"></div>
                  <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-4 h-2 bg-black rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Elementos decorativos flotantes */}
            <div className="absolute top-20 left-20 w-3 h-3 bg-yellow-400 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
            <div className="absolute top-32 right-32 w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
            <div className="absolute bottom-40 left-32 w-4 h-4 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>

            {/* Escalera */}
            <div className="absolute bottom-10 right-12 z-10">
              <div className="w-2 h-20 bg-red-500 relative">
                <div className="absolute top-2 -left-3 w-8 h-1 bg-red-500"></div>
                <div className="absolute top-6 -left-3 w-8 h-1 bg-red-500"></div>
                <div className="absolute top-10 -left-3 w-8 h-1 bg-red-500"></div>
                <div className="absolute top-14 -left-3 w-8 h-1 bg-red-500"></div>
              </div>
              <div className="absolute top-0 right-0 w-2 h-20 bg-red-500"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Decoraciones adicionales en mobile */}
      <div className="lg:hidden absolute bottom-10 right-5 sm:right-10">
        <div className="w-12 sm:w-16 h-12 sm:h-16 bg-orange-400 rounded-full relative animate-bounce">
          <div className="absolute top-1.5 sm:top-2 left-2 sm:left-3 w-2 sm:w-3 h-2 sm:h-3 bg-white rounded-full"></div>
          <div className="absolute top-1.5 sm:top-2 right-2 sm:right-3 w-2 sm:w-3 h-2 sm:h-3 bg-white rounded-full"></div>
          <div className="absolute top-4 sm:top-6 left-1 right-1 h-4 sm:h-6 bg-orange-600 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;