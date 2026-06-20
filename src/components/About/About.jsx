import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './About.css'

gsap.registerPlugin(ScrollTrigger)

function useCountUp(target, duration = 1800) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0
          const step = target / (duration / 16)
          const timer = setInterval(() => {
            start += step
            if (start >= target) {
              setCount(target)
              clearInterval(timer)
            } else {
              setCount(Math.floor(start))
            }
          }, 16)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return [count, ref]
}

function StatCard({ num, suffix = '+', label, featured = false }) {
  const [count, ref] = useCountUp(num)
  return (
    <div className={`about-stat-card${featured ? ' featured' : ''}`} ref={ref}>
      <div className="stat-num">{count}{suffix}</div>
      <div className="stat-label">{label}</div>
    </div>
  )
}

export default function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about-inner">
          {/* Left: Bio */}
          <div className="about-left">
            <div className="about-eyebrow">✦ Who We Am</div>
            <h2 className="about-heading">About Legna Interiors</h2>
            <p className="about-bio">
              We are a team of professionals specializing in designing and building functional spaces across commercial, industrial, and residential sectors. With a strong focus on quality, efficiency, and detail, we transform ideas into environments that deliver real value.
            </p>
            <div className="about-contact-info">
              <div className="about-contact-item">
                <div className="about-contact-icon">📞</div>
                <span>+91 96291 01415 / 95008 80588</span>
              </div>
              <div className="about-contact-item">
                <div className="about-contact-icon">✉️</div>
                <span>[info@legnainteriors.com]</span>
              </div>
              <div className="about-contact-item">
                <div className="about-contact-icon">📍</div>
                <span>No. 113, First Floor, M.G Road,
                  Karur – 639002</span>
              </div>
            </div>
            <a href="#contact" className="about-story-link" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}>
              My Story →
            </a>
          </div>

          {/* Right: Image + Stats */}
          <div className="about-right">
            <div className="about-image-card" id="about-image-card-slot" />
            <div className="about-stats-grid">
              <StatCard num={5} label="Years of Experience" featured />
              <StatCard num={50} label="Projects Delivered" />
              <StatCard num={30} label="Happy Clients" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
