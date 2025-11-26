import React, { useState } from 'react';
import { Sparkles, Download, FileText, Video, Headphones, Image, BookOpen } from 'lucide-react';
import EmailCaptureModal from './EmailCaptureModal';

const Resources = () => {
  const [selectedType, setSelectedType] = useState('Todos');
  const [selectedResource, setSelectedResource] = useState(null);
  const [showEmailModal, setShowEmailModal] = useState(false);

  const resourceTypes = [
    { name: 'Todos', icon: Sparkles, count: 245 },
    { name: 'PDFs', icon: FileText, count: 89 },
    { name: 'Videos', icon: Video, count: 64 },
    { name: 'Audio', icon: Headphones, count: 42 },
    { name: 'Imágenes', icon: Image, count: 50 }
  ];

  const resources = [
    {
      id: 1,
      title: 'Guía Completa de Matemáticas 3er Grado',
      type: 'PDFs',
      icon: '📄',
      color: 'blue',
      description: 'Manual completo con teoría y ejercicios resueltos',
      size: '15 MB',
      pages: 120,
      downloads: 3450,
      rating: 4.9,
      format: 'PDF',
      badge: 'Popular'
    },
    {
      id: 2,
      title: 'Videos Tutorial: Fracciones',
      type: 'Videos',
      icon: '🎥',
      color: 'red',
      description: 'Serie de videos explicativos sobre fracciones',
      size: '250 MB',
      duration: '45 min',
      downloads: 2890,
      rating: 4.8,
      format: 'MP4',
      badge: 'Nuevo'
    },
    {
      id: 3,
      title: 'Audiolibro: Cuentos Educativos',
      type: 'Audio',
      icon: '🎧',
      color: 'purple',
      description: 'Colección de cuentos narrados para desarrollar comprensión auditiva',
      size: '85 MB',
      duration: '2 horas',
      downloads: 1560,
      rating: 4.7,
      format: 'MP3',
      badge: null
    },
    {
      id: 4,
      title: 'Infografías Ciencias Naturales',
      type: 'Imágenes',
      icon: '🖼️',
      color: 'green',
      description: 'Pack de infografías educativas sobre el sistema solar',
      size: '45 MB',
      pages: 25,
      downloads: 2120,
      rating: 4.6,
      format: 'PNG/JPG',
      badge: 'Destacado'
    },
    {
      id: 5,
      title: 'Fichas Imprimibles de Lectoescritura',
      type: 'PDFs',
      icon: '📝',
      color: 'orange',
      description: 'Set de 50 fichas para practicar lectura y escritura',
      size: '22 MB',
      pages: 50,
      downloads: 4230,
      rating: 4.9,
      format: 'PDF',
      badge: 'Popular'
    },
    {
      id: 6,
      title: 'Video Curso: Experimentos Caseros',
      type: 'Videos',
      icon: '🔬',
      color: 'red',
      description: '15 experimentos científicos seguros para hacer en casa',
      size: '380 MB',
      duration: '60 min',
      downloads: 1890,
      rating: 4.8,
      format: 'MP4',
      badge: null
    },
    {
      id: 7,
      title: 'Pronunciación en Inglés',
      type: 'Audio',
      icon: '🗣️',
      color: 'purple',
      description: 'Ejercicios de pronunciación para principiantes',
      size: '65 MB',
      duration: '90 min',
      downloads: 1340,
      rating: 4.5,
      format: 'MP3',
      badge: 'Nuevo'
    },
    {
      id: 8,
      title: 'Mapas Interactivos de América',
      type: 'Imágenes',
      icon: '🗺️',
      color: 'green',
      description: 'Mapas detallados para imprimir y estudiar geografía',
      size: '30 MB',
      pages: 15,
      downloads: 1780,
      rating: 4.7,
      format: 'PNG',
      badge: null
    },
    {
      id: 9,
      title: 'Plantillas para Proyectos',
      type: 'PDFs',
      icon: '📋',
      color: 'blue',
      description: 'Plantillas editables para presentaciones escolares',
      size: '18 MB',
      pages: 30,
      downloads: 2560,
      rating: 4.6,
      format: 'PDF',
      badge: null
    }
  ];

  const handleDownloadClick = (resource) => {
    setSelectedResource(resource);
    setShowEmailModal(true);
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: 'from-blue-500 to-cyan-600',
      red: 'from-red-500 to-pink-600',
      purple: 'from-purple-500 to-pink-600',
      green: 'from-green-500 to-emerald-600',
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

  const filteredResources = resources.filter(resource =>
    selectedType === 'Todos' || resource.type === selectedType
  );

  return (
    <div id="resources" className="relative min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-yellow-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Biblioteca de Recursos</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Más Recursos Educativos
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descarga materiales complementarios: guías en PDF, videos tutoriales, audiolibros e infografías para enriquecer el aprendizaje.
          </p>
        </div>

        {/* Resource Type Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {resourceTypes.map((type) => {
            const Icon = type.icon;
            return (
              <button
                key={type.name}
                onClick={() => setSelectedType(type.name)}
                className={`group flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                  selectedType === type.name
                    ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
                }`}
              >
                <Icon className={`w-5 h-5 ${selectedType === type.name ? '' : 'group-hover:scale-110 transition-transform'}`} />
                <div className="text-left">
                  <div className="font-bold">{type.name}</div>
                  <div className="text-xs opacity-80">{type.count} recursos</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100 text-center">
            <div className="text-3xl mb-2">📚</div>
            <p className="text-2xl font-bold text-gray-900">245</p>
            <p className="text-sm text-gray-600">Recursos Totales</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100 text-center">
            <div className="text-3xl mb-2">⬇️</div>
            <p className="text-2xl font-bold text-gray-900">42.5k</p>
            <p className="text-sm text-gray-600">Descargas</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100 text-center">
            <div className="text-3xl mb-2">⭐</div>
            <p className="text-2xl font-bold text-gray-900">4.7</p>
            <p className="text-sm text-gray-600">Valoración</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100 text-center">
            <div className="text-3xl mb-2">🆕</div>
            <p className="text-2xl font-bold text-gray-900">12</p>
            <p className="text-sm text-gray-600">Esta Semana</p>
          </div>
        </div>

        {/* Resource Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <div
              key={resource.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${getColorClasses(resource.color)} rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-2xl">{resource.icon}</span>
                  </div>
                  {resource.badge && (
                    <span className={`${getBadgeColor(resource.badge)} px-3 py-1 rounded-full text-xs font-bold`}>
                      {resource.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-700 transition-colors duration-300">
                  {resource.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4">
                  {resource.description}
                </p>

                {/* Metadata */}
                <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                  <div>
                    <span className="text-gray-500">Formato:</span>
                    <p className="font-semibold text-gray-900">{resource.format}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Tamaño:</span>
                    <p className="font-semibold text-gray-900">{resource.size}</p>
                  </div>
                  {resource.pages && (
                    <div>
                      <span className="text-gray-500">Páginas:</span>
                      <p className="font-semibold text-gray-900">{resource.pages}</p>
                    </div>
                  )}
                  {resource.duration && (
                    <div>
                      <span className="text-gray-500">Duración:</span>
                      <p className="font-semibold text-gray-900">{resource.duration}</p>
                    </div>
                  )}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Download className="w-4 h-4" />
                    <span>{resource.downloads.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-yellow-500">
                    <span>⭐</span>
                    <span className="font-semibold">{resource.rating}</span>
                  </div>
                </div>

                {/* Download Button */}
                <button
                  onClick={() => handleDownloadClick(resource)}
                  className={`w-full py-3 bg-gradient-to-r ${getColorClasses(resource.color)} text-white rounded-xl font-bold shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group-hover:scale-105`}
                >
                  <Download className="w-5 h-5" />
                  <span>Descargar</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📁</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No se encontraron recursos</h3>
            <p className="text-gray-600">Intenta seleccionar otra categoría</p>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-3xl p-8 text-white text-center">
          <BookOpen className="w-12 h-12 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-3">¿Necesitas más recursos?</h3>
          <p className="text-lg mb-6 opacity-90">
            Subimos nuevos materiales cada semana. ¡Regístrate para recibir notificaciones!
          </p>
          <button className="bg-white text-orange-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg">
            Suscribirme
          </button>
        </div>
      </div>

      {/* Modal de captura de email */}
      <EmailCaptureModal
        ficha={selectedResource}
        isOpen={showEmailModal}
        onClose={() => {
          setShowEmailModal(false);
          setSelectedResource(null);
        }}
      />
    </div>
  );
};

export default Resources;
