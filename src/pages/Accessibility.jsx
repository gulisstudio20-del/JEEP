import LegalPage from './LegalPage.jsx'
import { brand, contact } from '../content.js'

const h2 = { fontSize: '1.4rem', fontWeight: 700, marginTop: '2.2rem', marginBottom: '0.8rem' }
const li = { display: 'flex', gap: '0.6rem', color: 'var(--ink-2)', marginBottom: '0.4rem' }

export default function Accessibility() {
  return (
    <LegalPage title="הצהרת נגישות">
      <p style={{ color: 'var(--ink-2)', lineHeight: 1.8 }}>
        {brand.name} מחויב להנגשת האתר לאנשים עם מוגבלות, בהתאם לתקן הישראלי SI 5568 ברמת AA
        ולהנחיות הנגישות הבינלאומיות WCAG 2.1.
      </p>

      <h2 style={h2}>מה עשינו</h2>
      <ul>
        {[
          'תמיכה בניווט מקלדת מלא בכל חלקי האתר',
          'תמיכה בקוראי מסך (NVDA, VoiceOver)',
          'ניגודיות צבעים העומדת בתקן WCAG 2.1 AA',
          'טקסטים חלופיים לכל התמונות',
          'תמיכה בהגדלת טקסט עד 200% ללא פגיעה בתוכן',
          'תמיכה בהעדפת צמצום תנועה (Reduced Motion)',
        ].map((item) => (
          <li key={item} style={li}>
            <span aria-hidden="true" style={{ color: 'var(--accent-2)' }}>✓</span>
            {item}
          </li>
        ))}
      </ul>

      <h2 style={h2}>פנייה בנושא נגישות</h2>
      <p style={{ color: 'var(--ink-2)', lineHeight: 1.8 }}>
        נתקלתם בבעיה? נשמח לתקן. ניתן לפנות אלינו באימייל{' '}
        <a href={`mailto:${contact.email}`} dir="ltr">{contact.email}</a> או בטלפון{' '}
        <a href={`tel:+972${contact.phone.replace(/[^0-9]/g, '').slice(1)}`} dir="ltr">{contact.phone}</a>.
        נטפל בכל פנייה תוך 5 ימי עסקים.
      </p>
    </LegalPage>
  )
}
