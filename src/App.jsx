import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Nav from './components/Nav/Nav'
import CustomCursor from './components/CustomCursor/CustomCursor'
import WhatsAppButton from './components/WhatsAppButton/WhatsAppButton'
import Hero from './components/Hero/Hero'
import Services from './components/Services/Services'
import About from './components/About/About'
import FeaturedProjects from './components/FeaturedProjects/FeaturedProjects'
import Testimonials from './components/Testimonials/Testimonials'

import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'

gsap.registerPlugin(ScrollTrigger)

import Landing from './components/Landing/Landing'

export default function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [landingComplete, setLandingComplete] = useState(false)
  const [showSite, setShowSite] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    // Wire lenis to GSAP ticker
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove((time) => lenis.raf(time * 1000))
    }
  }, [])

  return (
    <>
      <CustomCursor />
      <WhatsAppButton />
      {!landingComplete && (
        <Landing
          onLightOn={() => setShowSite(true)}
          onComplete={() => setLandingComplete(true)}
        />
      )}

      <div 
        className="app"
        style={{
          opacity: showSite ? 1 : 0,
          transition: 'opacity 1s ease',
          pointerEvents: showSite ? 'auto' : 'none'
        }}
      >
        <Nav darkMode={darkMode} />
        <Hero darkMode={darkMode} setDarkMode={setDarkMode} showSite={showSite} />
        <Services />
        <About />
        <FeaturedProjects />
        <Testimonials />

        <Contact />
        <Footer />
      </div>
    </>
  )
}

