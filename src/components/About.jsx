import { motion, useReducedMotion } from 'framer-motion'
import Duotone from './Duotone.jsx'
import { about } from '../content.js'

const ease = [0.16, 1, 0.3, 1]
const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
}
const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
}

export default function About() {
  const shouldReduce = useReducedMotion()

  return (
    <section id="about" style={{ position: 'relative', padding: 'clamp(5rem, 10vw, 9rem) 0' }}>
      <motion.div
        variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
        style={{ position: 'relative', zIndex: 2, width: 'min(100% - 2rem, 52rem)', margin: '0 auto', textAlign: 'center' }}
      >
        <motion.p
          variants={item}
          style={{ fontFamily: 'var(--f-serif)', fontSize: '1.15rem', color: 'var(--ink-2)', marginBottom: '1rem' }}
        >
          {about.label}
        </motion.p>

        <motion.h2
          variants={item}
          style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: 900, lineHeight: 1.08, letterSpacing: '-0.02em', marginBottom: '2.6rem' }}
        >
          {about.title}
          <br />
          <span style={{ color: 'var(--accent-2)' }}>{about.titleAccent}</span>
        </motion.h2>

        {/* תמונת הנגב — חשיפת clip-path */}
        <motion.div
          initial={shouldReduce ? false : { clipPath: 'inset(0 100% 0 0 round 2rem)' }}
          whileInView={{ clipPath: 'inset(0 0% 0 0 round 2rem)' }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1] }}
          style={{ marginBottom: '2.8rem', borderRadius: '2rem' }}
        >
          <Duotone
            src={about.image}
            alt={about.imageAlt}
            loading="lazy"
            decoding="async"
            width={1600}
            height={900}
            strength={0.85}
            style={{ aspectRatio: '21 / 9', borderRadius: '2rem' }}
          />
        </motion.div>

        <motion.div variants={item} style={{ marginBottom: '2.6rem' }}>
          {about.poem.map((line) => (
            <p key={line} style={{ fontSize: 'clamp(1.05rem, 1.7vw, 1.35rem)', fontWeight: 300, color: 'var(--ink-2)', lineHeight: 1.8 }}>
              {line}
            </p>
          ))}
        </motion.div>

        <motion.div variants={item}>
          <span style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', color: 'var(--accent-2)', marginBottom: '0.5rem' }}>
            {about.qLabel}
          </span>
          <p style={{ fontFamily: 'var(--f-serif)', fontSize: 'clamp(1.4rem, 2.6vw, 2rem)', fontWeight: 700, marginBottom: '0.6rem' }}>
            {about.answer}
          </p>
          <p style={{ fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', color: 'var(--ink-2)', fontWeight: 300 }}>
            {about.answer2}
          </p>
        </motion.div>

        {/* כרטיס נקודות — כמו בסקיצה */}
        <motion.ul
          variants={item}
          className="card-dark"
          style={{
            margin: '3rem auto 0', maxWidth: '30rem', padding: '2rem 2.2rem',
            display: 'flex', flexDirection: 'column', gap: '1.1rem', textAlign: 'center',
          }}
        >
          {about.bullets.map((b) => (
            <li key={b} style={{ display: 'flex', alignItems: 'baseline', gap: '0.7rem', textAlign: 'right' }}>
              <span aria-hidden="true" style={{ color: 'var(--accent-2)', fontFamily: 'var(--f-mono)', flexShrink: 0 }}>✦</span>
              <span style={{ color: 'var(--ink-2)' }}>{b}</span>
            </li>
          ))}
        </motion.ul>

        <motion.p
          variants={item}
          style={{ marginTop: '2.8rem', fontFamily: 'var(--f-serif)', fontStyle: 'italic', fontSize: '1.05rem', color: 'var(--mute)' }}
        >
          {about.outro}
        </motion.p>
      </motion.div>
    </section>
  )
}
