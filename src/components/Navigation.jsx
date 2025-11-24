import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = ['Asignaturas', 'Cursos', 'Hojas de Trabajo', 'Juegos', 'Más Recursos']

  return (
    <nav className="bg-white border-t border-gray-200 sticky top-20 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-5">
        {/* Desktop Navigation */}
        <div className="hidden md:flex justify-center gap-4 lg:gap-8 py-4">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className="nav-item font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-500 px-3 lg:px-4 py-2 rounded transition text-sm lg:text-base"
            >
              {item}
            </button>
          ))}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <div className="flex justify-between items-center py-3">
            <span className="text-gray-700 font-semibold text-sm">Menú de Navegación</span>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-gray-700" />
              ) : (
                <Menu className="w-5 h-5 text-gray-700" />
              )}
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMenuOpen && (
            <div className="pb-4 space-y-2 animate-in slide-in-from-top-2 duration-300">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  className="w-full text-left nav-item font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-500 px-4 py-3 rounded transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navigation