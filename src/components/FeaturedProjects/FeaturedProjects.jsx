import { useEffect, useRef, useState, forwardRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './FeaturedProjects.css'

gsap.registerPlugin(ScrollTrigger)

const PROJECTS = [
  {
    categoryTitle: 'Office Workspace',
    items: [
      {
        title: 'Nexus Tech HQ',
        tags: ['Interior Design', 'Commercial'],
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80',
      },
      {
        title: 'Creative Agency Studio',
        tags: ['Workspace', 'Lighting'],
        image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&q=80',
      },
      {
        title: 'Minimalist Co-Working',
        tags: ['Corporate', 'Furniture'],
        image: 'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?w=1200&q=80',
      },
      {
        title: 'Executive Suite Redesign',
        tags: ['Luxury', 'Corporate'],
        image: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=1200&q=80',
      }
    ]
  },
  {
    categoryTitle: 'Residential Interiors',
    items: [
      {
        title: 'Residential Interiors',
        tags: ['Architecture', 'Residential'],
        image: '/projects/project-1.jpg',
      },
      {
        title: 'Residential Interiors',
        tags: ['Interior Styling', 'Decor'],
        image: '/projects/project-2.jpg',
      },
      {
        title: 'Residential Interiors',
        tags: ['Minimalist', 'Nordic'],
        image: '/projects/project-3.jpg',
      },
      {
        title: 'Residential Inte riors',
        tags: ['Bedroom', 'Luxury'],
        image: '/projects/project-6.jpg',
      }
    ]
  },
  {
    categoryTitle: 'Industrial & Factory',
    items: [
      {
        title: 'Automated Assembly Line',
        tags: ['Industrial', 'Spatial Design'],
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80',
      },
      {
        title: 'Modern Warehouse Hub',
        tags: ['Logistics', 'Equipment'],
        image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80',
      },
    ]
  },
  {
    categoryTitle: 'Retail & Hospitality',
    items: [
      {
        title: 'Boutique Hotel Lobby',
        tags: ['Hospitality', 'Luxury'],
        image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80',
      },
      {
        title: 'Flagship Fashion Boutique',
        tags: ['Retail', 'Merchandising'],
        image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&q=80',
      },
      {
        title: 'Rooftop Restaurant Design',
        tags: ['Dining', 'Architecture'],
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80',
      },
      {
        title: 'Premium Spa & Wellness',
        tags: ['Wellness', 'Luxury'],
        image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=1200&q=80',
      }
    ]
  },
  {
    categoryTitle: 'Restaurants',
    items: [
      {
        title: 'Legna Restaurant Design',
        tags: ['Dining', 'Ambience'],
        video: '/projects/LEGNA.mp4',
      }
    ]
  }
]

const ProjectGalleryCard = forwardRef(({ categoryData }, ref) => {
  const [idx, setIdx] = useState(0)
  const items = categoryData.items

  const handleNext = () => setIdx((prev) => (prev + 1) % items.length)
  const handlePrev = () => setIdx((prev) => (prev - 1 + items.length) % items.length)

  const currentItem = items[idx]

  return (
    <article className="project-card" ref={ref}>
      {/* Full-bleed media — video or image */}
      <div className="project-image-inner" key={`${categoryData.categoryTitle}-${idx}`}>
        {currentItem.video ? (
          <video
            src={currentItem.video}
            className="project-real-img"
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <img
            src={currentItem.image}
            alt={currentItem.title}
            className="project-real-img"
            loading="lazy"
          />
        )}
      </div>

      {/* Gradient scrim at bottom for text readability */}
      <div className="project-scrim" />

      {/* Navigation arrows — centered vertically on card edges */}
      <button className="gallery-nav-btn prev" onClick={handlePrev} aria-label="Previous">←</button>
      <button className="gallery-nav-btn next" onClick={handleNext} aria-label="Next">→</button>

      {/* Slide counter pill — top left */}
      <div className="gallery-category-label">
        {categoryData.categoryTitle} &nbsp;·&nbsp; {idx + 1} / {items.length}
      </div>

      {/* Text overlay — bottom of card, over the scrim */}
      <div className="project-overlay-text">
        <div className="project-tags">
          {currentItem.tags.map((t) => (
            <span key={t} className="project-tag">{t}</span>
          ))}
        </div>
        <h3 className="project-title">{currentItem.title}</h3>
      </div>
    </article>
  )
})
// Add display name for React DevTools wrapper
ProjectGalleryCard.displayName = "ProjectGalleryCard"

export default function FeaturedProjects() {
  const containerRef = useRef(null)
  const wrappersRef = useRef([])
  const cardsRef = useRef([])

  useEffect(() => {
    let mm = gsap.matchMedia()

    mm.add("(min-width: 901px)", () => {
      const wrappers = wrappersRef.current.filter(Boolean)
      const cards = cardsRef.current.filter(Boolean)
      if (!wrappers.length || !cards.length) return

      const ctx = gsap.context(() => {
        wrappers.forEach((wrapper, i) => {
          if (i === wrappers.length - 1) return // Last card doesn't get covered

          const card = cards[i]
          const nextWrapper = wrappers[i + 1]

          gsap.to(card, {
            scale: 0.92,
            opacity: 0.4,
            ease: "none",
            scrollTrigger: {
              trigger: nextWrapper,
              start: "top bottom",
              end: "top 20%",
              scrub: true,
            }
          })
        })
      }, containerRef)

      return () => ctx.revert()
    })

    return () => mm.revert()
  }, [])

  return (
    <>
      <section id="projects" className="projects-section">

        {/* 1. Intro Section */}
        <div className="projects-intro">
          <div className="projects-header">
            <div className="projects-header-left">
              <span className="projects-eyebrow">✦ Portfolio</span>
              <h2 className="projects-heading">Featured<br />Projects</h2>
            </div>
            <div className="projects-header-right">
              <p className="projects-subtext">
                A curated selection of our finest interior design work —
                spanning residential homes, commercial spaces, hospitality
                venues and creative workspaces across India.
              </p>
            </div>
          </div>
        </div>

        {/* 2. Sticky Native Card Section (Portavia Framer Style) */}
        <div className="projects-stack-container" ref={containerRef}>
          {PROJECTS.map((p, i) => (
            <div
              className="project-sticky-wrapper"
              key={p.categoryTitle}
              ref={(el) => (wrappersRef.current[i] = el)}
            >
              <ProjectGalleryCard
                categoryData={p}
                ref={(el) => (cardsRef.current[i] = el)}
              />
            </div>
          ))}
        </div>
      </section>

      {/* <div className="projects-view-all-wrapper">
        <a href="#" className="btn btn-outline" aria-label="View all projects">
          View All Projects →
        </a>
      </div> */}
    </>
  )
}
