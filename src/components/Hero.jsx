import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import SplitText from './SplitText.jsx'
import ParticleDust from './ParticleDust.jsx'
import MagneticButton from './MagneticButton.jsx'
import { hero } from '../content.js'

const ease = [0.16, 1, 0.3, 1]

export default function Hero() {
  const ref = useRef(null)
  const shouldReduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  // פרלקסה: התמונה זזה לאט, ה-glow לאט יותר, התוכן דוהה בגלילה
  const imgY = useTransform(scrollYProgress, [0, 1], shouldReduce ? ['0%', '0%'] : ['0%', '14%'])
  const glowY = useTransform(scrollYProgress, [0, 1], shouldReduce ? ['0%', '0%'] : ['0%', '30%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, shouldReduce ? 1 : 0])
  const contentY = useTransform(scrollYProgress, [0, 0.55], ['0%', shouldReduce ? '0%' : '-10%'])

  return (
    <section
      id="hero"
      ref={ref}
      className="grain"
      style={{ position: 'relative', minHeight: '100svh', overflow: 'hidden', display: 'flex', alignItems: 'flex-start' }}
    >
      {/* התמונה — הג'יפים בתחתית הפריים נשארים גלויים */}
      <motion.div aria-hidden="true" style={{ y: imgY, position: 'absolute', inset: '-8% 0 0 0', willChange: 'transform' }}>
        <img
          src={hero.image}
          alt=""
          fetchPriority="high"
          style={{ width: '100%', height: '108%', objectFit: 'cover', objectPosition: 'center bottom' }}
        />
        {/* כהה למעלה (מאחורי הטקסט), שקוף באמצע-מטה כדי לא להסתיר את הג'יפים */}
        <div
          style={{
            position: 'absolute', inset: 0,
            background:
              'linear-gradient(to bottom, rgba(26,5,5,0.82) 0%, rgba(26,5,5,0.55) 30%, rgba(26,5,5,0.08) 55%, rgba(26,5,5,0.05) 80%, var(--bg) 100%)',
          }}
        />
      </motion.div>

      {/* glow שקיעה בפרלקסה שונה */}
      <motion.div
        aria-hidden="true"
        style={{
          y: glowY, position: 'absolute', top: '-14%', left: '10%',
          width: 'min(42rem, 65vw)', aspectRatio: '1', borderRadius: '50%', pointerEvents: 'none',
          background: 'radial-gradient(circle, rgba(200,64,44,0.22) 0%, transparent 62%)',
          filter: 'blur(50px)', willChange: 'transform',
        }}
      />

      {/* אבק מדברי */}
      <ParticleDust />

      {/* תוכן — בחלק העליון, מתחת לנאבבר */}
      <motion.div
        style={{
          opacity: contentOpacity, y: contentY,
          position: 'relative', zIndex: 3,
          width: 'min(100% - 2rem, 82rem)', margin: '0 auto',
          paddingTop: 'clamp(7rem, 14vh, 10rem)',
          textAlign: 'center',
        }}
      >
        <motion.span
          initial={shouldReduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease }}
          className="section-label"
          style={{ fontSize: '0.8rem', textShadow: '0 1px 12px rgba(14,2,2,0.8)' }}
        >
          {hero.label}
        </motion.span>

        <h1
          style={{
            fontSize: 'clamp(3.2rem, 9vw, 6rem)', fontWeight: 400,
            lineHeight: 1.02, letterSpacing: '-0.01em', marginBottom: '1.2rem',
            textShadow: '0 2px 24px rgba(14,2,2,0.55)',
          }}
        >
          <SplitText text={`${hero.titleA} ${hero.titleB}`} delay={0.3} accentLast />
        </h1>

        <motion.p
          initial={shouldReduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75, ease }}
          style={{
            fontSize: 'clamp(1.05rem, 1.6vw, 1.3rem)', color: 'var(--ink)',
            maxWidth: '38rem', margin: '0 auto 2rem', fontWeight: 300,
            textShadow: '0 1px 16px rgba(14,2,2,0.7)',
          }}
        >
          {hero.subtitle}
        </motion.p>

        <motion.div
          initial={shouldReduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.95, ease }}
          style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <MagneticButton href="#contact" className="btn-primary">
            {hero.ctaPrimary}
          </MagneticButton>
          <a href="#routes" className="btn-outline" style={{ background: 'rgba(14,2,2,0.35)' }}>
            {hero.ctaSecondary}
          </a>
        </motion.div>
      </motion.div>

      {/* חיתוך אלכסוני אדום נמוך — לא מסתיר את הג'יפים */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', bottom: -1, left: 0, right: 0, zIndex: 4,
          height: 'clamp(2.5rem, 5.5vw, 4.5rem)',
          background: 'linear-gradient(120deg, var(--accent) 0%, #7A1F12 100%)',
          clipPath: 'polygon(0 62%, 55% 8%, 100% 55%, 100% 100%, 0 100%)',
        }}
      />
    </section>
  )
}
