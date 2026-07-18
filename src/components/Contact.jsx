import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { contactSection as t, contact as contactInfo } from '../content.js'

const validate = (form) => {
  const errs = {}
  if (!form.name.trim()) errs.name = 'נא להזין שם מלא'
  if (!form.email.trim()) errs.email = 'נא להזין כתובת אימייל'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'כתובת האימייל אינה תקינה'
  if (form.phone.trim() && !/^0(5[0-9]|[2-4679])[0-9]{7}$/.test(form.phone.replace(/[\s-]/g, ''))) {
    errs.phone = 'מספר הטלפון אינו תקין'
  }
  return errs
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '' })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (!submitted) return
    const el = document.getElementById('live-region')
    if (el) el.textContent = t.successTitle
  }, [submitted])

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    if (data.get('website')) return // honeypot — בוט
    const errs = validate(form)
    setErrors(errs)
    if (Object.keys(errs).length) return
    setIsLoading(true)
    // 🔴 טופס מדומה — כשיהיה עסק אמיתי לחבר כאן EmailJS / Formspree
    setTimeout(() => {
      setIsLoading(false)
      setSubmitted(true)
    }, 1100)
  }

  const setField = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  return (
    <section id="contact" style={{ position: 'relative', background: 'var(--bg-3)', padding: 'clamp(5rem, 10vw, 8rem) 0' }}>
      <div
        style={{
          width: 'min(100% - 2rem, 68rem)', margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 22rem), 1fr))',
          gap: 'clamp(2.5rem, 6vw, 5rem)', alignItems: 'center',
        }}
      >
        <div>
          <h2
            style={{
              fontSize: 'clamp(1.8rem, 3.6vw, 2.8rem)', fontWeight: 900,
              lineHeight: 1.2, letterSpacing: '-0.02em', color: 'var(--accent-2)',
            }}
          >
            {t.title}
          </h2>
          <p style={{ marginTop: '1.2rem', color: 'var(--mute)', fontSize: '0.95rem' }}>
            מעדיפים לדבר?{' '}
            <a
              href={`tel:+972${contactInfo.phone.replace(/[^0-9]/g, '').slice(1)}`}
              dir="ltr"
              style={{ fontFamily: 'var(--f-mono)', color: 'var(--ink)', textDecoration: 'underline', textUnderlineOffset: 4 }}
            >
              {contactInfo.phone}
            </a>
          </p>
        </div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            className="card-dark"
            style={{ textAlign: 'center', padding: '3rem 1.5rem' }}
            role="status"
          >
            <div aria-hidden="true" style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--accent-2)' }}>✓</div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>{t.successTitle}</h3>
            <p style={{ color: 'var(--mute)' }}>{t.successText}</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            {/* honeypot — שדה נסתר נגד בוטים (clip במקום left שלילי, שלא ירחיב את הדף) */}
            <input
              type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true"
              style={{
                position: 'absolute', width: 1, height: 1, padding: 0, margin: -1,
                overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap',
                border: 0, opacity: 0, pointerEvents: 'none',
              }}
            />

            <div>
              <label htmlFor="contact-name" className="sr-only">{t.namePlaceholder}</label>
              <input
                id="contact-name" className="field" type="text" placeholder={t.namePlaceholder}
                value={form.name} onChange={setField('name')}
                autoComplete="name"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'err-name' : undefined}
              />
              {errors.name && (
                <span id="err-name" role="alert" style={{ color: '#E05B4A', fontSize: '0.78rem', marginTop: '0.35rem', display: 'block', paddingInlineStart: '1.2rem' }}>
                  {errors.name}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="contact-email" className="sr-only">{t.emailPlaceholder}</label>
              <input
                id="contact-email" className="field" type="email" placeholder={t.emailPlaceholder}
                value={form.email} onChange={setField('email')}
                autoComplete="email" dir="ltr" style={{ textAlign: 'right' }}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'err-email' : undefined}
              />
              {errors.email && (
                <span id="err-email" role="alert" style={{ color: '#E05B4A', fontSize: '0.78rem', marginTop: '0.35rem', display: 'block', paddingInlineStart: '1.2rem' }}>
                  {errors.email}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="contact-phone" className="sr-only">{t.phonePlaceholder}</label>
              <input
                id="contact-phone" className="field" type="tel" placeholder={t.phonePlaceholder}
                value={form.phone} onChange={setField('phone')}
                autoComplete="tel" dir="ltr" style={{ textAlign: 'right' }}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? 'err-phone' : undefined}
              />
              {errors.phone && (
                <span id="err-phone" role="alert" style={{ color: '#E05B4A', fontSize: '0.78rem', marginTop: '0.35rem', display: 'block', paddingInlineStart: '1.2rem' }}>
                  {errors.phone}
                </span>
              )}
            </div>

            <button type="submit" className="btn-primary" disabled={isLoading} style={{ opacity: isLoading ? 0.75 : 1, width: '100%' }}>
              {isLoading ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span
                    aria-hidden="true"
                    style={{
                      width: 15, height: 15, border: '2px solid rgba(239,234,224,0.3)',
                      borderTopColor: 'var(--paper)', borderRadius: '50%',
                      animation: 'spin 0.8s linear infinite', display: 'inline-block',
                    }}
                  />
                  {t.sending}
                </span>
              ) : (
                t.button
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
