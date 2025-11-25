import React, { useState } from 'react'
import { Menu, X, BookOpen, GraduationCap, FileText, Gamepad2, Sparkles } from 'lucide-react'

const Navigation = ({ activeSection, setActiveSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [
    { name: 'Asignaturas', icon: BookOpen },
    { name: 'Cursos', icon: GraduationCap },
    { name: 'Fichas de Trabajo', icon: FileText },
    { name: 'Juegos', icon: Gamepad2 },
    { name: 'Más Recursos', icon: Sparkles }
  ]

  // Función para manejar el click en los items del menú
  const handleMenuClick = (itemName) => {
    // Cambiar la sección activa
    setActiveSection(itemName)

    // Hacer scroll suave al inicio de la página
    window.scrollTo({ top: 0, behavior: 'smooth' })

    // Cerrar menú móvil después del click
    setIsMenuOpen(false)
  }

  return (
    <nav className="bg-white/95 backdrop-blur-xl border-t border-b border-gray-200/50 sticky top-20 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Navigation */}
        <div className="hidden md:flex justify-center items-center gap-2 lg:gap-4 py-3">
          {menuItems.map((item, index) => {
            const Icon = item.icon
            const isActive = activeSection === item.name

            return (
              <button
                key={index}
                onClick={() => handleMenuClick(item.name)}
                className={`flex items-center gap-2 px-4 lg:px-6 py-3 rounded-xl font-semibold text-sm lg:text-base transition-colors duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white'
                    : 'text-gray-700 hover:bg-violet-50 hover:text-violet-700'
                }`}
              >
                <Icon className="w-4 h-4 lg:w-5 lg:h-5" />
                <span>{item.name}</span>
              </button>
            )
          })}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-2">
              <Menu className="w-5 h-5 text-violet-600" />
              <span className="text-gray-900 font-bold text-base">Menú</span>
            </div>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-xl hover:bg-violet-50 transition-all duration-200 border-2 border-transparent hover:border-violet-200"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-violet-600" />
              )}
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMenuOpen && (
            <div className="pb-4 space-y-2">
              {menuItems.map((item, index) => {
                const Icon = item.icon
                const isActive = activeSection === item.name

                return (
                  <button
                    key={index}
                    className={`w-full flex items-center gap-3 px-4 py-4 rounded-xl font-semibold text-sm transition-colors duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-violet-50 hover:text-violet-700 border border-gray-200'
                    }`}
                    onClick={() => handleMenuClick(item.name)}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="flex-1 text-left">{item.name}</span>
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navigation
