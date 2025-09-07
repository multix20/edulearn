import React from 'react'

const Services = ({ services, isVisible }) => (
  <section id="servicios" className="py-20 bg-zinc-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4 text-amber-500">Nuestros Servicios</h2>
        <p className="text-xl text-zinc-400">Soluciones integrales en arte del fierro</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className={`bg-zinc-900 p-8 text-center hover:bg-zinc-700 transition-all duration-300 hover:scale-105 border border-amber-600/20 hover:border-amber-600/40 ${isVisible['servicios'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: `${index * 150}ms` }}
          >
            <div className="text-amber-500 mb-4 flex justify-center">{service.icon}</div>
            <h3 className="text-xl font-bold mb-4 text-amber-100">{service.title}</h3>
            <p className="text-zinc-400 leading-relaxed">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
)

export default Services
