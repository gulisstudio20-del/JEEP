import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { faq } from '../content.js'

export default function Faq() {
  const [open, setOpen] = useState(null)

  return (
    <section
      id="faq"
      style={{
        position: 'relative',
        padding: 'clamp(5rem, 10vw, 8rem) 0',
        background: 'linear-gradient(160deg, var(--accent) 0%, #7A1F12 100%)',
      }}
    >
      <div style={{ width: 'min(100% - 2rem, 52rem)', margin: '0 auto' }}>
        <h2
          style={{
            textAlign: 'center', color: 'var(--paper)',
            fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: 900,
            letterSpacing: '-0.02em', marginBottom: 'clamp(2.5rem, 5vw, 4rem)',
          }}
        >
          {faq.title}
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
          {faq.items.map((f, i) => {
            const isOpen = open === i
            return (
              <div
                key={f.q}
                style={{
                  borderRadius: isOpen ? '1.6rem' : 'var(--r-pill)',
                  background: 'var(--paper)',
                  overflow: 'hidden',
                  boxShadow: '0 8px 24px rgba(14,2,2,0.25)',
                  transition: 'border-radius 0.3s ease',
                }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                  style={{
                    width: '100%', padding: '1.1rem 1.6rem',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem',
                    fontWeight: 600, fontSize: '1rem', color: '#2B0A0A', textAlign: 'right',
                  }}
                >
                  {f.q}
                  <motion.span
                    aria-hidden="true"
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    style={{ color: 'var(--accent)', fontSize: '1.4rem', fontWeight: 700, lineHeight: 1, flexShrink: 0 }}
                  >
                    +
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p style={{ padding: '0 1.6rem 1.4rem', color: '#5A4A42', fontSize: '0.95rem', lineHeight: 1.7 }}>
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
