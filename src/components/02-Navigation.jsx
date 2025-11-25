import React, { useState } from 'react'
import { Menu, X, BookOpen, GraduationCap, FileText, Gamepad2, Sparkles, ChevronDown } from 'lucide-react'

const Navigation = ({ activeSection, setActiveSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hoveredMenu, setHoveredMenu] = useState(null)

  const menuItems = [
    {
      name: 'Asignaturas',
      icon: BookOpen,
      hasDropdown: true,
      dropdownItems: [
        'Math',
        'English Language Arts',
        'Science',
        'Social Studies',
        'Foreign Language'
      ]
    },
    {
      name: 'Cursos',
      icon: GraduationCap,
      hasDropdown: true,
      dropdownItems: [
        'Math',
        'English Language Arts',
        'Science',
        'Social Studies'
      ]
    },
    {
      name: 'Fichas de Trabajo',
      icon: FileText,
      hasDropdown: true,
      dropdownItems: [
        'Math',
        'Reading & Writing',
        'Science',
        'Social Studies',
        'Arts & Music'
      ]
    },
    { name: 'Juegos', icon: Gamepad2, hasDropdown: false },
    { name: 'Más Recursos', icon: Sparkles, hasDropdown: false }
  ]

  // Función para manejar el click en los items del menú
  const handleMenuClick = (itemName) => {
    // Cambiar la sección activa
    setActiveSection(itemName)

    // Hacer scroll suave al inicio de la página
    window.scrollTo({ top: 0, behavior: 'smooth' })

    // Cerrar menú móvil después del click
    setIsMenuOpen(false)
    setHoveredMenu(null)
  }

  const handleDropdownItemClick = (parentMenu, item) => {
    console.log(`Clicked ${item} from ${parentMenu}`)
    setActiveSection(parentMenu)
    setHoveredMenu(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <nav className="bg-white/95 backdrop-blur-xl border-t border-b border-gray-200/50 sticky top-20 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Navigation */}
        <div className="hidden md:flex justify-center items-center gap-2 lg:gap-4 py-3">
          {menuItems.map((item, index) => {
            const Icon = item.icon
            const isActive = activeSection === item.name
            const isHovered = hoveredMenu === item.name

            return (
              <div
                key={index}
                className="relative"
                onMouseEnter={() => item.hasDropdown && setHoveredMenu(item.name)}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                <button
                  onClick={() => !item.hasDropdown && handleMenuClick(item.name)}
                  className={`flex items-center gap-2 px-4 lg:px-6 py-3 rounded-xl font-semibold text-sm lg:text-base transition-colors duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white'
                      : 'text-gray-700 hover:bg-violet-50 hover:text-violet-700'
                  }`}
                >
                  <Icon className="w-4 h-4 lg:w-5 lg:h-5" />
                  <span>{item.name}</span>
                  {item.hasDropdown && (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>

                {/* Dropdown Menu */}
                {item.hasDropdown && isHovered && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-xl py-2 z-50">
                    {item.dropdownItems.map((dropdownItem, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleDropdownItemClick(item.name, dropdownItem)}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-violet-50 hover:text-violet-700 transition-colors"
                      >
                        {dropdownItem}
                      </button>
                    ))}
                  </div>
                )}
              </div>
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
