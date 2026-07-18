import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { brand, nav } from '../content.js'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      style={{
        position: 'fixed', top: 0, right: 0, left: 0, zIndex: 100,
        transition: 'background 0.3s ease, box-shadow 0.3s ease, backdrop-filter 0.3s ease',
        background: scrolled ? 'rgba(26, 5, 5, 0.82)' : 'transparent',
        backdropFilter: scrolled ? 'blur(14px) saturate(120%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(14px) saturate(120%)' : 'none',
        boxShadow: scrolled ? '0 1px 0 var(--line)' : 'none',
      }}
    >
      <nav
        aria-label="ניווט ראשי"
        style={{
          width: 'min(100% - 2rem, 82rem)', margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          paddingBlock: scrolled ? '0.65rem' : '1.1rem',
        }}
      >
        <a href="#hero" style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem' }}>
          <span style={{ fontFamily: 'var(--f-serif)', fontWeight: 900, fontSize: '1.25rem', color: 'var(--ink)' }}>
            {brand.name}
          </span>
          <span dir="ltr" style={{ fontFamily: 'var(--f-mono)', fontSize: '0.6rem', letterSpacing: '0.22em', color: 'var(--accent-2)' }}>
            {brand.latin}
          </span>
        </a>

        <div
          className="nav-desktop"
          style={{
            background: 'rgba(239, 234, 224, 0.05)',
            border: '1px solid var(--line)',
            borderRadius: 'var(--r-pill)', padding: '0.3rem 0.5rem',
            backdropFilter: 'blur(12px)',
          }}
        >
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              style={{
                borderRadius: 'var(--r-pill)', padding: '0.35rem 0.95rem',
                fontSize: '0.85rem', fontWeight: 500, color: 'var(--ink-2)',
                transition: 'background 0.2s, color 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(239,234,224,0.09)'; e.currentTarget.style.color = 'var(--ink)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--ink-2)' }}
            >
              {item.label}
            </a>
          ))}
        </div>

        <a href="#contact" className="btn-primary nav-desktop" style={{ padding: '0.55rem 1.5rem', minWidth: 'auto', fontSize: '0.82rem' }}>
          לתיאום טיול
        </a>

        <button
          className="nav-burger"
          aria-label={open ? 'סגירת תפריט' : 'פתיחת תפריט'}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {[0, 1, 2].map((i) => (
            <span key={i} style={{ width: 24, height: 2, background: 'var(--ink)', borderRadius: 2, display: 'block' }} />
          ))}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ position: 'fixed', inset: 0, zIndex: 90, background: 'rgba(14,2,2,0.7)', backdropFilter: 'blur(4px)' }}
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <motion.aside
              role="dialog" aria-modal="true" aria-label="תפריט ניווט"
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 280, damping: 30 }}
              style={{
                position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 95,
                width: '100%', maxWidth: 340, direction: 'rtl',
                background: 'var(--bg-2)', borderInlineStart: '1px solid var(--line)',
                padding: '5.5rem 2rem 2rem', display: 'flex', flexDirection: 'column', gap: '0.4rem',
              }}
            >
              {nav.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    fontFamily: 'var(--f-serif)', fontWeight: 700, fontSize: '1.4rem',
                    padding: '0.55rem 0.25rem', borderBottom: '1px solid var(--line)',
                  }}
                >
                  {item.label}
                </motion.a>
              ))}
              <a href="#contact" onClick={() => setOpen(false)} className="btn-primary" style={{ marginTop: '1.5rem' }}>
                לתיאום טיול
              </a>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
