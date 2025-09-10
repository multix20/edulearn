import React from 'react'

const Navigation = () => (
  <nav className="bg-white border-t border-gray-200">
    <div className="max-w-6xl mx-auto px-5">
      <div className="flex justify-center gap-8 py-4">
        <button className="nav-item font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-500 px-4 py-2 rounded transition">Asignaturas</button>
        <button className="nav-item font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-500 px-4 py-2 rounded transition">Cursos</button>
        <button className="nav-item font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-500 px-4 py-2 rounded transition">Hojas de Trabajo</button>
        <button className="nav-item font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-500 px-4 py-2 rounded transition">Juegos</button>
        <button className="nav-item font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-500 px-4 py-2 rounded transition">Crear Hoja</button>
        <button className="nav-item font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-500 px-4 py-2 rounded transition">Más Recursos</button>
      </div>
    </div>
  </nav>
)

export default Navigation