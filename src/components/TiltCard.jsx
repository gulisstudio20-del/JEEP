import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate, useReducedMotion } from 'framer-motion'

// כרטיס שנוטה עדין עם העכבר + glare — דסקטופ בלבד.
export default function TiltCard({ children, max = 5, style, ...rest }) {
  const ref = useRef(null)
  const shouldReduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useTransform(y, [-0.5, 0.5], [max, -max])
  const rotateY = useTransform(x, [-0.5, 0.5], [-max, max])
  const glareX = useTransform(x, [-0.5, 0.5], ['15%', '85%'])
  const glareY = useTransform(y, [-0.5, 0.5], ['15%', '85%'])
  const springX = useSpring(rotateX, { stiffness: 180, damping: 20 })
  const springY = useSpring(rotateY, { stiffness: 180, damping: 20 })
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(239,234,224,0.10) 0%, transparent 55%)`

  const handleMouseMove = (e) => {
    if (shouldReduce) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const handleMouseLeave = () => { x.set(0); y.set(0) }

  return (
    <motion.div
      ref={ref}
      style={{ rotateX: springX, rotateY: springY, transformStyle: 'preserve-3d', perspective: 900, position: 'relative', ...style }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      {children}
      <motion.div
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, borderRadius: 'inherit', pointerEvents: 'none', background: glare }}
      />
    </motion.div>
  )
}
