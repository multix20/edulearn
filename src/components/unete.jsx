import React from 'react';
import { Users, Globe, BookOpen, Star } from 'lucide-react';

const CommunityComponent = () => {
  return (
    <div className="bg-gradient-to-br from-purple-600 to-purple-700 text-white py-12 sm:py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Título principal */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 sm:mb-16">
          ¡Únete a la comunidad de Education.com!
        </h1>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 md:gap-8 mb-12 sm:mb-16">
          {/* 44 millones de usuarios */}
          <div className="text-center">
            <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto mb-4 sm:mb-6 bg-white rounded-full flex items-center justify-center">
              <div className="relative">
                <Users className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-purple-600" />
                <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 w-5 h-5 sm:w-6 sm:h-6 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white">❤️</span>
                </div>
              </div>
            </div>
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-300 mb-2">44 millones</div>
            <div className="text-sm sm:text-base md:text-lg">padres, maestros y estudiantes atendidos</div>
          </div>

          {/* 20 países */}
          <div className="text-center">
            <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto mb-4 sm:mb-6 bg-white rounded-full flex items-center justify-center">
              <div className="relative">
                <Globe className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-green-500" />
                <div className="absolute top-2 left-2 w-3 h-3 sm:w-4 sm:h-4 bg-pink-400 rounded-full"></div>
                <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 w-2 h-2 sm:w-3 sm:h-3 bg-yellow-400 rounded-full"></div>
                <div className="absolute top-4 sm:top-6 right-1 sm:right-2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-400 rounded-full"></div>
              </div>
            </div>
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-300 mb-2">20 países</div>
            <div className="text-sm sm:text-base md:text-lg">utilizados en 6 continentes</div>
          </div>

          {/* 38,000 recursos */}
          <div className="text-center sm:col-span-2 md:col-span-1">
            <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto mb-4 sm:mb-6 bg-white rounded-full flex items-center justify-center">
              <div className="relative">
                <BookOpen className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-blue-500" />
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                    <span className="text-xs">👑</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-300 mb-2">38,000</div>
            <div className="text-sm sm:text-base md:text-lg">recursos educativos en nuestra biblioteca</div>
          </div>
        </div>

        {/* Testimonios */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {/* Testimonio 1 */}
          <div className="relative">
            <div className="bg-white text-gray-800 rounded-2xl p-4 sm:p-6 shadow-lg">
              <div className="hidden md:block absolute -left-4 top-6 w-0 h-0 border-t-[15px] border-t-transparent border-b-[15px] border-b-transparent border-r-[20px] border-r-white"></div>
              <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                Me encanta que me muestre las áreas en las que mi hijo necesita mejorar y me
                dirija a recursos para trabajar con él. Es fácil de entender y navegar
                en cada área que necesito.
              </p>
            </div>
            <div className="flex items-center mt-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-400 rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                <span className="text-white font-bold text-base sm:text-lg">S</span>
              </div>
              <div>
                <div className="font-semibold text-base sm:text-lg">Sarah H.</div>
                <div className="text-purple-200 text-xs sm:text-sm">madre y miembro premium de Education.com</div>
              </div>
            </div>
          </div>

          {/* Testimonio 2 */}
          <div className="relative md:mt-12">
            <div className="bg-white text-gray-800 rounded-2xl p-4 sm:p-6 shadow-lg">
              <div className="hidden md:block absolute -right-4 top-6 w-0 h-0 border-t-[15px] border-t-transparent border-b-[15px] border-b-transparent border-l-[20px] border-l-white"></div>
              <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                Education.com tiene múltiples recursos organizados para cualquier herramienta
                de aprendizaje que puedas necesitar como maestro, padre y estudiante, ¡y me
                encanta la capacidad de poder ordenar por grado, materia, enriquecimiento o tipo!
              </p>
            </div>
            <div className="flex items-center justify-end mt-4">
              <div className="text-right mr-3 sm:mr-4">
                <div className="font-semibold text-base sm:text-lg">Amy Jo Meiners</div>
                <div className="text-purple-200 text-xs sm:text-sm">Maestra del Año 2016 de Alaska</div>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full overflow-hidden flex-shrink-0">
                <div className="w-full h-full bg-orange-300 flex items-center justify-center">
                  <span className="text-white font-bold text-base sm:text-lg">A</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Botón de acción */}
        <div className="text-center">
          <button className="bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 text-white font-bold py-3 sm:py-4 px-8 sm:px-12 rounded-full text-base sm:text-lg md:text-xl shadow-lg transform hover:scale-105 transition-all duration-200 w-full sm:w-auto">
            Leer más
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunityComponent;