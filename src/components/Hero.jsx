import React from 'react'
import { ChevronRight } from 'lucide-react'

const Hero = () => (
  <section id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden">
    <div
      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&h=1080&fit=crop')",
      }}
    />
    <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
      <h1 className="text-6xl md:text-8xl font-bold mb-6 text-amber-500 tracking-wider">ARTEFIERRO</h1>
      <p className="text-xl md:text-2xl mb-4 text-amber-100 font-light italic">
        "El arte se forja en fuego. Diseño único en fierro."
      </p>
      <p className="text-lg mb-8 text-zinc-300 max-w-2xl mx-auto">
        Transformamos el fierro en obras de arte funcional que perduran en el tiempo
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={() => document.getElementById('galeria').scrollIntoView({ behavior: 'smooth' })}
          className="bg-amber-600 hover:bg-amber-700 text-zinc-900 font-bold py-4 px-8 transition-all duration-300 hover:scale-105 flex items-center justify-center group"
        >
          Ver Trabajos
          <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
        <button
          onClick={() => document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' })}
          className="border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-zinc-900 font-bold py-4 px-8 transition-all duration-300 hover:scale-105"
        >
          Solicita tu Diseño
        </button>
      </div>
    </div>
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
      <ChevronRight className="w-6 h-6 text-amber-500 rotate-90" />
    </div>
  </section>
)

export default Hero
