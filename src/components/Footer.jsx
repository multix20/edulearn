import React from 'react'
import { Instagram, Facebook, MessageCircle } from 'lucide-react'

const Footer = () => (
  <footer className="bg-zinc-900 border-t border-amber-600/20 py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <div className="text-3xl font-bold text-amber-500 mb-4">ARTEFIERRO</div>
        <p className="text-zinc-400 mb-6 italic">"Hecho a fuego, pensado con arte."</p>
        <div className="flex justify-center space-x-6 mb-8">
          <a href="#" className="text-zinc-400 hover:text-amber-400 transition-colors">
            <Instagram className="w-6 h-6" />
          </a>
          <a href="#" className="text-zinc-400 hover:text-amber-400 transition-colors">
            <Facebook className="w-6 h-6" />
          </a>
          <a href="https://wa.me/56912345678" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-amber-400 transition-colors">
            <MessageCircle className="w-6 h-6" />
          </a>
        </div>
        <div className="text-sm text-zinc-500">© 2025 Artefierro. Todos los derechos reservados.</div>
      </div>
    </div>
  </footer>
)

export default Footer
