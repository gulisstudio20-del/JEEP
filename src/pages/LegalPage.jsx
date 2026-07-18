import { useEffect } from 'react'

export default function LegalPage({ title, children }) {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = `${title} — טיולי ג׳יפים`
  }, [title])

  return (
    <main id="main-content" className="prose" style={{ maxWidth: 800, margin: '0 auto', padding: 'clamp(6rem, 12vw, 8rem) 1.5rem 5rem', position: 'relative', zIndex: 1 }}>
      <a href="#/" style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--accent-2)', display: 'inline-block', marginBottom: '2rem' }}>
        → חזרה לדף הבית
      </a>
      <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.4rem)', fontWeight: 900, marginBottom: '2rem' }}>{title}</h1>
      {children}
      <p style={{ color: 'var(--mute)', marginTop: 48, fontSize: '0.85rem' }}>
        עודכן: {new Date().toLocaleDateString('he-IL')}
      </p>
    </main>
  )
}
