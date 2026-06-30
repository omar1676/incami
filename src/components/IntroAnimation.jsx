import { useEffect, useState } from 'react'

const PARTS = [
  { id: 'in',    text: 'in',    keep: true  },
  { id: 'fo',    text: 'fo',    keep: false },
  { id: 'sp',    text: ' ',     keep: false },
  { id: 'cami',  text: 'cami',  keep: true  },
  { id: 'setas', text: 'setas', keep: false },
]

const SIZE = 'clamp(3.5rem, 13vw, 9rem)'

export default function IntroAnimation({ onDone }) {
  const [collapsed, setCollapsed] = useState(false)
  const [fadeOut,   setFadeOut]   = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setCollapsed(true), 900)
    const t2 = setTimeout(() => setFadeOut(true),   2100)
    const t3 = setTimeout(() => onDone(),            2600)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [onDone])

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'radial-gradient(ellipse at center, #0a0c28 0%, #050611 100%)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      zIndex: 9999,
      opacity: fadeOut ? 0 : 1,
      transition: 'opacity 0.5s ease',
      pointerEvents: fadeOut ? 'none' : 'all',
    }}>
      {/* Glow decorativo */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400, height: 400,
        background: 'radial-gradient(circle, rgba(74,222,128,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ display: 'flex', alignItems: 'baseline', lineHeight: 1 }}>
        {PARTS.map(part => (
          <span key={part.id} style={{
            fontSize: (collapsed && !part.keep) ? '0' : SIZE,
            fontWeight: 900,
            letterSpacing: '-0.04em',
            opacity: (collapsed && !part.keep) ? 0 : 1,
            color: part.keep ? '#4ade80' : 'rgba(226,232,240,0.9)',
            display: 'inline-block',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            transition: 'font-size 0.55s cubic-bezier(0.4,0,0.2,1), opacity 0.4s ease',
          }}>
            {part.text}
          </span>
        ))}
      </div>

      <p style={{
        marginTop: '1.8rem',
        fontSize: '0.65rem',
        letterSpacing: '0.3em',
        color: 'rgba(255,255,255,0.15)',
        fontWeight: 700,
        textTransform: 'uppercase',
        opacity: collapsed ? 0 : 1,
        transition: 'opacity 0.35s ease',
      }}>
        catálogo · temporada 26-27
      </p>
    </div>
  )
}
