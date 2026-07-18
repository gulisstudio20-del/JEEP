import { motion } from 'framer-motion'
import { testimonials } from '../content.js'

const ease = [0.16, 1, 0.3, 1]
const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.11, delayChildren: 0.05 } },
}
const item = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
}

export default function Testimonials() {
  const [featured, ...rest] = testimonials.items

  return (
    <section id="testimonials" style={{ position: 'relative', padding: 'clamp(5rem, 10vw, 9rem) 0' }}>
      <div style={{ width: 'min(100% - 2rem, 82rem)', margin: '0 auto' }}>
        <motion.div
          variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
          style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 6vw, 4.5rem)' }}
        >
          <motion.h2
            variants={item}
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4.4rem)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.02em' }}
          >
            {testimonials.title}<span aria-hidden="true" style={{ color: 'var(--accent-2)' }}>.</span>
          </motion.h2>
        </motion.div>

        {/* ציטוט מוביל — pull-quote מרכזי עם בורדר conic מונפש */}
        <motion.blockquote
          variants={item} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
          className="featured-ring"
          style={{ maxWidth: '46rem', margin: '0 auto clamp(3rem, 6vw, 4.5rem)', textAlign: 'center' }}
        >
          <span aria-hidden="true" style={{ display: 'block', fontFamily: 'var(--f-serif)', fontSize: '4rem', lineHeight: 0.4, color: 'var(--accent-2)', marginBottom: '1.4rem' }}>
            ”
          </span>
          <p style={{ fontFamily: 'var(--f-serif)', fontSize: 'clamp(1.3rem, 2.4vw, 1.9rem)', fontWeight: 700, lineHeight: 1.55, color: 'var(--ink)' }}>
            {featured.text}
          </p>
          <footer style={{ marginTop: '1.4rem', fontWeight: 600, fontSize: '0.9rem', color: 'var(--accent-2)' }}>
            — {featured.name}
          </footer>
        </motion.blockquote>

        <motion.div
          variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 16rem), 1fr))',
            gap: '1.4rem',
          }}
        >
          {rest.map((t) => (
            <motion.blockquote
              key={t.name}
              variants={item}
              className="card-dark"
              style={{ padding: '1.7rem 1.6rem', background: 'var(--bg-3)', display: 'flex', flexDirection: 'column', gap: '0.9rem' }}
            >
              <p style={{ fontSize: '0.92rem', color: 'var(--ink-2)', lineHeight: 1.75, flex: 1 }}>{t.text}</p>
              <footer style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--accent-2)' }}>
                — {t.name}
              </footer>
            </motion.blockquote>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
