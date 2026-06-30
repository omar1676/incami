import { Link } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts'
import ProductCard from '../components/ProductCard'

function SkeletonCard() {
  return (
    <div style={{ borderRadius: 14, overflow: 'hidden', background: '#0c0e22', border: '1px solid #1a1c38' }}>
      <div style={{ aspectRatio: '3/4', background: '#10122a' }} />
      <div style={{ padding: '10px 12px 12px', display: 'flex', flexDirection: 'column', gap: 7 }}>
        <div style={{ height: 7, borderRadius: 4, background: '#1a1c38', width: '40%' }} />
        <div style={{ height: 10, borderRadius: 4, background: '#1a1c38', width: '70%' }} />
        <div style={{ height: 30, borderRadius: 8, background: '#151730', marginTop: 4 }} />
      </div>
    </div>
  )
}

export default function Home() {
  const { products, loading } = useProducts()
  const selecciones = products.filter(p => p.category === 'selecciones')
  const clubes      = products.filter(p => p.category === 'clubes')

  return (
    <div className="page-in">

      {/* ══ HERO ══ */}
      <section style={{
        minHeight: '92vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center',
        padding: '5rem 1.5rem 4rem',
        position: 'relative', overflow: 'hidden',
        background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(165,180,252,0.07) 0%, transparent 60%), #050611',
      }}>
        {/* blobs decorativos */}
        <div style={{ position: 'absolute', top: '15%', left: '10%', width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(74,222,128,0.04) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '8%', width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(165,180,252,0.05) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '40%', right: '15%', width: 180, height: 180, borderRadius: '50%', background: 'radial-gradient(circle, rgba(249,168,212,0.04) 0%, transparent 70%)', filter: 'blur(30px)', pointerEvents: 'none' }} />

        {/* pill */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.2)',
          borderRadius: 999, padding: '6px 20px', marginBottom: '2.5rem',
        }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ade80', display: 'inline-block', boxShadow: '0 0 8px #4ade80' }} />
          <span style={{ color: '#4ade80', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase' }}>
            Temporada 2026 · 27
          </span>
        </div>

        {/* INCAMI grande */}
        <h1 style={{
          fontSize: 'clamp(5.5rem, 22vw, 14rem)',
          fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 0.85,
          margin: '0 0 1.75rem', userSelect: 'none',
          textShadow: '0 0 80px rgba(165,180,252,0.12)',
        }}>
          <span style={{ color: '#4ade80', textShadow: '0 0 60px rgba(74,222,128,0.3)' }}>IN</span>
          <span style={{ color: '#e2e8f0' }}>CAMI</span>
        </h1>

        <p style={{ color: '#475569', fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', fontWeight: 400, lineHeight: 1.7, maxWidth: 400, marginBottom: '3.5rem' }}>
          Catálogo de camisetas de fútbol.<br />Selecciones y clubes — temporada 26-27.
        </p>

        {/* Stats */}
        <div style={{ display: 'flex', gap: '3.5rem', justifyContent: 'center', marginBottom: '4rem', flexWrap: 'wrap' }}>
          {[
            { n: selecciones.length, label: 'Selecciones', color: '#a5b4fc' },
            { n: products.length,    label: 'Camisetas',   color: '#4ade80' },
            { n: clubes.length,      label: 'Clubes',      color: '#f9a8d4' },
          ].map(({ n, label, color }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color, lineHeight: 1, textShadow: `0 0 30px ${color}50` }}>
                {loading ? '—' : n}
              </div>
              <div style={{ fontSize: '0.6rem', color: '#1e2240', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginTop: 5 }}>
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '0.875rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/catalogo/selecciones" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'linear-gradient(135deg, #818cf8, #6366f1)',
            color: '#fff', fontWeight: 800, fontSize: '0.88rem', letterSpacing: '0.04em',
            padding: '13px 28px', borderRadius: 12, textDecoration: 'none',
            boxShadow: '0 4px 24px rgba(129,140,248,0.35)',
            transition: 'transform 0.15s, box-shadow 0.15s',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 8px 32px rgba(129,140,248,0.5)' }}
            onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 4px 24px rgba(129,140,248,0.35)' }}
          >🌍 Selecciones</Link>

          <Link to="/catalogo/clubes" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'linear-gradient(135deg, #f9a8d4, #ec4899)',
            color: '#fff', fontWeight: 800, fontSize: '0.88rem', letterSpacing: '0.04em',
            padding: '13px 28px', borderRadius: 12, textDecoration: 'none',
            boxShadow: '0 4px 24px rgba(236,72,153,0.35)',
            transition: 'transform 0.15s, box-shadow 0.15s',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 8px 32px rgba(236,72,153,0.5)' }}
            onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 4px 24px rgba(236,72,153,0.35)' }}
          >⚽ Clubes</Link>

          <Link to="/catalogo" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
            color: '#64748b', fontWeight: 700, fontSize: '0.88rem',
            padding: '13px 22px', borderRadius: 12, textDecoration: 'none',
            transition: 'all 0.15s',
          }}
            onMouseEnter={e => { e.currentTarget.style.color='#94a3b8'; e.currentTarget.style.borderColor='rgba(255,255,255,0.14)' }}
            onMouseLeave={e => { e.currentTarget.style.color='#64748b'; e.currentTarget.style.borderColor='rgba(255,255,255,0.08)' }}
          >Ver todo →</Link>
        </div>
      </section>

      {/* ══ CATEGORÍAS ══ */}
      <section style={{ padding: '0 1.5rem 6rem', background: '#050611' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>

          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <p style={{ color: '#1a1c38', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 10 }}>Categorías</p>
            <h2 style={{ color: '#e2e8f0', fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', fontWeight: 900, letterSpacing: '-0.03em', margin: 0 }}>¿Qué querés ver?</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>

            {/* SELECCIONES */}
            <Link to="/catalogo/selecciones" style={{ textDecoration: 'none' }}>
              <div className="card-hover" style={{
                background: 'linear-gradient(145deg, #08092e 0%, #0f1245 100%)',
                border: '1px solid rgba(165,180,252,0.18)',
                borderRadius: 18, padding: '2rem',
                display: 'flex', flexDirection: 'column', gap: 12,
                position: 'relative', overflow: 'hidden',
                boxShadow: '0 2px 20px rgba(129,140,248,0.06)',
              }}>
                <div style={{ position: 'absolute', top: -40, right: -40, width: 150, height: 150, background: 'radial-gradient(circle, rgba(165,180,252,0.15) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
                <span style={{ fontSize: '2.2rem', lineHeight: 1 }}>🌍</span>
                <div>
                  <div style={{ color: '#a5b4fc', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 6 }}>Nacional</div>
                  <div style={{ color: '#e2e8f0', fontSize: '1.6rem', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1 }}>Selecciones</div>
                </div>
                <p style={{ color: 'rgba(165,180,252,0.35)', fontSize: '0.82rem', lineHeight: 1.5, margin: 0 }}>
                  Argentina · Brasil · Francia · España · Portugal y más
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px solid rgba(165,180,252,0.1)' }}>
                  <span style={{ color: '#a5b4fc', fontSize: '0.8rem', fontWeight: 700 }}>{loading ? '...' : `${selecciones.length} modelos`}</span>
                  <span style={{ color: '#a5b4fc', fontSize: '1.1rem' }}>→</span>
                </div>
              </div>
            </Link>

            {/* CLUBES */}
            <Link to="/catalogo/clubes" style={{ textDecoration: 'none' }}>
              <div className="card-hover" style={{
                background: 'linear-gradient(145deg, #16061e 0%, #240830 100%)',
                border: '1px solid rgba(249,168,212,0.18)',
                borderRadius: 18, padding: '2rem',
                display: 'flex', flexDirection: 'column', gap: 12,
                position: 'relative', overflow: 'hidden',
                boxShadow: '0 2px 20px rgba(236,72,153,0.06)',
              }}>
                <div style={{ position: 'absolute', top: -40, right: -40, width: 150, height: 150, background: 'radial-gradient(circle, rgba(249,168,212,0.12) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
                <span style={{ fontSize: '2.2rem', lineHeight: 1 }}>⚽</span>
                <div>
                  <div style={{ color: '#f9a8d4', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 6 }}>Club</div>
                  <div style={{ color: '#e2e8f0', fontSize: '1.6rem', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1 }}>Clubes</div>
                </div>
                <p style={{ color: 'rgba(249,168,212,0.35)', fontSize: '0.82rem', lineHeight: 1.5, margin: 0 }}>
                  Real Madrid · Barcelona · Arsenal · PSG · Liverpool y más
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px solid rgba(249,168,212,0.1)' }}>
                  <span style={{ color: '#f9a8d4', fontSize: '0.8rem', fontWeight: 700 }}>{loading ? '...' : `${clubes.length} modelos`}</span>
                  <span style={{ color: '#f9a8d4', fontSize: '1.1rem' }}>→</span>
                </div>
              </div>
            </Link>

            {/* TODO */}
            <Link to="/catalogo" style={{ textDecoration: 'none' }}>
              <div className="card-hover" style={{
                background: 'linear-gradient(145deg, #070a14 0%, #0c1020 100%)',
                border: '1px solid rgba(74,222,128,0.14)',
                borderRadius: 18, padding: '2rem',
                display: 'flex', flexDirection: 'column', gap: 12,
                position: 'relative', overflow: 'hidden',
                boxShadow: '0 2px 20px rgba(74,222,128,0.04)',
              }}>
                <div style={{ position: 'absolute', top: -40, right: -40, width: 150, height: 150, background: 'radial-gradient(circle, rgba(74,222,128,0.08) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
                <span style={{ fontSize: '2.2rem', lineHeight: 1 }}>🗂️</span>
                <div>
                  <div style={{ color: '#4ade80', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 6 }}>Completo</div>
                  <div style={{ color: '#e2e8f0', fontSize: '1.6rem', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1 }}>Todo</div>
                </div>
                <p style={{ color: 'rgba(74,222,128,0.25)', fontSize: '0.82rem', lineHeight: 1.5, margin: 0 }}>
                  Ver el catálogo completo sin filtros
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px solid rgba(74,222,128,0.08)' }}>
                  <span style={{ color: '#4ade80', fontSize: '0.8rem', fontWeight: 700 }}>{loading ? '...' : `${products.length} camisetas`}</span>
                  <span style={{ color: '#4ade80', fontSize: '1.1rem' }}>→</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ══ SELECCIONES ══ */}
      <section style={{ padding: '4rem 1.5rem', borderTop: '1px solid rgba(255,255,255,0.04)', background: 'linear-gradient(180deg, #060714 0%, #050611 100%)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <div>
              <p style={{ color: '#a5b4fc', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 5px' }}>Sección</p>
              <h2 style={{ color: '#e2e8f0', fontSize: '1.6rem', fontWeight: 900, letterSpacing: '-0.03em', margin: 0 }}>Selecciones</h2>
            </div>
            <Link to="/catalogo/selecciones" style={{ color: '#1e2240', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#a5b4fc'}
              onMouseLeave={e => e.currentTarget.style.color = '#1e2240'}
            >Ver todas →</Link>
          </div>
          {loading
            ? <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px,1fr))', gap: 12 }}>{[...Array(12)].map((_,i) => <SkeletonCard key={i} />)}</div>
            : <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px,1fr))', gap: 12 }}>{selecciones.map(p => <ProductCard key={p.id} product={p} />)}</div>
          }
        </div>
      </section>

      {/* ══ CLUBES ══ */}
      <section style={{ padding: '4rem 1.5rem 6rem', borderTop: '1px solid rgba(255,255,255,0.04)', background: '#050611' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <div>
              <p style={{ color: '#f9a8d4', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 5px' }}>Sección</p>
              <h2 style={{ color: '#e2e8f0', fontSize: '1.6rem', fontWeight: 900, letterSpacing: '-0.03em', margin: 0 }}>Clubes</h2>
            </div>
            <Link to="/catalogo/clubes" style={{ color: '#1e2240', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#f9a8d4'}
              onMouseLeave={e => e.currentTarget.style.color = '#1e2240'}
            >Ver todos →</Link>
          </div>
          {loading
            ? <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px,1fr))', gap: 12 }}>{[...Array(12)].map((_,i) => <SkeletonCard key={i} />)}</div>
            : <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px,1fr))', gap: 12 }}>{clubes.map(p => <ProductCard key={p.id} product={p} />)}</div>
          }
        </div>
      </section>

    </div>
  )
}
