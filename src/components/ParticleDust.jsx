import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

// גרגירי אבק מרחפים בגוני חלודה — עומק ואווירת מדבר ב-hero.
// כבוי אוטומטית ב-reduced-motion ובמכשירי מגע.
export default function ParticleDust({ count = 55 }) {
  const canvasRef = useRef(null)
  const shouldReduce = useReducedMotion()

  useEffect(() => {
    if (shouldReduce) return
    if (window.matchMedia('(hover: none)').matches) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      const { offsetWidth: w, offsetHeight: h } = canvas.parentElement
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    const W = () => canvas.width / dpr
    const H = () => canvas.height / dpr

    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * W(),
      y: Math.random() * H(),
      r: Math.random() * 1.8 + 0.4,
      dx: (Math.random() - 0.3) * 0.22,
      dy: -(Math.random() * 0.18 + 0.04),
      wobble: Math.random() * Math.PI * 2,
      opacity: Math.random() * 0.35 + 0.08,
    }))

    let raf
    const draw = () => {
      ctx.clearRect(0, 0, W(), H())
      particles.forEach((p) => {
        p.wobble += 0.012
        p.x += p.dx + Math.sin(p.wobble) * 0.12
        p.y += p.dy
        if (p.y < -4) { p.y = H() + 4; p.x = Math.random() * W() }
        if (p.x < -4) p.x = W() + 4
        if (p.x > W() + 4) p.x = -4
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(214, 138, 96, ${p.opacity})`
        ctx.fill()
      })
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [count, shouldReduce])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2 }}
    />
  )
}
