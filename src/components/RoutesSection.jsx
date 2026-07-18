import { motion } from 'framer-motion'
import Duotone from './Duotone.jsx'
import TiltCard from './TiltCard.jsx'
import { routes } from '../content.js'

const ease = [0.16, 1, 0.3, 1]

export default function RoutesSection() {
  return (
    <section id="routes" style={{ position: 'relative', padding: 'clamp(5rem, 10vw, 9rem) 0 clamp(3rem, 6vw, 5rem)' }}>
      <div style={{ width: 'min(100% - 2rem, 76rem)', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease }}
          style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 6vw, 4.5rem)' }}
        >
          <h2 style={{ fontSize: 'clamp(2.4rem, 5vw, 4.4rem)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.02em' }}>
            {routes.title}<span aria-hidden="true" style={{ color: 'var(--accent-2)' }}>.</span>
          </h2>
        </motion.div>

        {/* sticky stack — כל פאנל נצמד והבא מחליק מעליו (דסקטופ); ערימה רגילה במובייל */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1.4rem, 3vw, 2.5rem)' }}>
          {routes.items.map((route, i) => (
            <div key={route.id} className="route-sticky" style={{ '--stack-i': i }}>
              <TiltCard max={2.5} style={{ borderRadius: '2rem' }}>
                <motion.article
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.85, ease }}
                  className="route-panel"
                  style={{
                    background: 'var(--bg-3)',
                    border: '1px solid var(--line)',
                    borderRadius: '2rem',
                    overflow: 'hidden',
                    boxShadow: '0 24px 60px -20px rgba(0,0,0,0.6)',
                  }}
                >
                  <Duotone
                    src={route.image}
                    alt={route.imageAlt}
                    loading="lazy"
                    decoding="async"
                    width={900}
                    height={600}
                    style={{ minHeight: '16rem' }}
                    imgStyle={{ transition: 'transform 0.8s var(--ease-out-expo)' }}
                  />
                  <div className="route-panel-body">
                    <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--mute)', display: 'block', marginBottom: '0.6rem' }}>
                      {route.tag}
                    </span>
                    <h3 style={{ color: 'var(--accent-2)', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '0.9rem' }}>
                      {route.title}
                    </h3>
                    <p
                      style={{
                        fontSize: '0.98rem', color: 'var(--ink-2)', lineHeight: 1.75, marginBottom: '1.6rem', maxWidth: '32rem',
                        display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 3, overflow: 'hidden',
                      }}
                    >
                      {route.text}
                    </p>
                    <a
                      href="#contact"
                      className="btn-primary"
                      style={{ padding: '0.65rem 1.8rem', minWidth: 'auto', fontSize: '0.85rem' }}
                      aria-label={`לפרטים והזמנה — ${route.title}`}
                    >
                      {routes.cta}
                    </a>
                  </div>
                </motion.article>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
