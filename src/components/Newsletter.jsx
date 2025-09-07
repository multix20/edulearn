import React from 'react'
import { Mail, Phone, Instagram, Facebook, MessageCircle } from 'lucide-react'

const Newsletter = ({ isVisible }) => (
  <section id="contacto" className="py-20 bg-zinc-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4 text-amber-500">Contáctanos</h2>
        <p className="text-xl text-zinc-400">Transformemos tu visión en realidad</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className={`transition-all duration-1000 ${isVisible['contacto'] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
          <div className="space-y-6">
            <div>
              <label className="block text-amber-100 font-semibold mb-2">Nombre Completo</label>
              <input type="text" className="w-full px-4 py-3 bg-zinc-900 border border-amber-600/30 text-amber-50 focus:border-amber-500 focus:outline-none transition-colors" placeholder="Tu nombre" />
            </div>
            <div>
              <label className="block text-amber-100 font-semibold mb-2">Correo Electrónico</label>
              <input type="email" className="w-full px-4 py-3 bg-zinc-900 border border-amber-600/30 text-amber-50 focus:border-amber-500 focus:outline-none transition-colors" placeholder="tu@email.com" />
            </div>
            <div>
              <label className="block text-amber-100 font-semibold mb-2">Mensaje</label>
              <textarea rows="5" className="w-full px-4 py-3 bg-zinc-900 border border-amber-600/30 text-amber-50 focus:border-amber-500 focus:outline-none transition-colors resize-none" placeholder="Cuéntanos sobre tu proyecto..."></textarea>
            </div>
            <button className="w-full bg-amber-600 hover:bg-amber-700 text-zinc-900 font-bold py-4 px-8 transition-all duration-300 hover:scale-105 flex items-center justify-center group">
              <Mail className="mr-2 w-5 h-5" />
              Enviar Consulta
            </button>
          </div>
        </div>
        <div className={`transition-all duration-1000 delay-300 ${isVisible['contacto'] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-amber-500">Información de Contacto</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="w-6 h-6 text-amber-500 mr-4" />
                  <span className="text-zinc-300">+56 9 1234 5678</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-6 h-6 text-amber-500 mr-4" />
                  <span className="text-zinc-300">contacto@artefierro.cl</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-amber-500">Contáctanos Directamente</h3>
              <a href="https://wa.me/56912345678?text=Hola,%20me%20interesa%20conocer%20más%20sobre%20sus%20trabajos%20en%20fierro" target="_blank" rel="noopener noreferrer" className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 transition-all duration-300 hover:scale-105 flex items-center justify-center group w-full">
                <MessageCircle className="mr-2 w-5 h-5" />
                Escríbenos por WhatsApp
              </a>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-amber-500">Síguenos</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-amber-500 hover:text-amber-400 transition-colors">
                  <Instagram className="w-8 h-8" />
                </a>
                <a href="#" className="text-amber-500 hover:text-amber-400 transition-colors">
                  <Facebook className="w-8 h-8" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
)

export default Newsletter
