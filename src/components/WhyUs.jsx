import { motion } from 'framer-motion'
import { why } from '../content.js'

const ease = [0.16, 1, 0.3, 1]
const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.13, delayChildren: 0.05 } },
}
const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
}
const badge = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease } },
}

export default function WhyUs() {
  return (
    <section id="why" style={{ position: 'relative', padding: 'clamp(5rem, 10vw, 9rem) 0', overflow: 'hidden' }}>
      <img
        src={why.image} alt="" aria-hidden="true" loading="lazy" decoding="async"
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.45,
          filter: 'saturate(0.6) contrast(1.1) brightness(0.75)',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, var(--bg) 0%, rgba(26,5,5,0.72) 35%, rgba(14,2,2,0.8) 75%, var(--bg) 100%)',
        }}
      />
      {/* watermark ענק */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', bottom: '-6%', left: '-2%', pointerEvents: 'none',
          fontFamily: 'var(--f-mono)', fontWeight: 700,
          fontSize: 'clamp(11rem, 30vw, 24rem)', lineHeight: 1,
          color: 'rgba(239, 234, 224, 0.028)', userSelect: 'none',
        }}
      >
        4×4
      </div>

      <motion.div
        variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
        style={{ position: 'relative', zIndex: 2, width: 'min(100% - 2rem, 82rem)', margin: '0 auto' }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 24rem), 1fr))', gap: 'clamp(2.5rem, 6vw, 5rem)', alignItems: 'center' }}>
          <div>
            <motion.h2
              variants={item}
              style={{ fontSize: 'clamp(2.2rem, 4.6vw, 3.8rem)', fontWeight: 900, lineHeight: 1.08, letterSpacing: '-0.02em', marginBottom: '1.2rem' }}
            >
              {why.title}<span aria-hidden="true" style={{ color: 'var(--accent-2)' }}>.</span>
            </motion.h2>
            <motion.p variants={item} style={{ fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', color: 'var(--ink-2)', fontWeight: 300, marginBottom: '2.2rem' }}>
              {why.intro}
            </motion.p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              {why.badges.map((b) => (
                <motion.div
                  key={b}
                  variants={badge}
                  style={{
                    background: 'linear-gradient(120deg, var(--accent) 0%, #8A2114 100%)',
                    color: 'var(--paper)', fontWeight: 600, fontSize: '0.95rem',
                    padding: '0.8rem 1.6rem', borderRadius: 'var(--r-pill)',
                    boxShadow: '0 6px 22px var(--accent-glow), 0 1px 0 rgba(255,255,255,0.12) inset',
                    width: 'fit-content', maxWidth: '100%',
                  }}
                >
                  {b}
                </motion.div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
            {why.extras.map((text) => (
              <motion.div key={text} variants={item} className="card-dark" style={{ padding: '1.8rem 2rem' }}>
                <p style={{ color: 'var(--ink-2)', lineHeight: 1.75, fontSize: '0.98rem' }}>{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
