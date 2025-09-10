import React from 'react'
import Header from './components/Header'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import LearningLibrary from './components/biblioteca'
import CommunityComponent from './components/unete'
import GetAccess from './components/GetAccess'
import Footer from './components/Footer'

const App = () => {
  return (
    <div>
      <Header />
      <Navigation />
      <Hero />
      <LearningLibrary />
      <CommunityComponent />
      <GetAccess />
      <Footer />
    </div>
  )
}

export default App