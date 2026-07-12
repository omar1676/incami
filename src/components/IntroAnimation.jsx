import { useIntroController } from '../controllers/useIntroController'

const PARTS = [
  { id: 'in',    text: 'in',    keep: true  },
  { id: 'fo',    text: 'fo',    keep: false },
  { id: 'sp',    text: ' ',     keep: false },
  { id: 'cami',  text: 'cami',  keep: true  },
  { id: 'setas', text: 'setas', keep: false },
]

const SIZE = 'clamp(3.5rem, 13vw, 9rem)'

export default function IntroAnimation({ onDone }) {
  const { collapsed, fadeOut } = useIntroController({ onDone })

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
        catalogue · season 26-27
      </p>
    </div>
  )
}
