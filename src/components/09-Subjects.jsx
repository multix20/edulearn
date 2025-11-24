import React, { useState } from 'react';
import { BookOpen, Search, Filter, TrendingUp } from 'lucide-react';

const Subjects = () => {
  const [selectedSubject, setSelectedSubject] = useState('Todas');
  const [searchQuery, setSearchQuery] = useState('');

  const subjects = [
    {
      id: 'all',
      name: 'Todas',
      icon: '📚',
      color: 'violet',
      description: 'Todas las asignaturas disponibles',
      worksheets: 3860,
      courses: 145
    },
    {
      id: 'math',
      name: 'Matemáticas',
      icon: '🔢',
      color: 'blue',
      description: 'Álgebra, geometría, cálculo y más',
      worksheets: 1250,
      courses: 45
    },
    {
      id: 'science',
      name: 'Ciencias',
      icon: '🔬',
      color: 'green',
      description: 'Biología, química, física',
      worksheets: 890,
      courses: 32
    },
    {
      id: 'language',
      name: 'Lenguaje',
      icon: '📖',
      color: 'purple',
      description: 'Lectura, escritura, gramática',
      worksheets: 1450,
      courses: 38
    },
    {
      id: 'social',
      name: 'Estudios Sociales',
      icon: '🌍',
      color: 'orange',
      description: 'Historia, geografía, civismo',
      worksheets: 670,
      courses: 25
    },
    {
      id: 'arts',
      name: 'Artes',
      icon: '🎨',
      color: 'pink',
      description: 'Música, dibujo, teatro',
      worksheets: 420,
      courses: 18
    },
    {
      id: 'tech',
      name: 'Tecnología',
      icon: '💻',
      color: 'indigo',
      description: 'Programación, robótica, diseño',
      worksheets: 380,
      courses: 22
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      violet: 'from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700',
      blue: 'from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700',
      green: 'from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700',
      purple: 'from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700',
      orange: 'from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700',
      pink: 'from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700',
      indigo: 'from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700'
    };
    return colors[color] || colors.violet;
  };

  return (
    <div id="subjects" className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <BookOpen className="w-4 h-4" />
            <span>Explora por Asignaturas</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Asignaturas Disponibles
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descubre fichas de trabajo organizadas por asignatura. Cada materia cuenta con cursos especializados y recursos educativos.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar asignatura..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-violet-400 transition-all duration-300"
            />
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Fichas</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">3,860</p>
              </div>
              <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">📄</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Cursos Totales</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">145</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🎓</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Asignaturas</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">7</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">📚</span>
              </div>
            </div>
          </div>
        </div>

        {/* Subject Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects
            .filter(subject =>
              subject.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((subject) => (
              <div
                key={subject.id}
                onClick={() => setSelectedSubject(subject.name)}
                className="group bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100 hover:border-transparent hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-16 h-16 bg-gradient-to-br ${getColorClasses(subject.color)} rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-3xl">{subject.icon}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-green-600 font-semibold">
                    <TrendingUp className="w-4 h-4" />
                    <span>Popular</span>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-violet-700 transition-colors duration-300">
                  {subject.name}
                </h3>

                <p className="text-gray-600 text-sm mb-4">
                  {subject.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Fichas</span>
                    <span className="text-lg font-bold text-gray-900">{subject.worksheets.toLocaleString()}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Cursos</span>
                    <span className="text-lg font-bold text-gray-900">{subject.courses}</span>
                  </div>
                  <button className={`px-4 py-2 bg-gradient-to-r ${getColorClasses(subject.color)} text-white rounded-xl font-semibold text-sm shadow-md group-hover:shadow-lg transition-all duration-300`}>
                    Ver más
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Subjects;
