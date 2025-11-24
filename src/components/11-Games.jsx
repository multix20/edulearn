import React, { useState } from 'react';
import { Gamepad2, Play, Trophy, Target, Sparkles } from 'lucide-react';

const Games = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedDifficulty, setSelectedDifficulty] = useState('Todas');

  const categories = ['Todos', 'Matemáticas', 'Ciencias', 'Lenguaje', 'Lógica'];
  const difficulties = ['Todas', 'Fácil', 'Medio', 'Difícil'];

  const games = [
    {
      id: 1,
      title: 'Aventura Matemática',
      category: 'Matemáticas',
      difficulty: 'Medio',
      icon: '🔢',
      color: 'blue',
      description: 'Resuelve problemas matemáticos mientras exploras un mundo fantástico',
      players: 2340,
      rating: 4.8,
      duration: '15-20 min',
      levels: 24,
      badge: 'Popular',
      skills: ['Suma', 'Resta', 'Multiplicación']
    },
    {
      id: 2,
      title: 'Laboratorio de Ciencias',
      category: 'Ciencias',
      difficulty: 'Medio',
      icon: '🔬',
      color: 'green',
      description: 'Experimenta de forma segura en un laboratorio virtual',
      players: 1890,
      rating: 4.7,
      duration: '20-25 min',
      levels: 18,
      badge: 'Nuevo',
      skills: ['Química', 'Física', 'Biología']
    },
    {
      id: 3,
      title: 'Cazador de Palabras',
      category: 'Lenguaje',
      difficulty: 'Fácil',
      icon: '📚',
      color: 'purple',
      description: 'Encuentra palabras ocultas y mejora tu vocabulario',
      players: 3120,
      rating: 4.9,
      duration: '10-15 min',
      levels: 30,
      badge: 'Destacado',
      skills: ['Vocabulario', 'Ortografía', 'Lectura']
    },
    {
      id: 4,
      title: 'Rompecabezas Lógico',
      category: 'Lógica',
      difficulty: 'Difícil',
      icon: '🧩',
      color: 'orange',
      description: 'Desafía tu mente con acertijos complejos',
      players: 1560,
      rating: 4.6,
      duration: '15-30 min',
      levels: 40,
      badge: null,
      skills: ['Razonamiento', 'Estrategia', 'Pensamiento crítico']
    },
    {
      id: 5,
      title: 'Planeta Números',
      category: 'Matemáticas',
      difficulty: 'Fácil',
      icon: '🌟',
      color: 'blue',
      description: 'Aprende números y operaciones básicas de forma divertida',
      players: 2890,
      rating: 4.8,
      duration: '10-15 min',
      levels: 20,
      badge: 'Popular',
      skills: ['Conteo', 'Suma básica', 'Números']
    },
    {
      id: 6,
      title: 'Quiz de Historia',
      category: 'Ciencias',
      difficulty: 'Medio',
      icon: '🏛️',
      color: 'green',
      description: 'Viaja en el tiempo y pon a prueba tus conocimientos',
      players: 1450,
      rating: 4.5,
      duration: '15-20 min',
      levels: 25,
      badge: null,
      skills: ['Historia', 'Geografía', 'Cultura']
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

  const filteredGames = games.filter(game => {
    const categoryMatch = selectedCategory === 'Todos' || game.category === selectedCategory;
    const difficultyMatch = selectedDifficulty === 'Todas' || game.difficulty === selectedDifficulty;
    return categoryMatch && difficultyMatch;
  });

  return (
    <div id="games" className="relative min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-cyan-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Gamepad2 className="w-4 h-4" />
            <span>Aprender Jugando</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Juegos Educativos
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Aprende mientras te diviertes con juegos interactivos diseñados para reforzar conceptos educativos.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-bold text-gray-900">Filtrar Juegos</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Categoría</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Dificultad</label>
              <div className="flex flex-wrap gap-2">
                {difficulties.map((difficulty) => (
                  <button
                    key={difficulty}
                    onClick={() => setSelectedDifficulty(difficulty)}
                    className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 ${
                      selectedDifficulty === difficulty
                        ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {difficulty}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 text-center">
            <div className="text-3xl mb-2">🎮</div>
            <p className="text-2xl font-bold text-gray-900">156</p>
            <p className="text-sm text-gray-600">Juegos Totales</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 text-center">
            <div className="text-3xl mb-2">👥</div>
            <p className="text-2xl font-bold text-gray-900">18.5k</p>
            <p className="text-sm text-gray-600">Jugadores</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 text-center">
            <div className="text-3xl mb-2">⭐</div>
            <p className="text-2xl font-bold text-gray-900">4.7</p>
            <p className="text-sm text-gray-600">Valoración</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 text-center">
            <div className="text-3xl mb-2">🏆</div>
            <p className="text-2xl font-bold text-gray-900">520</p>
            <p className="text-sm text-gray-600">Niveles</p>
          </div>
        </div>

        {/* Game Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGames.map((game) => (
            <div
              key={game.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-16 h-16 bg-gradient-to-br ${getColorClasses(game.color)} rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                    <span className="text-3xl">{game.icon}</span>
                  </div>
                  {game.badge && (
                    <span className={`${getBadgeColor(game.badge)} px-3 py-1 rounded-full text-xs font-bold`}>
                      {game.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-700 transition-colors duration-300">
                  {game.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4">
                  {game.description}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {game.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 mb-4 text-sm">
                  <div className="flex items-center gap-1 text-gray-600">
                    <Target className="w-4 h-4" />
                    <span>{game.levels} niveles</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Trophy className="w-4 h-4" />
                    <span>{game.rating} ⭐</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <span className="text-sm">{game.duration}</span>
                  </div>
                </div>

                {/* Play Button */}
                <button className={`w-full py-3 bg-gradient-to-r ${getColorClasses(game.color)} text-white rounded-xl font-bold shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group-hover:scale-105`}>
                  <Play className="w-5 h-5 fill-white" />
                  <span>Jugar Ahora</span>
                </button>

                {/* Players */}
                <div className="mt-3 text-center text-sm text-gray-500">
                  {game.players.toLocaleString()} jugadores
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredGames.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎮</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No se encontraron juegos</h3>
            <p className="text-gray-600">Intenta ajustar los filtros para ver más resultados</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Games;
