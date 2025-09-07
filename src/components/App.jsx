import React, { useState, useEffect } from 'react'
import { Hammer, Shield, Wrench, Users, Star, X } from 'lucide-react'
import Header from './Header'
import Hero from './Hero'
import Services from './Services'
import Newsletter from './Newsletter'
import Galeria from './Galeria'
import Footer from './Footer'

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [isVisible, setIsVisible] = useState({})

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }))
        }
      })
    }, { threshold: 0.1 })

    document.querySelectorAll('[id]').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const galleryImages = [
    { id: 1, src: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop', category: 'Esculturas', title: 'Escultura Abstracta' },
    { id: 2, src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop', category: 'Mobiliario', title: 'Mesa Industrial' },
    { id: 3, src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=400&fit=crop', category: 'Portones', title: 'Portón Artístico' },
    { id: 4, src: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&h=400&fit=crop', category: 'Decoración', title: 'Arte Mural' },
    { id: 5, src: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop', category: 'Mobiliario', title: 'Estantería Rústica' },
    { id: 6, src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop', category: 'Esculturas', title: 'Obra Contemporánea' }
  ]

  const testimonials = [
    { name: 'María González', role: 'Arquitecta', text: 'Artefierro transformó completamente mi proyecto. Su atención al detalle y calidad artística superaron mis expectativas.', rating: 5 },
    { name: 'Carlos Mendoza', role: 'Constructor', text: 'Trabajo impecable y entregas puntuales. Son mi primera opción para proyectos que requieren fierro decorativo.', rating: 5 },
    { name: 'Ana Rodríguez', role: 'Diseñadora de Interiores', text: 'La creatividad y profesionalismo de Artefierro han elevado cada uno de mis diseños a otro nivel.', rating: 5 }
  ]

  const services = [
    { icon: <Hammer className='w-8 h-8' />, title: 'Diseños Personalizados', description: 'Creamos piezas únicas adaptadas a tu visión y espacio específico.' },
    { icon: <Shield className='w-8 h-8' />, title: 'Restauración de Piezas', description: 'Devolvemos la vida a tus piezas de fierro con técnicas tradicionales.' },
    { icon: <Wrench className='w-8 h-8' />, title: 'Instalaciones Decorativas', description: 'Montaje profesional garantizando durabilidad y acabado perfecto.' },
    { icon: <Users className='w-8 h-8' />, title: 'Consultoría en Decoración', description: 'Asesoramiento experto para integrar fierro en tu proyecto arquitectónico.' }
  ]

  return (
    <div className='min-h-screen bg-zinc-900 text-amber-50'>
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <Hero />
      <section id='sobre-nosotros' className='py-20 bg-zinc-800'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            <div className={`transition-all duration-1000 ${isVisible['sobre-nosotros'] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
              <h2 className='text-4xl font-bold mb-6 text-amber-500'>Nuestra Historia</h2>
              <p className='text-lg mb-6 text-zinc-300 leading-relaxed'>
                Desde hace más de una década, Artefierro ha sido sinónimo de excelencia en el arte del fierro.
                Cada pieza que creamos nace de la pasión por transformar metal en obras que combinan funcionalidad y belleza.
              </p>
              <p className='text-lg mb-6 text-zinc-300 leading-relaxed'>
                Nuestro taller es un espacio donde la tradición artesanal se encuentra con la innovación contemporánea,
                creando piezas únicas que reflejan la personalidad de cada cliente y la maestría de nuestro oficio.
              </p>
              <div className='flex items-center space-x-4 text-amber-400'>
                <div className='text-center'>
                  <div className='text-3xl font-bold'>500+</div>
                  <div className='text-sm'>Proyectos</div>
                </div>
                <div className='w-px h-12 bg-amber-600'></div>
                <div className='text-center'>
                  <div className='text-3xl font-bold'>10+</div>
                  <div className='text-sm'>Años</div>
                </div>
                <div className='w-px h-12 bg-amber-600'></div>
                <div className='text-center'>
                  <div className='text-3xl font-bold'>100%</div>
                  <div className='text-sm'>Satisfacción</div>
                </div>
              </div>
            </div>
            <div className={`transition-all duration-1000 delay-300 ${isVisible['sobre-nosotros'] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
              <img src='https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&h=500&fit=crop' alt='Taller de forjado' className='w-full h-96 object-cover shadow-2xl' />
            </div>
          </div>
        </div>
      </section>
      <Galeria galleryImages={galleryImages} isVisible={isVisible} setSelectedImage={setSelectedImage} />
      <Services services={services} isVisible={isVisible} />
      <section id='testimonios' className='py-20 bg-zinc-900'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold mb-4 text-amber-500'>Lo que Dicen Nuestros Clientes</h2>
            <p className='text-xl text-zinc-400'>Testimonios reales de proyectos exitosos</p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`bg-zinc-800 p-8 border border-amber-600/20 hover:border-amber-600/40 transition-all duration-300 ${isVisible['testimonios'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className='flex mb-4'>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className='w-5 h-5 text-amber-500 fill-current' />
                  ))}
                </div>
                <p className='text-zinc-300 mb-6 italic leading-relaxed'>"{testimonial.text}"</p>
                <div className='flex items-center'>
                  <div>
                    <div className='font-bold text-amber-100'>{testimonial.name}</div>
                    <div className='text-sm text-amber-400'>{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Newsletter isVisible={isVisible} />
      <Footer />
      {selectedImage && (
        <div className='fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4' onClick={() => setSelectedImage(null)}>
          <div className='relative max-w-4xl max-h-full'>
            <img src={selectedImage.src} alt={selectedImage.title} className='max-w-full max-h-full object-contain' />
            <button onClick={() => setSelectedImage(null)} className='absolute top-4 right-4 text-white hover:text-amber-400 transition-colors'>
              <X className='w-8 h-8' />
            </button>
            <div className='absolute bottom-4 left-4 right-4 text-center text-white'>
              <div className='text-sm text-amber-400 font-semibold mb-1'>{selectedImage.category}</div>
              <div className='text-xl font-bold'>{selectedImage.title}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
