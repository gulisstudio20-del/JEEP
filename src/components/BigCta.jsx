import { motion } from 'framer-motion'
import MagneticButton from './MagneticButton.jsx'
import { bigCta, contact } from '../content.js'

const ease = [0.16, 1, 0.3, 1]

export default function BigCta() {
  return (
    <section
      aria-label={bigCta.ariaLabel}
      style={{
        position: 'relative', overflow: 'hidden', textAlign: 'center',
        padding: 'clamp(6rem, 14vw, 11rem) 0',
        background: 'linear-gradient(170deg, var(--bg) 0%, #3A0F08 60%, var(--accent) 160%)',
      }}
    >
      {/* watermark ענק */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--f-mono)', fontWeight: 700, fontSize: 'clamp(14rem, 38vw, 30rem)',
          color: 'rgba(239, 234, 224, 0.025)', userSelect: 'none', lineHeight: 1, pointerEvents: 'none',
        }}
      >
        4×4
      </div>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, ease }}
        style={{ position: 'relative', zIndex: 2, width: 'min(100% - 2rem, 60rem)', margin: '0 auto' }}
      >
        <h2
          style={{
            fontSize: 'clamp(2.8rem, 7vw, 6rem)', fontWeight: 900,
            lineHeight: 1.02, letterSpacing: '-0.02em', marginBottom: '1.2rem',
          }}
        >
          {bigCta.title}<span aria-hidden="true" style={{ color: 'var(--accent-2)' }}>?</span>
        </h2>
        <p style={{ fontSize: 'clamp(1rem, 1.6vw, 1.2rem)', color: 'var(--ink-2)', fontWeight: 300, marginBottom: '2.6rem' }}>
          {bigCta.subtitle}
        </p>
        <div style={{ display: 'flex', gap: '1.4rem', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
          <MagneticButton href="#contact" className="btn-primary" style={{ padding: '1rem 2.8rem', fontSize: '1rem' }}>
            {bigCta.button}
          </MagneticButton>
          <a
            href={`tel:+972${contact.phone.replace(/[^0-9]/g, '').slice(1)}`}
            dir="ltr"
            style={{ fontFamily: 'var(--f-mono)', fontSize: '0.95rem', color: 'var(--ink-2)', textDecoration: 'underline', textUnderlineOffset: 5 }}
          >
            {contact.phone}
          </a>
        </div>
      </motion.div>
    </section>
  )
}
