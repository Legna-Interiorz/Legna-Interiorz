import { useRef, useState } from 'react'
import './Testimonials.css'

const REVIEWS = [
  {
    name: 'Arjun Mehta',
    role: 'Villa Owner, Bengaluru',
    avatar: '🧑‍💼',
    bg: 'linear-gradient(135deg, #6B6BFF, #a259ff)',
    quote:
      'Legna Interiors transformed our 4BHK villa into something truly spectacular. Every corner reflects elegance and our personal style. The team was professional, punctual, and deeply attentive to detail.',
    stars: 5,
  },
  {
    name: 'Priya Raghunathan',
    role: 'Homeowner, Chennai',
    avatar: '👩‍💼',
    bg: 'linear-gradient(135deg, #f59e0b, #ef4444)',
    quote:
      'We wanted a modern yet warm home — and Legna delivered exactly that. The lighting design alone was worth every rupee. Our guests are always amazed when they walk in!',
    stars: 5,
  },
  {
    name: 'Suresh & Kavitha Iyer',
    role: 'Apartment Owners, Hyderabad',
    avatar: '🏠',
    bg: 'linear-gradient(135deg, #14b8a6, #6366f1)',
    quote:
      'From concept to completion, the entire journey was smooth and stress-free. Legna truly listened to us and gave us a home we are proud to show off. Outstanding craftsmanship!',
    stars: 5,
  },
  {
    name: 'Rohan Desai',
    role: 'Restaurant Owner, Pune',
    avatar: '🍽️',
    bg: 'linear-gradient(135deg, #22c55e, #06b6d4)',
    quote:
      'They designed our restaurant interiors from scratch and the footfall has increased noticeably. Customers constantly compliment the ambience. Legna Interiors is simply world-class.',
    stars: 5,
  },
  {
    name: 'Ananya Krishnamurthy',
    role: 'Interior Enthusiast, Coimbatore',
    avatar: '✨',
    bg: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
    quote:
      'I was very particular about my pooja room and bedroom design. Legna blended traditional Indian elements with contemporary aesthetics perfectly. Truly exceeded my expectations!',
    stars: 5,
  },
]

// Self-contained video card — each has its own play state & ref
function VideoCard() {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  const handleToggle = () => {
    const v = videoRef.current
    if (!v) return
    if (playing) {
      v.pause()
      setPlaying(false)
    } else {
      v.play().catch(() => { })
      setPlaying(true)
    }
  }

  return (
    <div className="testimonial-card video-card" role="listitem">
      <div className="video-card-inner">
        <div className="video-slot" onClick={handleToggle}>
          <video
            ref={videoRef}
            src="/client-testimonial.mp4"
            className="actual-video-real"
            playsInline
            loop
            onEnded={() => setPlaying(false)}
          />
          {!playing && (
            <div className="play-overlay">
              <div className="play-circle">
                <span className="play-arrow">▶</span>
              </div>
            </div>
          )}
        </div>
        <div className="video-meta">
          <p className="video-quote">"A space that truly feels like home — our experience with Legna Interiors."</p>
          <div className="testimonial-author">
            <div className="testimonial-avatar" style={{ background: 'linear-gradient(135deg, #22c55e, #06b6d4)' }}>🎥</div>
            <div className="testimonial-author-info">
              <div className="name">Client Testimonial</div>
              <div className="role">Legna Interiors Project</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Build the scroll track: reviews interleaved with one video card
const TRACK_ITEMS = [...REVIEWS, 'video', ...REVIEWS, 'video']

export default function Testimonials() {
  return (
    <section id="testimonials" className="testimonials">
      <div className="container">
        <div className="testimonials-header">
          <div className="testimonials-eyebrow">✦ Client Stories</div>
          <h2 className="testimonials-heading">What Our Clients Say</h2>
          <p className="testimonials-subtext">
            Authentic experiences from homeowners and businesses across India who trusted us with their spaces.
          </p>
        </div>
      </div>

      {/* Full-width sliding track */}
      <div className="testimonials-track-wrap">
        <div className="testimonials-track" role="list">
          {TRACK_ITEMS.map((t, i) =>
            t === 'video' ? (
              <VideoCard key={`video-${i}`} />
            ) : (
              <div key={i} className="testimonial-card review-card" role="listitem">
                <div className="testimonial-stars" aria-label={`${t.stars} stars`}>
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <span key={j}>⭐</span>
                  ))}
                </div>
                <p className="testimonial-quote">{t.quote}</p>
                <div className="testimonial-author">
                  <div
                    className="testimonial-avatar"
                    style={{ background: t.bg }}
                    aria-hidden="true"
                  >
                    {t.avatar}
                  </div>
                  <div className="testimonial-author-info">
                    <div className="name">{t.name}</div>
                    <div className="role">{t.role}</div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      <div className="container">
        <div className="testimonials-badge">
          <div className="happy-badge">
            <div className="happy-badge-avatars" aria-hidden="true">
              {['🧑‍💼', '👩‍💼', '🏠'].map((em, i) => (
                <div
                  key={i}
                  className="mini-avatar"
                  style={{
                    background: ['linear-gradient(135deg,#6B6BFF,#a259ff)', 'linear-gradient(135deg,#f59e0b,#ef4444)', 'linear-gradient(135deg,#14b8a6,#6366f1)'][i],
                  }}
                >
                  {em}
                </div>
              ))}
            </div>
            <p className="happy-badge-text">
              <span>50+</span> happy clients across India
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
