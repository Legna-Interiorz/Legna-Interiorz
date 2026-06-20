import { useState } from 'react'
import emailjs from '@emailjs/browser'
import './Contact.css'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const INITIAL = { name: '', email: '', phone: '', projectLocation: '', service: '', message: '' }

function validate(data) {
  const errors = {}
  if (!data.name.trim()) errors.name = 'Full name is required.'
  if (!data.email.trim()) errors.email = 'Email address is required.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = 'Please enter a valid email.'
  if (!data.phone.trim()) errors.phone = 'Phone number is required.'
  else if (!/^[\d\s\+\-\(\)]{7,15}$/.test(data.phone.trim()))
    errors.phone = 'Please enter a valid phone number.'
  if (!data.projectLocation.trim()) errors.projectLocation = 'Project location is required.'
  if (!data.service) errors.service = 'Please select a project type.'
  if (!data.message.trim()) errors.message = 'Please tell us about your space.'
  return errors
}

export default function Contact() {
  const [formData, setFormData] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear the error for this field as the user types
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate(formData)
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors)
      return
    }

    setStatus('sending')

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          phone_number: formData.phone,
          project_location: formData.projectLocation,
          project_type: formData.service,
          message: formData.message,
        },
        PUBLIC_KEY
      )
      setStatus('success')
      setFormData(INITIAL)
      setErrors({})
    } catch (err) {
      console.error('EmailJS error:', err)
      setStatus('error')
    }
  }

  const isSending = status === 'sending'

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="contact-inner">
          {/* Left sidebar */}
          <div className="contact-left">
            <div className="contact-eyebrow">✦ Get In Touch</div>
            <h2 className="contact-heading">Start Your<br />Project</h2>
            <p className="contact-subtext">
              Have a space you'd love to transform? Share your vision with us
              and we'll craft an interior experience that's uniquely yours.
            </p>

            <div className="contact-info-list">
              <div className="contact-info-item">
                <div className="contact-info-icon">✉️</div>
                <div>
                  <div className="contact-info-label">Email</div>
                  <div className="contact-info-value">Legnainteriorz@gmail.com</div>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="contact-info-icon">📞</div>
                <div>
                  <div className="contact-info-label">Phone</div>
                  <div className="contact-info-value">+91 96291 01415 / 95008 80588</div>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="contact-info-icon">📍</div>
                <div>
                  <div className="contact-info-label">Studio Location</div>
                  <div className="contact-info-value">No. 113, First Floor, M.G Road,<br />Karur – 639002</div>
                </div>
              </div>
            </div>

            <div className="contact-socials">
              <a
                href="https://www.instagram.com/legna_interiorz?igsh=YmxzenY2YzlyaWt1"
                className="social-link"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >📷 Instagram</a>
            </div>
          </div>

          {/* Right: Form */}
          <div className="contact-form">

            {/* ── Success state ── */}
            {status === 'success' && (
              <div className="contact-status-card">
                <div className="status-icon">🏡</div>
                <h3>Enquiry Received!</h3>
                <p>Thank you for reaching out. Our design team will be in touch within 24 hours to discuss your project.</p>
                <button className="form-submit" onClick={() => setStatus('idle')}>
                  Send Another Enquiry
                </button>
              </div>
            )}

            {/* ── Error state ── */}
            {status === 'error' && (
              <div className="contact-status-card error">
                <div className="status-icon">⚠️</div>
                <h3>Something went wrong</h3>
              <p>We couldn't send your message. Please try again or email us directly at Legnainteriorz@gmail.com.</p>
                <button className="form-submit" onClick={() => setStatus('idle')}>
                  Try Again
                </button>
              </div>
            )}

            {/* ── Form ── */}
            {(status === 'idle' || status === 'sending') && (
              <form onSubmit={handleSubmit} noValidate>
                <div className="form-grid">

                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-name">Full Name</label>
                    <input
                      id="contact-name"
                      className={`form-input${errors.name ? ' input-error' : ''}`}
                      type="text"
                      name="name"
                      placeholder="Jane Smith"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={isSending}
                      autoComplete="name"
                    />
                    {errors.name && <span className="field-error">{errors.name}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-email">Email Address</label>
                    <input
                      id="contact-email"
                      className={`form-input${errors.email ? ' input-error' : ''}`}
                      type="email"
                      name="email"
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isSending}
                      autoComplete="email"
                    />
                    {errors.email && <span className="field-error">{errors.email}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-phone">Phone Number</label>
                    <input
                      id="contact-phone"
                      className={`form-input${errors.phone ? ' input-error' : ''}`}
                      type="tel"
                      name="phone"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={isSending}
                      autoComplete="tel"
                    />
                    {errors.phone && <span className="field-error">{errors.phone}</span>}
                  </div>

                  <div className="form-group full-width">
                    <label className="form-label" htmlFor="contact-location">Project Location</label>
                    <input
                      id="contact-location"
                      className={`form-input${errors.projectLocation ? ' input-error' : ''}`}
                      type="text"
                      name="projectLocation"
                      placeholder="e.g. Chennai, Tamil Nadu"
                      value={formData.projectLocation}
                      onChange={handleChange}
                      disabled={isSending}
                      autoComplete="address-level2"
                    />
                    {errors.projectLocation && <span className="field-error">{errors.projectLocation}</span>}
                  </div>

                  <div className="form-group full-width">
                    <label className="form-label" htmlFor="contact-service">Type of Project</label>
                    <select
                      id="contact-service"
                      className={`form-select${errors.service ? ' input-error' : ''}`}
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      disabled={isSending}
                    >
                      <option value="">Select a project type...</option>
                      <option value="Residential Interior">Residential Interior</option>
                      <option value="Commercial Space">Commercial Space</option>
                      <option value="Office Fit-Out">Office Fit-Out</option>
                      <option value="Hospitality & Hotel">Hospitality &amp; Hotel</option>
                      <option value="Renovation & Remodel">Renovation &amp; Remodel</option>
                      <option value="Design Consultation">Design Consultation</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.service && <span className="field-error">{errors.service}</span>}
                  </div>

                  <div className="form-group full-width">
                    <label className="form-label" htmlFor="contact-message">Tell Us About Your Space</label>
                    <textarea
                      id="contact-message"
                      className={`form-textarea${errors.message ? ' input-error' : ''}`}
                      name="message"
                      placeholder="Describe your space, style preferences, approximate budget, and timeline..."
                      value={formData.message}
                      onChange={handleChange}
                      disabled={isSending}
                    />
                    {errors.message && <span className="field-error">{errors.message}</span>}
                  </div>
                </div>

                <button
                  type="submit"
                  className="form-submit"
                  id="contact-submit-btn"
                  disabled={isSending}
                >
                  {isSending ? (
                    <span className="btn-sending">
                      <span className="sending-dot" />
                      <span className="sending-dot" />
                      <span className="sending-dot" />
                      Sending…
                    </span>
                  ) : 'Send Enquiry ✦'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
