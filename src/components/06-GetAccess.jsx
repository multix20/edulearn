import React from 'react';

const GetAccess = () => {
  return (
    <div className="relative min-h-[600px] sm:min-h-[700px] md:min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-cyan-400 overflow-hidden">
      {/* Nubes de fondo */}
      <div className="absolute inset-0">
        {/* Nube izquierda */}
        <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-20 sm:w-32 h-12 sm:h-20 bg-white rounded-full opacity-80"></div>
        <div className="absolute top-14 sm:top-24 left-8 sm:left-16 w-16 sm:w-24 h-10 sm:h-16 bg-white rounded-full opacity-80"></div>
        <div className="absolute top-16 sm:top-28 left-4 sm:left-8 w-12 sm:w-20 h-8 sm:h-12 bg-white rounded-full opacity-80"></div>

        {/* Nube derecha */}
        <div className="absolute top-20 sm:top-32 right-10 sm:right-20 w-20 sm:w-28 h-14 sm:h-18 bg-white rounded-full opacity-80"></div>
        <div className="absolute top-24 sm:top-36 right-12 sm:right-24 w-14 sm:w-20 h-10 sm:h-14 bg-white rounded-full opacity-80"></div>

        {/* Nubes adicionales */}
        <div className="absolute bottom-40 left-1/4 w-16 sm:w-24 h-10 sm:h-16 bg-white rounded-full opacity-70"></div>
        <div className="absolute bottom-32 right-1/3 w-14 sm:w-20 h-8 sm:h-12 bg-white rounded-full opacity-70"></div>
      </div>

      {/* Montañas de fondo */}
      <div className="absolute bottom-0 right-0 w-2/3 sm:w-1/2 h-1/2 sm:h-2/3">
        {/* Montaña principal */}
        <div className="absolute bottom-0 right-10 sm:right-20 w-40 sm:w-64 h-32 sm:h-48 bg-green-500 rounded-t-full transform rotate-12"></div>
        <div className="absolute bottom-0 right-16 sm:right-32 w-32 sm:w-48 h-28 sm:h-40 bg-green-600 rounded-t-full transform -rotate-6"></div>
        <div className="absolute bottom-0 right-4 sm:right-8 w-28 sm:w-40 h-24 sm:h-32 bg-green-400 rounded-t-full transform rotate-3"></div>

        {/* Isla/plataforma */}
        <div className="absolute bottom-0 right-8 sm:right-16 w-48 sm:w-80 h-16 sm:h-24 bg-yellow-300 rounded-t-full opacity-90"></div>
      </div>

      {/* Personaje (representación simplificada) */}
      <div className="absolute bottom-16 sm:bottom-24 right-16 sm:right-32 z-10 hidden sm:block">
        {/* Cuerpo del personaje */}
        <div className="relative">
          {/* Cuerpo principal */}
          <div className="w-12 sm:w-16 h-16 sm:h-20 bg-orange-400 rounded-full relative">
            {/* Cara */}
            <div className="absolute top-1.5 sm:top-2 left-1.5 sm:left-2 w-2 sm:w-3 h-2 sm:h-3 bg-black rounded-full"></div>
            <div className="absolute top-1.5 sm:top-2 right-1.5 sm:right-2 w-2 sm:w-3 h-2 sm:h-3 bg-black rounded-full"></div>
            <div className="absolute top-6 sm:top-8 left-1/2 transform -translate-x-1/2 w-1.5 sm:w-2 h-0.5 sm:h-1 bg-pink-400 rounded-full"></div>

            {/* Orejas */}
            <div className="absolute -top-1.5 sm:-top-2 left-0.5 sm:left-1 w-3 sm:w-4 h-4 sm:h-6 bg-orange-400 rounded-t-full transform -rotate-12"></div>
            <div className="absolute -top-1.5 sm:-top-2 right-0.5 sm:right-1 w-3 sm:w-4 h-4 sm:h-6 bg-orange-400 rounded-t-full transform rotate-12"></div>
          </div>

          {/* Lanza/espada */}
          <div className="absolute -top-6 sm:-top-8 right-1.5 sm:right-2 w-0.5 sm:w-1 h-12 sm:h-16 bg-yellow-600 transform rotate-12"></div>
          <div className="absolute -top-9 sm:-top-12 right-0.5 sm:right-1 w-2 sm:w-3 h-4 sm:h-6 bg-gray-300 transform rotate-12"></div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-[600px] sm:min-h-[700px] md:min-h-screen px-4 sm:px-6">
        <div className="text-center max-w-2xl">
          {/* Título principal */}
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-white mb-8 sm:mb-12 drop-shadow-lg">
            ¡Obtén acceso hoy!
          </h1>

          {/* Botón de acción */}
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 sm:py-4 px-8 sm:px-12 rounded-full text-lg sm:text-xl shadow-lg transform hover:scale-105 transition-all duration-200 border-2 border-purple-500 w-full sm:w-auto">
            Únete gratis
          </button>
        </div>
      </div>

      {/* Ondas del agua en la parte inferior */}
      <div className="absolute bottom-0 left-0 w-full h-24 sm:h-32 bg-gradient-to-t from-cyan-300 to-transparent">
        <div className="absolute bottom-0 w-full h-12 sm:h-16 bg-cyan-300 opacity-80"></div>
        <div className="absolute bottom-3 sm:bottom-4 w-full h-6 sm:h-8 bg-cyan-400 opacity-60 rounded-t-full"></div>
        <div className="absolute bottom-6 sm:bottom-8 w-full h-3 sm:h-4 bg-cyan-500 opacity-40 rounded-t-full"></div>
      </div>
    </div>
  );
};

export default GetAccess;