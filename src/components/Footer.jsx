import { brand, contact, footer } from '../content.js'

export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg-3)', borderTop: '1px solid var(--line)', padding: '2.5rem 0' }}>
      <div
        style={{
          width: 'min(100% - 2rem, 82rem)', margin: '0 auto',
          display: 'flex', flexWrap: 'wrap', gap: '1.2rem',
          alignItems: 'center', justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem' }}>
          <span style={{ fontFamily: 'var(--f-serif)', fontWeight: 900, fontSize: '1.1rem' }}>{brand.name}</span>
          <span dir="ltr" style={{ fontFamily: 'var(--f-mono)', fontSize: '0.58rem', letterSpacing: '0.22em', color: 'var(--accent-2)' }}>
            {brand.latin}
          </span>
        </div>

        <nav aria-label="קישורי מידע משפטי" style={{ display: 'flex', gap: '1.5rem' }}>
          {footer.links.map((link) => (
            <a key={link.href} href={link.href} style={{ fontSize: '0.82rem', color: 'var(--mute)', textDecoration: 'underline', textUnderlineOffset: 3 }}>
              {link.label}
            </a>
          ))}
        </nav>

        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <a href={`tel:+972${contact.phone.replace(/[^0-9]/g, '').slice(1)}`} dir="ltr" style={{ fontFamily: 'var(--f-mono)', fontSize: '0.78rem', color: 'var(--mute)' }}>
            {contact.phone}
          </a>
          <p style={{ fontSize: '0.78rem', color: 'var(--mute-2)' }}>
            © {new Date().getFullYear()} {brand.name}. {footer.rights}
          </p>
        </div>
      </div>
    </footer>
  )
}
