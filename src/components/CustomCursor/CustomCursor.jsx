import { useEffect, useRef } from 'react'
import './CustomCursor.css'

export default function CustomCursor() {
  const dotRef  = useRef(null)
  const orbRef  = useRef(null)

  useEffect(() => {
    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let orbX   = mouseX
    let orbY   = mouseY
    let raf

    const syncTheme = () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark'
      orbRef.current?.classList.toggle('dark', isDark)
      dotRef.current?.classList.toggle('dark', isDark)
    }

    const themeObserver = new MutationObserver(syncTheme)
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    syncTheme()

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`
      }
    }

    // Lerp — orb trails the cursor smoothly
    // Offset keeps a permanent gap between dot and orb
    const OFFSET_X = 18
    const OFFSET_Y = 18
    const animate = () => {
      orbX += (mouseX + OFFSET_X - orbX) * 0.09
      orbY += (mouseY + OFFSET_Y - orbY) * 0.09
      if (orbRef.current) {
        orbRef.current.style.transform = `translate(${orbX}px, ${orbY}px)`
      }
      raf = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove)
    animate()

    const grow   = () => orbRef.current?.classList.add('hovered')
    const shrink = () => orbRef.current?.classList.remove('hovered')

    const attach = () => {
      document.querySelectorAll('a, button, [role="button"]').forEach(el => {
        el.removeEventListener('mouseenter', grow)
        el.removeEventListener('mouseleave', shrink)
        el.addEventListener('mouseenter', grow)
        el.addEventListener('mouseleave', shrink)
      })
    }
    attach()

    const observer = new MutationObserver(attach)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      observer.disconnect()
      themeObserver.disconnect()
    }
  }, [])

  return (
    <>
      {/* Precise dot — snaps instantly */}
      <div className="cursor-dot" ref={dotRef} aria-hidden="true" />
      {/* Trailing sphere orb */}
      <div className="cursor-orb" ref={orbRef} aria-hidden="true" />
    </>
  )
}
