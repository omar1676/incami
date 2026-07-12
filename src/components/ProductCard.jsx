import { Link }                    from 'react-router-dom'
import { useProductCardController } from '../controllers/useProductCardController'

export default function ProductCard({ product }) {
  const { typeInfo, fav, handleFav, t } = useProductCardController(product)
  const image = product.images?.[0]

  return (
    <Link to={`/producto/${product.id}`} style={{ textDecoration: 'none', display: 'block' }}>
      <article className="product-card" style={{
        background: '#0a0c1e', border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 16, overflow: 'hidden',
      }}>

        {/* Imagen */}
        <div style={{ position: 'relative', background: '#0d0f26', aspectRatio: '3/4', overflow: 'hidden' }}>
          <img src={image} alt={product.name} loading="lazy" className="card-img"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', transition: 'transform 0.45s ease' }}
            onError={e => { e.target.src = 'https://placehold.co/300x400/0a0c1e/161828?text=?' }}
          />
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'linear-gradient(to top, rgba(5,6,17,0.92) 0%, rgba(5,6,17,0.08) 48%, transparent 68%)',
          }} />

          {/* Badge tipo */}
          {typeInfo && (
            <span style={{
              position: 'absolute', top: 10, left: 10,
              background: typeInfo.bg, color: typeInfo.color,
              fontSize: '0.55rem', fontWeight: 800, padding: '3px 8px', borderRadius: 5,
              letterSpacing: '0.1em', textTransform: 'uppercase', backdropFilter: 'blur(8px)',
            }}>
              {t(typeInfo.labelShortKey)}
            </span>
          )}

          {/* Favorito */}
          <button onClick={handleFav} aria-label={fav ? 'Remove from favorites' : 'Add to favorites'} style={{
            position: 'absolute', top: 8, right: 8,
            background: fav ? 'rgba(248,113,113,0.2)' : 'rgba(0,0,0,0.4)',
            border: `1px solid ${fav ? 'rgba(248,113,113,0.5)' : 'rgba(255,255,255,0.12)'}`,
            borderRadius: '50%', width: 30, height: 30,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', backdropFilter: 'blur(8px)',
            transition: 'all 0.2s ease',
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24"
              fill={fav ? '#f87171' : 'none'} stroke={fav ? '#f87171' : 'rgba(255,255,255,0.7)'} strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>

          {/* Equipo */}
          <p style={{
            position: 'absolute', bottom: 10, left: 12, right: 12, margin: 0,
            color: '#4ade80', fontSize: '0.58rem', fontWeight: 800,
            letterSpacing: '0.15em', textTransform: 'uppercase',
            textShadow: '0 1px 10px rgba(0,0,0,0.95)',
          }}>
            {product.team}
          </p>
        </div>

        {/* Info */}
        <div style={{ padding: '11px 13px 15px' }}>
          <p style={{ color: '#cbd5e1', fontSize: '0.83rem', fontWeight: 600, lineHeight: 1.35, margin: '0 0 10px' }}>
            {product.name}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ color: '#475569', fontSize: '0.65rem', fontWeight: 700, background: 'rgba(255,255,255,0.04)', padding: '2px 8px', borderRadius: 5 }}>
              {product.season}
            </span>
            <span className="card-arrow" style={{ color: '#475569', fontSize: '0.78rem', display: 'inline-block', transition: 'color 0.2s ease, transform 0.2s ease' }}>
              →
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}
