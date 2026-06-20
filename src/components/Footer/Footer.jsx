import legnaLogo from '../logo/legna-logo.svg'
import './Footer.css'

export default function Footer() {
  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          {/* Logo */}
          <a href="#" className="footer-logo" aria-label="Go to top">
            <div className="footer-logo-circle">
              <img src={legnaLogo} alt="Legna Interiors Logo" className="footer-logo-img" />
            </div>
            <div className="footer-logo-text">
              <span className="footer-logo-name">Legna Interiors</span>
              {/* <span className="footer-logo-tagline">Digital Designer</span> */}
            </div>
          </a>

          {/* Nav */}
          <ul className="footer-nav">
            <li><a href="#hero" onClick={(e) => { e.preventDefault(); scrollTo('hero') }}>Home</a></li>
            <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollTo('about') }}>About</a></li>
            <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollTo('services') }}>Services</a></li>
            <li><a href="#projects" onClick={(e) => { e.preventDefault(); scrollTo('projects') }}>Projects</a></li>
            {/* <li><a href="#blog" onClick={(e) => { e.preventDefault(); scrollTo('blog') }}>Blog</a></li> */}
            <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact') }}>Contact</a></li>
          </ul>

          {/* Socials */}

        </div>

        <div className="footer-divider" />

        <div className="footer-bottom">
          <p className="footer-copyright">
            © Copyright 2025. All Rights Reserved by Legna Interiors
          </p>
          <p className="footer-made-by">
            Made with care by <span>Legna Interiors</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
