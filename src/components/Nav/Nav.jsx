import { useEffect, useState } from 'react'
import './Nav.css'

import logoUrl from '../logo/legna-logo.svg'

export default function Nav({ darkMode }) {
  const [scrolled, setScrolled] = useState(false)
  const [pastHero, setPastHero] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY
      setScrolled(y > 20)
      setPastHero(y > window.innerHeight * 0.6)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-inner">
          {/* Left: Logo / Avatar */}
          <a href="#" className="nav-logo" aria-label="Home">
            <div className="nav-avatar">
              <img src={logoUrl} alt="Logo" />
            </div>
          </a>

          {/* Center: Links */}
          <ul className="nav-links">
            <li><a href="#hero" onClick={(e) => { e.preventDefault(); scrollTo('hero') }}>Home</a></li>
            <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollTo('about') }}>About</a></li>
            <li><a href="#projects" onClick={(e) => { e.preventDefault(); scrollTo('projects') }}>Projects</a></li>
          </ul>

          {/* Right: Contact button */}
          <div className="nav-right">
            <button
              className="nav-contact-btn"
              onClick={() => scrollTo('contact')}
              aria-label="Contact Duncan"
            >
              Contact
            </button>
          </div>
        </div>
      </nav>

      {/* Available for work badge */}
      <div className={`available-badge${pastHero ? ' visible' : ''}`} role="status" aria-live="polite">
        {/*  */}
        <span className="badge-text">
          <span>Available</span> for work
        </span>
      </div>
    </>
  )
}
