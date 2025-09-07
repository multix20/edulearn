import React from 'react'
import { Menu, X } from 'lucide-react'

const Header = ({ isMenuOpen, setIsMenuOpen }) => (
  <nav className="fixed top-0 w-full bg-zinc-900/95 backdrop-blur-sm z-50 border-b border-amber-600/20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center">
          <span className="text-2xl font-bold text-amber-500 tracking-wide">ARTEFIERRO</span>
        </div>
        <div className="hidden md:block">
          <div className="ml-10 flex items-baseline space-x-8">
            <a href="#inicio" className="hover:text-amber-400 transition-colors px-3 py-2">Inicio</a>
            <a href="#galeria" className="hover:text-amber-400 transition-colors px-3 py-2">Galería</a>
            <a href="#servicios" className="hover:text-amber-400 transition-colors px-3 py-2">Servicios</a>
            <a href="#contacto" className="hover:text-amber-400 transition-colors px-3 py-2">Contacto</a>
          </div>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-amber-50 hover:text-amber-400">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </div>
    {isMenuOpen && (
      <div className="md:hidden bg-zinc-800 border-t border-amber-600/20">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <a href="#inicio" className="block px-3 py-2 hover:text-amber-400 transition-colors">Inicio</a>
          <a href="#galeria" className="block px-3 py-2 hover:text-amber-400 transition-colors">Galería</a>
          <a href="#servicios" className="block px-3 py-2 hover:text-amber-400 transition-colors">Servicios</a>
          <a href="#contacto" className="block px-3 py-2 hover:text-amber-400 transition-colors">Contacto</a>
        </div>
      </div>
    )}
  </nav>
)

export default Header
