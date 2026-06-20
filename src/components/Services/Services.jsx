import { useState } from 'react'
import './Services.css'

const SERVICES = [
  {
    num: '01',
    title: 'Interior Design & Planning',
    items: [
      'Space planning & layout optimization',
      'Concept design & 3D visualization',
      'Material selection & finishes',
      'End-to-end design consultation',
    ],
  },
  {
    num: '02',
    title: 'Office & Commercial Spaces',
    items: [
      'Modern office design & fit-outs',
      'Workspace optimization & ergonomics',
      'Brand-aligned commercial interiors',
      'Turnkey execution for offices & retail',
    ],
  },
  {
    num: '03',
    title: 'Industrial & Factory Setup',
    items: [
      'Factory layout planning & execution',
      'Workflow & process optimization',
      'Safety-compliant infrastructure design',
      'Scalable industrial space development',
    ],
  },
  {
    num: '04',
    title: 'Residential Interiors',
    items: [
      'Custom home interior design',
      'Modular kitchen & living solutions',
      'Furniture & decor planning',
      'Complete home transformation',
    ],
  },
];

export default function Services() {
  const [openIdx, setOpenIdx] = useState(null)

  const toggle = (i) => setOpenIdx(openIdx === i ? null : i)

  return (
    <section id="services" className="services">
      <div className="container">
        <div className="services-inner">
          {/* Left: accordion */}
          <div className="services-accordion" role="list">
            <div className="services-eyebrow">✦ What We Offer</div>
            <h2 className="services-heading">What We Build<br />For You</h2>
            <p className="services-subtext">
              We design and build functional, high-quality spaces tailored to your needs—across commercial, industrial, and residential environments.
            </p>
            {SERVICES.map((s, i) => (
              <div
                key={s.num}
                className={`accordion-item${openIdx === i ? ' open' : ''}`}
                role="listitem"
              >
                <button
                  className="accordion-header"
                  onClick={() => toggle(i)}
                  aria-expanded={openIdx === i}
                  aria-controls={`accordion-body-${i}`}
                  id={`accordion-btn-${i}`}
                >
                  <span className="accordion-title">{s.title}</span>
                  <span className="accordion-icon" aria-hidden="true">+</span>
                </button>
                <div
                  className="accordion-body"
                  id={`accordion-body-${i}`}
                  role="region"
                  aria-labelledby={`accordion-btn-${i}`}
                >
                  <div className="accordion-content">
                    <ul>
                      {s.items.map((item, j) => (
                        <li key={j}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: sticky description + image */}
          <div className="services-left">
            <div className="services-card-slot" id="services-card-slot"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

