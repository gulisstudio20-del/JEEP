# Design

## Visual Theme
כהה, מדברי, "שקיעה אחרונה בשטח": בורדו כמעט-שחור עם אדום-חלודה שרוף וטקסט שמנת. טקסטורת גריד אדומה עדינה (בהשראת DRAMA GEMS) + noise קל. חיתוכים אלכסוניים אדומים בין סקשנים — המוטיב מהסקיצות המקוריות (pics/).

## Color Palette
| Token | Value | Role |
|---|---|---|
| `--bg` | `#1A0505` | רקע ראשי (בורדו כמעט שחור) |
| `--bg-2` | `#2B0A0A` | משטחים, מגירת מובייל |
| `--bg-3` | `#0E0202` | כרטיסים כהים, פוטר, contact |
| `--accent` | `#A52A1A` | אדום-חלודה — CTA, פס FAQ, חיתוכים |
| `--accent-2` | `#C8402C` | hover, כותרות משנה, הדגשות |
| `--paper` | `#EFEAE0` | שמנת — טקסט ראשי, אקורדיוני FAQ |
| `--ink` / `--ink-2` | `#EFEAE0` / `#D9D2C4` | טקסט |
| `--mute` / `--mute-2` | `#B8A99A` / `#8A7A6C` | טקסט משני |

אסטרטגיה: **Committed** — האדום-בורדו נושא 30–60% מהמשטח (hero cut, FAQ band, badges, CTA). לא restrained-עם-נגיעות.

## Typography
- **כותרות:** Frank Ruhl Libre 700/900 — serif עברי עם אופי, מקבילה ל-serif של ה-INSPO.
- **גוף:** Heebo 300/400/500/700.
- **תגיות/מספרים לטיניים:** JetBrains Mono — בשימוש חסכוני (מורשת ה-INSPO), לא כתחפושת טכנית.
- סקאלה: clamp() לכל הכותרות; H1 hero עד ~6rem; line-height 0.98–1.1 לכותרות, 1.6–1.8 לגוף (רקע כהה → מרווח יותר).

## Components
- **כפתורים:** pill (999px). ראשי = accent מלא + glow + translateY hover. משני = outline + blur.
- **כרטיסי מסלולים:** צורת קשת (radius עליון ענק) על `--bg-3`, תמונה 4:3 למעלה.
- **FAQ:** פס accent מלא, אקורדיוני pill בשמנת, framer-motion height.
- **טפסים:** שדות pill כהים, ולידציה בעברית, honeypot (clip, לא left שלילי!).
- **חיתוכים:** clip-path polygon אלכסוני, gradient אדום→בורדו.

## Layout
- Container: `min(100% - 2rem, 82rem)`.
- Sections: `padding: clamp(5rem, 10vw, 9rem) 0`.
- RTL מלא: logical properties בלבד (margin-inline-start וכו').
- גרידים: `repeat(auto-fit, minmax(min(100%, Xrem), 1fr))` — בלי breakpoints.

## Motion
- Ease: `cubic-bezier(0.16, 1, 0.3, 1)` בלבד.
- Stagger reveals ב-whileInView (once: true), פרלקסה עדינה ב-hero.
- Reduced motion מכובד בכל אנימציה.
