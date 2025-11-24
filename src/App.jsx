import React, { useState, useEffect } from 'react'
import Header from './components/01-Header'
import Navigation from './components/02-Navigation'
import Hero from './components/03-Hero'
import LearningLibrary from './components/04-LearningLibrary'
import CommunityComponent from './components/05-CommunityComponent'
import GetAccess from './components/06-GetAccess'
import Worksheet from './components/07-Worksheet'
import Footer from './components/08-Footer'
import Subjects from './components/09-Subjects'
import Courses from './components/10-Courses'
import Games from './components/11-Games'
import Resources from './components/12-Resources'

const App = () => {
  const [user, setUser] = useState(null)
  const [activeSection, setActiveSection] = useState('Fichas de Trabajo')

  // Verificar si hay un usuario en localStorage al cargar la aplicación
  useEffect(() => {
    const storedUser = localStorage.getItem('edulearn_user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error('Error al parsear usuario:', error)
      }
    }
  }, [])

  // Agregar listener para detectar cambios en localStorage (login/registro/logout)
  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem('edulearn_user')
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser))
        } catch (error) {
          console.error('Error al parsear usuario:', error)
          setUser(null)
        }
      } else {
        setUser(null)
      }
    }

    // Escuchar eventos de storage (para cambios en otras pestañas)
    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  // Debug: mostrar estado del usuario
  useEffect(() => {
    console.log('🔍 Estado del usuario actualizado:', user)
  }, [user])

  // Función para renderizar la sección activa
  const renderActiveSection = () => {
    switch (activeSection) {
      case 'Asignaturas':
        return <Subjects />
      case 'Cursos':
        return <Courses />
      case 'Fichas de Trabajo':
        return <Worksheet />
      case 'Juegos':
        return <Games />
      case 'Más Recursos':
        return <Resources />
      default:
        return <Worksheet />
    }
  }

  return (
    <div>
      <Header user={user} setUser={setUser} />

      {/* 🎯 Renderizado condicional basado en autenticación */}
      {user ? (
        // ===== VISTA DE USUARIO AUTENTICADO =====
        <>
          <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
          {renderActiveSection()}
        </>
      ) : (
        // ===== VISTA DE LANDING PAGE (NO AUTENTICADO) =====
        <>
          <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
          <Hero />
          <LearningLibrary />
          <CommunityComponent />
          <GetAccess />
        </>
      )}

      <Footer />
    </div>
  )
}

export default App