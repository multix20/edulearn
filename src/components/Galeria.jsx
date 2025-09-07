import React from 'react'

const Galeria = ({ galleryImages, isVisible, setSelectedImage }) => (
  <section id="galeria" className="py-20 bg-zinc-900">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4 text-amber-500">Galería de Obras</h2>
        <p className="text-xl text-zinc-400">Cada pieza cuenta una historia única</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {galleryImages.map((image, index) => (
          <div
            key={image.id}
            className={`group cursor-pointer transition-all duration-700 ${isVisible['galeria'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: `${index * 150}ms` }}
            onClick={() => setSelectedImage(image)}
          >
            <div className="relative overflow-hidden bg-zinc-800 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <img src={image.src} alt={image.title} className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-xs text-amber-400 font-semibold mb-1">{image.category}</div>
                  <div className="text-white font-bold">{image.title}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)

export default Galeria
