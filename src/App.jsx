import React, { useState, useEffect } from 'react'
import Header from './components/01-Header'
import Navigation from './components/02-Navigation'
import Hero from './components/03-Hero'
import LearningLibrary from './components/04-LearningLibrary'
import CommunityComponent from './components/05-CommunityComponent'
import GetAccess from './components/06-GetAccess'
import Worksheet from './components/07-Worksheet'
import Footer from './components/08-Footer'

const App = () => {
  const [user, setUser] = useState(null)

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

  return (
    <div>
      <Header user={user} setUser={setUser} />

      {/* 🎯 Renderizado condicional basado en autenticación */}
      {user ? (
        // ===== VISTA DE USUARIO AUTENTICADO =====
        <>
          <Navigation />
          <Worksheet />
        </>
      ) : (
        // ===== VISTA DE LANDING PAGE (NO AUTENTICADO) =====
        <>
          <Navigation />
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