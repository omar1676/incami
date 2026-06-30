import { Link } from 'react-router-dom'

const TYPE_BADGE = {
  home:       { label: 'Local',     bg: 'rgba(165,180,252,0.15)', color: '#a5b4fc', glow: 'rgba(165,180,252,0.3)' },
  away:       { label: 'Visitante', bg: 'rgba(249,168,212,0.15)', color: '#f9a8d4', glow: 'rgba(249,168,212,0.3)' },
  special:    { label: 'Especial',  bg: 'rgba(251,191,36,0.15)',  color: '#fbbf24', glow: 'rgba(251,191,36,0.3)'  },
  training:   { label: 'Entrena.',  bg: 'rgba(100,116,139,0.15)', color: '#94a3b8', glow: 'rgba(100,116,139,0.3)' },
  goalkeeper: { label: 'Arquero',   bg: 'rgba(52,211,153,0.15)',  color: '#34d399', glow: 'rgba(52,211,153,0.3)'  },
}

export default function ProductCard({ product }) {
  const badge = TYPE_BADGE[product.type]
  const image = product.images?.[0]

  return (
    <Link to={`/producto/${product.id}`} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column' }}>
      <div
        className="card-hover group"
        style={{
          background: 'linear-gradient(160deg, #0d0f26 0%, #0c0e22 100%)',
          border: '1px solid #1a1c38',
          borderRadius: 14, overflow: 'hidden',
          display: 'flex', flexDirection: 'column', height: '100%',
          transition: 'border-color 0.22s, box-shadow 0.22s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = '#2a2c50'
          e.currentTarget.style.boxShadow = '0 8px 40px rgba(129,140,248,0.12)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = '#1a1c38'
          e.currentTarget.style.boxShadow = 'none'
        }}
      >
        {/* Imagen 3:4 */}
        <div style={{ position: 'relative', background: '#10122a', aspectRatio: '3/4', overflow: 'hidden' }}>
          <img
            src={image}
            alt={product.name}
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', transition: 'transform 0.4s ease' }}
            className="group-hover:scale-105"
            onError={e => { e.target.src = 'https://placehold.co/300x400/0c0e22/1a1c38?text=?' }}
          />

          {/* Gradient overlay al hover */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(5,6,17,0.7) 0%, transparent 50%)',
            opacity: 0, transition: 'opacity 0.3s',
          }} className="group-hover:opacity-100" />

          {/* Badge */}
          {badge && (
            <span style={{
              position: 'absolute', top: 8, left: 8,
              background: badge.bg, color: badge.color,
              fontSize: '0.58rem', fontWeight: 800,
              padding: '3px 8px', borderRadius: 6,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              backdropFilter: 'blur(8px)',
            }}>
              {badge.label}
            </span>
          )}
        </div>

        {/* Info */}
        <div style={{ padding: '10px 12px 12px', display: 'flex', flexDirection: 'column', gap: 3, flex: 1 }}>
          <span style={{ color: '#4ade80', fontSize: '0.58rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            {product.team}
          </span>
          <span style={{ color: '#cbd5e1', fontSize: '0.78rem', fontWeight: 600, lineHeight: 1.3 }}>
            {product.name}
          </span>
          <div style={{
            marginTop: 8, padding: '7px 0', textAlign: 'center',
            background: 'rgba(74,222,128,0.05)',
            border: '1px solid rgba(74,222,128,0.1)',
            borderRadius: 8,
            color: '#4ade80', fontSize: '0.7rem', fontWeight: 700,
            transition: 'background 0.2s, border-color 0.2s',
          }} className="group-hover:bg-emerald-950/50">
            Ver detalles →
          </div>
        </div>
      </div>
    </Link>
  )
}
