import { useState } from 'react'
import './FAQ.css'

const FAQS = [
  {
    q: 'What interior design services do you offer?',
    a: "We offer a full spectrum of interior design services including residential interiors, commercial spaces, office fit-outs, hospitality design, and turnkey project execution. From concept development to final styling, we handle every detail.",
  },
  {
    q: 'How does your design process work?',
    a: "We begin with a detailed consultation to understand your lifestyle, preferences, and budget. Our team then develops mood boards and concept presentations, followed by 3D visualisations, material selection, procurement, and on-site execution — all managed end-to-end.",
  },
  {
    q: 'How long does a typical interior project take?',
    a: "Timelines vary depending on the scope. A single-room redesign may take 3–5 weeks, while a full home or commercial fit-out typically takes 10–20 weeks. We provide a detailed project schedule before work begins so you always know what to expect.",
  },
  {
    q: 'Do you work within a fixed budget?',
    a: "Absolutely. Budget planning is a core part of our process. We work transparently with you to allocate resources across furniture, materials, finishes, and labour — ensuring maximum impact within your defined investment.",
  },
  {
    q: 'Can you handle procurement and vendor management?',
    a: "Yes. We manage procurement end-to-end — sourcing furniture, fixtures, décor, and materials from trusted vendors. Our established supplier relationships allow us to deliver premium quality at competitive pricing.",
  },
  {
    q: 'How do I get started with Interiors Makers?',
    a: "Simply reach out through our contact form or call us directly. We'll schedule a complimentary consultation to walk through your vision, assess the space, and propose a tailored design plan and timeline.",
  },
]

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(null)
  const toggle = (i) => setOpenIdx(openIdx === i ? null : i)

  return (
    <section id="faq" className="faq">
      <div className="container">
        <div className="faq-inner">
          {/* Left: heading */}
          <div className="faq-left">
            <div className="faq-eyebrow">✦ Quick Answers</div>
            <h2 className="faq-heading">Frequently Asked Questions</h2>
            <p className="faq-subtext">
              Got a question that's not covered here? Feel free to reach out directly
              and I'll be happy to help.
            </p>
            <a
              href="#contact"
              className="faq-contact-cta"
              onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
              aria-label="Ask a question"
            >
              Ask a question →
            </a>
          </div>

          {/* Right: accordion list */}
          <div className="faq-list" role="list">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className={`faq-item${openIdx === i ? ' open' : ''}`}
                role="listitem"
              >
                <button
                  className="faq-question"
                  onClick={() => toggle(i)}
                  aria-expanded={openIdx === i}
                  aria-controls={`faq-answer-${i}`}
                  id={`faq-btn-${i}`}
                >
                  <span className="faq-q-text">{faq.q}</span>
                  <span className="faq-icon" aria-hidden="true">+</span>
                </button>
                <div
                  className="faq-answer"
                  id={`faq-answer-${i}`}
                  role="region"
                  aria-labelledby={`faq-btn-${i}`}
                >
                  <div className="faq-answer-inner">{faq.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

