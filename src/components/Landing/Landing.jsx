import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import './Landing.css'
import logoUrl from '../logo/legna-logo.svg'

export default function Landing({ onLightOn, onComplete }) {
  const wrapperRef = useRef(null)
  const flyingLogoRef = useRef(null)

  // Automatic animation sequence on component mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Additional slight delay to let the user enjoy the glow before flying to nav
          setTimeout(transitionToSite, 500)
        }
      })

      // STEP 1 — Rope Pull Down
      tl.to(['#rope', '#bulb', '#rope-hitbox'], {
        y: 40, // Moves downward only slightly (reduced from 100px)
        duration: 0.5,
        ease: 'power2.out'
      })

      // STEP 2 — Bounce Back (elastic effect)
      tl.to(['#rope', '#bulb', '#rope-hitbox'], {
        y: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.4)'
      })

      // STEP 3 & 4 — Bulb and Rope Light ON (no surrounding glow)
      tl.to(['#bulb path', '#rope path'], {
        fill: '#facc15',
        duration: 0.3
      }, '-=0.6') // Starts 0.2s after bounce starts (0.8s - 0.6s)

      // OPTIONAL — Extra Realism: Slight bulb bounce
      tl.to('#bulb', {
        scale: 1.1,
        transformOrigin: '632px 400px', // Exact center between the two hanging bulbs
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: 'power1.inOut'
      }, '<')

    }, wrapperRef)

    return () => ctx.revert()
  }, [])

  // Block scrolling during the landing sequence
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const transitionToSite = () => {
    const logoSvgNode = document.getElementById('logo')
    const navAvatar = document.querySelector('.nav-avatar')

    if (!logoSvgNode || !navAvatar) {
      onComplete()
      return
    }

    const startRect = logoSvgNode.getBoundingClientRect()

    // Position the absolute flying image precisely over the SVG group
    gsap.set(flyingLogoRef.current, {
      x: startRect.left,
      y: startRect.top,
      width: startRect.width,
      height: startRect.height,
      opacity: 1
    })

    // Hide the inline SVG group
    gsap.set(logoSvgNode, { opacity: 0 })

    // Call callback to fade in the main site (will change app opacity from 0 to 1)
    onLightOn()

    // Wait a frame so the site fade-in can initialize its layout dimensions
    requestAnimationFrame(() => {
      const finalRect = document.querySelector('.nav-avatar').getBoundingClientRect()
      const tl = gsap.timeline()

      // Fade out the dark landing background and SVG elements
      tl.to(wrapperRef.current, { backgroundColor: 'transparent', duration: 1 }, 0)
      tl.to('.landing-svg', { opacity: 0, duration: 0.8 }, 0)

      // Fly the logo matching size and position to the navbar
      tl.to(flyingLogoRef.current, {
        x: finalRect.left,
        y: finalRect.top,
        width: finalRect.width,
        height: finalRect.height,
        duration: 1.2,
        ease: 'power3.inOut',
        onComplete: () => {
          onComplete()
        }
      }, 0.2) // Slight delay for dramatic effect
    })
  }

  return (
    <div
      ref={wrapperRef}
      className="landing-wrapper"
    >
      <div className="landing-svg-container">
        <svg width="1080" height="1080" viewBox="0 0 1080 1080" className="landing-svg">
          {/* ====== DEFINITIONS (REQUIRED FOR CLIPPING) ====== */}
          <defs>
            <clipPath id="clip_1">
              <path
                transform="matrix(1,0,0,-1,0,1080)"
                d="M0 1080H1080V0H0Z"
              />
            </clipPath>
          </defs>

          {/* ================= MAIN LOGO ================= */}
          {/* Static structure including frames, dividers, and stool */}
          <g id="logo">
            <path transform="matrix(1,0,0,-1,343.7069,343.70649)" d="M0 0V-190.975H10.637V-10.637H381.949V-190.975H392.586V0Z" fill="#000000" />
            <path transform="matrix(1,0,0,-1,354.3439,545.3182)" d="M0 0H-10.637V-190.975H185.656V-180.338H0Z" fill="#000000" />
            <path transform="matrix(1,0,0,-1,555.0687,545.3182)" d="M0 0V-10.637-180.338-190.975H181.224V-180.338-95.487-90.169-84.85H88.396V-95.487H170.587V-180.338H10.637V-10.637H181.224V0H10.637Z" fill="#000000" />
            {/* Center Divider */}
            <path transform="matrix(1,0,0,-1,0,1080)" d="M539.853 705.484H529.50906V549.728H539.853Z" fill="#000000" />
            {/* Stool */}
            <path transform="matrix(1,0,0,-1,447.4336,691.5045)" d="M0 0C0-.598-.013-1.198 .018-1.795 .096-3.254 .886-3.947 2.34-3.921 3.687-3.896 4.432-3.235 4.513-1.884 4.554-1.212 4.544-.538 4.544 .136 4.546 14.726 4.545 29.317 4.545 43.908 4.546 44.771 4.545 45.634 4.545 46.497 4.774 46.539 5.002 46.582 5.23 46.624 5.544 45.78 5.949 44.957 6.161 44.088 10.686 25.485 15.18 6.875 19.717-11.725 20.012-12.933 20.306-14.424 21.148-15.136 21.996-15.855 23.525-15.766 24.757-16.031 24.868-15.097 25.253-14.097 25.049-13.239 21.232 2.763 17.359 18.753 13.465 34.737 11.697 41.996 9.853 49.237 10.616 57.049 13.643 57.049 16.701 57.189 19.739 57.003 22.085 56.86 21.994 58.395 22.118 59.862 22.286 61.846 20.745 61.243 19.782 61.246 8.124 61.279-3.536 61.28-15.194 61.244-16.151 61.241-17.679 61.867-17.561 59.883-17.464 58.255-17.354 56.817-14.966 56.993-12.008 57.211-9.022 57.045-5.463 57.045-6.039 51.96-6.184 47.081-7.203 42.392-9.649 31.141-12.501 19.979-15.197 8.783-17.001 1.296-18.837-6.184-20.6-13.681-20.768-14.398-20.701-15.787-20.422-15.878-19.518-16.174-18.125-16.417-17.545-15.932-16.555-15.103-15.688-13.794-15.378-12.537-10.719 6.341-6.163 25.244-1.561 44.136-1.356 44.977-.941 45.766-.623 46.58-.415 46.524-.207 46.467 .001 46.411V43.997C.001 29.331 0 14.666 0 0" fill="#000000" />
          </g>

          {/* ================= ROPE & BULBS ================= */}
          {/* The pendant lights act as both rope (hanging wire) and bulb */}
          <g id="rope">
            <g id="bulb">
              <path transform="matrix(1,0,0,-1,621.1279,423.1048)" d="M0 0C-.186-.053-.425-.159-.717-.265V-1.619C-1.593-1.805-2.443-1.965-3.239-2.151-3.929-2.31-4.247-2.734-4.221-3.478-4.195-4.779-4.301-6.08-4.221-7.38-4.115-9.185-4.832-10.619-5.92-11.947-6.345-12.477-6.823-13.008-7.327-13.486-11.628-17.416-13.805-22.38-14.628-28.035-14.841-29.468-14.92-30.902-15.053-32.096-12.77-32.028-10.514-31.946-8.263-31.874-6.647-35.024-3.405-37.201 .378-37.201 4.165-37.201 7.41-35.02 9.024-31.866 11.435-31.945 13.848-32.035 16.274-32.096 16.142-30.769 16.035-29.282 15.796-27.822 15-22.619 13.114-17.92 9.239-14.15 8.522-13.46 7.831-12.717 7.194-11.973 6.053-10.646 5.336-9.159 5.469-7.327 5.548-6.026 5.442-4.726 5.469-3.425 5.469-2.734 5.15-2.336 4.54-2.177 3.717-1.965 2.867-1.832 1.938-1.619 1.938-1.327 1.965-1.009 1.938-.69 1.911-.504 1.805-.186 1.699-.159 .717-.053 .929 .69 .929 1.274V53.294H0Z" fill="#231f20" />
              <path transform="matrix(1,0,0,-1,643.8226,369.8109)" d="M0 0H-.583V-33.277C-.7-33.311-.849-33.377-1.032-33.444V-34.293C-1.582-34.41-2.115-34.51-2.615-34.627-3.048-34.727-3.248-34.993-3.232-35.459-3.215-36.276-3.281-37.092-3.232-37.908-3.165-39.041-3.615-39.94-4.298-40.773-4.564-41.107-4.864-41.44-5.18-41.74-7.879-44.205-9.245-47.32-9.761-50.868-9.895-51.768-9.945-52.668-10.028-53.417-8.596-53.374-7.18-53.323-5.767-53.278-4.754-55.254-2.719-56.62-.345-56.62 2.03-56.62 4.067-55.252 5.08-53.272 6.592-53.322 8.107-53.379 9.629-53.417 9.545-52.584 9.479-51.651 9.329-50.735 8.829-47.47 7.646-44.521 5.214-42.156 4.764-41.723 4.331-41.257 3.931-40.79 3.215-39.957 2.766-39.024 2.849-37.875 2.899-37.059 2.832-36.242 2.849-35.426 2.849-34.993 2.649-34.743 2.265-34.644 1.749-34.51 1.216-34.427 .633-34.293 .633-34.11 .65-33.91 .633-33.711 .616-33.594 .55-33.394 .483-33.377-.133-33.311 0-32.844 0-32.478Z" fill="#231f20" />
            </g>
          </g>

          {/* ================= ACCENTS ================= */}
          <g id="accent" fill="#c8cbcb">
            <path transform="matrix(1,0,0,-1,359.3567,720.76589)" d="M0 0H180.57L174.888 7.331 172.326 10.637H10.477V167.424L.071 175.446H0Z" />
            <path transform="matrix(1,0,0,-1,570.5786,720.6089)" d="M0 0 2.03 .831 10.813 7.156 10.615 148.979H157.444L161.54 154.26 165.671 159.594H0Z" />
            <path transform="matrix(1,0,0,-1,712.7228,369.8109)" d="M0 0 8.084 10.433V10.637H-353.366V-164.801L-342.729-157.036V0Z" />
            <path transform="matrix(1,0,0,-1,359.41,534.6825)" d="M0 0-.053 .071V0Z" />
            <path transform="matrix(1,0,0,-1,539.9271,720.76589)" d="M0 0H.07V.053Z" />
            <path transform="matrix(1,0,0,-1,736.2495,561.0159)" d="M0 0 .043-.035V0Z" />
            <path transform="matrix(1,0,0,-1,720.7911,648.5382)" d="M0 0 .016-.013V0Z" />
            <path transform="matrix(1,0,0,-1,570.5784,720.6192)" d="M0 0V-.016H.018 .041L.01-.004 0 .01Z" />
          </g>

          {/* Invisible Hitbox for dragging matching the new bounds */}
          <rect id="rope-hitbox" x="580" y="300" width="100" height="200" fill="transparent" />
        </svg>
      </div>

      {/* Flying Image for the transition exactly matching the SVG contents */}
      <img
        ref={flyingLogoRef}
        src={logoUrl}
        alt="Logo Transition"
        className="flying-logo"
      />
    </div>
  )
}
