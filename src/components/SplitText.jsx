import { motion, useReducedMotion } from 'framer-motion'

// חשיפת כותרת מילה-אחר-מילה עם מסכה — כל מילה עולה מלמטה.
// ברמת מילים (לא אותיות) כדי לשמור על עברית + גרש שלמים.
export default function SplitText({ text, delay = 0, accentLast = false }) {
  const shouldReduce = useReducedMotion()
  const words = text.split(' ')

  if (shouldReduce) {
    return (
      <span>
        {words.map((word, i) => (
          <span key={i} style={{ color: accentLast && i === words.length - 1 ? 'var(--accent-2)' : undefined }}>
            {word}{i < words.length - 1 ? ' ' : ''}
          </span>
        ))}
      </span>
    )
  }

  return (
    <span aria-label={text} role="text">
      {words.map((word, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{
            display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom',
            paddingBottom: '0.08em', marginBottom: '-0.08em',
            marginInlineEnd: i < words.length - 1 ? '0.26em' : 0,
          }}
        >
          <motion.span
            initial={{ y: '115%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 0.85, delay: delay + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'inline-block',
              color: accentLast && i === words.length - 1 ? 'var(--accent-2)' : undefined,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
