// עטיפת art-direction: כל תמונה באתר עוברת דרך grade אחיד לפלטת הבורדו,
// כך שתמונות ממקורות שונים מרגישות סשן צילום אחד.
export default function Duotone({ src, alt = '', imgStyle = {}, style = {}, strength = 1, ...imgProps }) {
  return (
    <div style={{ position: 'relative', overflow: 'hidden', width: '100%', minWidth: 0, ...style }}>
      <img
        src={src}
        alt={alt}
        style={{
          width: '100%', height: '100%', objectFit: 'cover', display: 'block',
          filter: 'saturate(0.68) contrast(1.08) brightness(0.88)',
          ...imgStyle,
        }}
        {...imgProps}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'linear-gradient(165deg, rgba(26,5,5,0.55) 0%, rgba(122,31,18,0.35) 55%, rgba(14,2,2,0.6) 100%)',
          mixBlendMode: 'multiply', opacity: strength,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at 30% 20%, rgba(200,64,44,0.28) 0%, transparent 60%)',
          mixBlendMode: 'soft-light', opacity: strength,
        }}
      />
    </div>
  )
}
