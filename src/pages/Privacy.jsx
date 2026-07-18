import LegalPage from './LegalPage.jsx'
import { brand, contact } from '../content.js'

const h2 = { fontSize: '1.4rem', fontWeight: 700, marginTop: '2.2rem', marginBottom: '0.8rem' }
const p = { color: 'var(--ink-2)', lineHeight: 1.8, marginBottom: '0.8rem' }

export default function Privacy() {
  return (
    <LegalPage title="מדיניות פרטיות">
      <p style={p}>
        הפרטיות שלכם חשובה לנו. מסמך זה מפרט איזה מידע נאסף באתר {brand.name} וכיצד אנו משתמשים בו.
      </p>

      <h2 style={h2}>איזה מידע אנחנו אוספים</h2>
      <p style={p}>
        בעת מילוי טופס יצירת הקשר נאספים הפרטים שהזנתם בלבד: שם מלא, כתובת אימייל ומספר טלפון.
        איננו אוספים מידע נוסף ללא ידיעתכם.
      </p>

      <h2 style={h2}>למה אנחנו משתמשים במידע</h2>
      <p style={p}>
        הפרטים משמשים אך ורק למענה לפנייתכם ולתיאום הטיול. איננו מעבירים את המידע לצדדים שלישיים
        ואיננו שולחים דיוור פרסומי ללא הסכמה מפורשת.
      </p>

      <h2 style={h2}>עוגיות (Cookies)</h2>
      <p style={p}>
        האתר עושה שימוש מינימלי בעוגיות הנחוצות לתפקודו בלבד. איננו משתמשים בעוגיות מעקב פרסומיות.
      </p>

      <h2 style={h2}>זכויותיכם</h2>
      <p style={p}>
        בהתאם לחוק הגנת הפרטיות, עומדת לכם הזכות לעיין במידע שנאסף עליכם, לבקש את תיקונו או את
        מחיקתו. לכל בקשה ניתן לפנות אלינו באימייל{' '}
        <a href={`mailto:${contact.email}`} dir="ltr">{contact.email}</a>.
      </p>
    </LegalPage>
  )
}
