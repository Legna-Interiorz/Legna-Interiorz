import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Hero.css'

gsap.registerPlugin(ScrollTrigger)

export default function Hero({ darkMode, setDarkMode, showSite = true }) {
  const sectionRef = useRef(null)
  const cardRef = useRef(null)

  useEffect(() => {
    if (!showSite) return // Wait for landing sequence to finish!

    const mm = gsap.matchMedia()

    // ── DESKTOP (769px+): two-step card journey: Hero → Services → About ──
    mm.add('(min-width: 901px)', () => {
      const ctx = gsap.context(() => {
        gsap.from('.hero-name', { opacity: 0, y: 30, duration: 0.8, delay: 0.1 })
        gsap.from('.hero-word-digital', { opacity: 0, x: -60, duration: 0.9, delay: 0.2 })
        gsap.from('.hero-word-designer', { opacity: 0, x: 60, duration: 0.9, delay: 0.2 })
        gsap.from('.hero-card', {
          opacity: 0, scale: 0.88, rotationX: 15,
          duration: 1.4, ease: 'power3.out', delay: 0.2
        })
        gsap.from('.hero-subtitle', { opacity: 0, y: 20, duration: 0.7, delay: 0.5 })
        gsap.from('.hero-stats', { opacity: 0, y: 20, duration: 0.7, delay: 0.6 })
        gsap.from('.hero-toggle-wrap', { opacity: 0, y: 20, duration: 0.7, delay: 0.7 })

        // Pin lasts all the way until the About slot reaches viewport center
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: '.hero-card-wrap',
            start: 'center center',
            endTrigger: document.querySelector('#about-image-card-slot'),
            end: 'center center',
            pin: '.hero-card-wrap',
            pinSpacing: false,
            scrub: 1,
            invalidateOnRefresh: true,
          }
        })

        // Step 1 — dock at Services: flip horizontally, reveal back face
        tl.to(cardRef.current, {
          x: () => {
            const slot = document.querySelector('#services-card-slot')
            const wrap = document.querySelector('.hero-card-wrap')
            if (!slot || !wrap) return 0
            return slot.getBoundingClientRect().left - wrap.getBoundingClientRect().left
          },
          y: 100,
          rotationY: -180, // back face visible
          rotationZ: 0,
          scale: 1,
          ease: 'none',
          duration: 1,
        })

        // Step 2 — dock at About: full 360° revolution → front face upright, scale to landscape slot
        tl.to(cardRef.current, {
          x: () => {
            const slot = document.querySelector('#about-image-card-slot')
            const wrap = document.querySelector('.hero-card-wrap')
            if (!slot || !wrap) return 0
            const slotCX = slot.getBoundingClientRect().left + slot.getBoundingClientRect().width / 2
            const wrapCX = wrap.getBoundingClientRect().left + wrap.getBoundingClientRect().width / 2
            return slotCX - wrapCX
          },
          y: 0,
          rotationY: -360,
          rotationZ: 0,
          scaleX: () => {
            const slot = document.querySelector('#about-image-card-slot')
            const card = cardRef.current
            if (!slot || !card) return 1
            return slot.getBoundingClientRect().width / card.getBoundingClientRect().width
          },
          scaleY: () => {
            const slot = document.querySelector('#about-image-card-slot')
            const card = cardRef.current
            if (!slot || !card) return 1
            return slot.getBoundingClientRect().height / card.getBoundingClientRect().height
          },
          ease: 'none',
          duration: 1,
        })

        // Crossfade: fade OUT vertical logo, fade IN horizontal image — runs during Step 2
        tl.to('.hero-card-logo-vertical', { opacity: 0, ease: 'none', duration: 1 }, 1)
        tl.to('.hero-card-logo-horizontal', { opacity: 1, ease: 'none', duration: 1 }, 1)
      }, sectionRef)

      return () => ctx.revert()
    })



    // ── MOBILE (768px and below): simple fade-in, NO flip, NO ScrollTrigger ─
    mm.add('(max-width: 900px)', () => {
      const ctx = gsap.context(() => {
        gsap.from('.hero-word-digital', { opacity: 0, y: 30, duration: 0.8, delay: 0.1 })
        gsap.from('.hero-word-designer', { opacity: 0, y: 30, duration: 0.8, delay: 0.2 })
        gsap.from('.hero-card', { opacity: 0, y: 20, duration: 0.9, delay: 0.3, ease: 'power2.out' })
        gsap.from('.hero-subtitle', { opacity: 0, y: 16, duration: 0.7, delay: 0.5 })
        gsap.from('.hero-stats', { opacity: 0, y: 16, duration: 0.7, delay: 0.6 })
      }, sectionRef)

      return () => ctx.revert()
    })

    return () => mm.revert()
  }, [showSite])


  return (
    <section id="hero" className="hero" ref={sectionRef}>
      <div className="hero-bg-grid" aria-hidden="true" />

      <div className="hero-content">
        {/* Left Column */}
        <div className="hero-left">
          {/*<p className="hero-name">Duncan Robert</p>*/}
          <h1 className="hero-word-digital">LEGNA</h1>
          <p className="hero-subtitle">
            Designing elegant spaces that blend style, comfort, and purpose.
            Delivering functional environments across commercial, industrial, and residential spaces.
          </p>
          <div className="hero-scroll-hint">
            <div className="hero-scroll-line" />
            <span>Scroll to explore</span>
          </div>
        </div>

        {/* Center — Portrait Card */}
        <div className="hero-center">
          <div className="hero-card-wrap">
            <div className="hero-card" ref={cardRef}>
              <div className="hero-card-inner">
                {/* Front Side — Vertical logo (default) + horizontal logo overlay (fades in when docked) */}
                <div className="hero-card-front">
                  {/* Vertical logo — always visible, fades out when card docks at About */}
                  <div className="hero-card-logo-wrap hero-card-logo-vertical">
                    <img
                      src="/logo-vertical.svg"
                      alt="Legna Interiors Logo"
                      className="hero-card-logo-img"
                    />
                  </div>
                  {/* Horizontal logo — hidden initially, fades in when card docks at About */}
                  <div className="hero-card-logo-wrap hero-card-logo-horizontal"
                    style={{
                      opacity: 0,
                      position: "absolute",
                      inset: 0,
                      zIndex: 999
                    }}
                  >
                    <img
                      src="/projects/IMG_3351.PNG"
                      alt="Legna Interiors"
                      className="hero-card-logo-img"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain"
                      }}
                    />
                  </div>
                </div>
                {/* Back Side — same vertical logo so flip looks seamless */}
                <div className="hero-card-back">
                  <div className="hero-card-logo-wrap">
                    <img
                      src="/logo-vertical.svg"
                      alt="Legna Interiors Logo"
                      className="hero-card-logo-img"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Hi button */}
            {/* <button
              className="hero-hi-btn"
              aria-label="Say Hi"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Hi 👋
            </button> */}
          </div>
        </div>

        {/* Right Column */}
        <div className="hero-right">
          <h2 className="hero-word-designer">iNTERIORZ</h2>
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-num">5+</div>
              <div className="hero-stat-label">Years Exp.</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-num">50+</div>
              <div className="hero-stat-label">Projects</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-num">30+</div>
              <div className="hero-stat-label">Clients</div>
            </div>
          </div>
        </div>
      </div>

      {/* Dark mode toggle — bottom center */}
      <div className="hero-toggle-wrap">
        <span className="toggle-icon">☀️</span>
        <label className="toggle-switch" aria-label="Toggle dark mode">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          <span className="toggle-slider" />
        </label>
        <span className="toggle-icon">🌙</span>
      </div>

      {/* Scroll down hint */}
      <div className="hero-scroll-arrow" aria-hidden="true">
        <div className="scroll-arrow-icon">↓</div>
      </div>
    </section>
  )
}

