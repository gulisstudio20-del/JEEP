import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useTransform, animate, useInView, useReducedMotion } from 'framer-motion'
import { stats } from '../content.js'

function AnimatedNumber({ value, suffix = '', duration = 2 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const shouldReduce = useReducedMotion()
  const motionValue = useMotionValue(0)
  const rounded = useTransform(motionValue, (v) => Math.round(v).toLocaleString('he-IL') + suffix)

  useEffect(() => {
    if (!inView) return
    if (shouldReduce) { motionValue.set(value); return }
    const controls = animate(motionValue, value, { duration, ease: [0.16, 1, 0.3, 1] })
    return () => controls.stop()
  }, [inView, value, duration, shouldReduce, motionValue])

  return <motion.span ref={ref}>{rounded}</motion.span>
}

export default function StatsBand() {
  return (
    <section aria-label={stats.ariaLabel} style={{ borderBlock: '1px solid var(--line)', background: 'var(--bg-2)' }}>
      <div
        style={{
          width: 'min(100% - 2rem, 82rem)', margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 12rem), 1fr))',
          gap: '1rem', padding: 'clamp(2.5rem, 5vw, 4rem) 0',
        }}
      >
        {stats.items.map((s) => (
          <div key={s.label} style={{ textAlign: 'center', padding: '0.5rem 1rem' }}>
            <div
              style={{
                fontFamily: 'var(--f-serif)', fontWeight: 900, lineHeight: 1,
                fontSize: 'clamp(2.6rem, 5.5vw, 4rem)', color: 'var(--accent-2)',
                fontVariantNumeric: 'tabular-nums', direction: 'ltr',
              }}
            >
              <AnimatedNumber value={s.value} suffix={s.suffix} />
            </div>
            <div style={{ marginTop: '0.55rem', fontSize: '0.9rem', color: 'var(--mute)', fontWeight: 500 }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
