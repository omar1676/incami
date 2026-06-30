import { useNavigate, useParams } from 'react-router-dom'
import { useState, useMemo } from 'react'
import { useProducts } from '../hooks/useProducts'
import ProductCard from '../components/ProductCard'

const CATS = [
  { val: '',             label: 'Todo',        accent: '#4ade80', glow: 'rgba(74,222,128,0.3)'   },
  { val: 'selecciones',  label: 'Selecciones', accent: '#a5b4fc', glow: 'rgba(165,180,252,0.3)'  },
  { val: 'clubes',       label: 'Clubes',      accent: '#f9a8d4', glow: 'rgba(249,168,212,0.3)'  },
]

function SkeletonCard() {
  return (
    <div style={{ borderRadius: 14, overflow: 'hidden', background: '#0c0e22', border: '1px solid #1a1c38' }}>
      <div style={{ aspectRatio: '3/4', background: '#10122a' }} />
      <div style={{ padding: '10px 12px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ height: 7, borderRadius: 4, background: '#1a1c38', width: '40%' }} />
        <div style={{ height: 10, borderRadius: 4, background: '#1a1c38', width: '75%' }} />
        <div style={{ height: 28, borderRadius: 8, background: '#151730', marginTop: 4 }} />
      </div>
    </div>
  )
}

export default function Catalog() {
  const { cat: catParam } = useParams()
  const navigate = useNavigate()
  const { products, loading } = useProducts()
  const activeCat = catParam ?? ''
  const [search, setSearch] = useState('')
  const catInfo = CATS.find(c => c.val === activeCat) ?? CATS[0]

  const filtered = useMemo(() => products.filter(p => {
    const matchCat = !activeCat || p.category === activeCat
    const q = search.toLowerCase()
    const matchQ = !q || p.name.toLowerCase().includes(q) || (p.team ?? '').toLowerCase().includes(q)
    return matchCat && matchQ
  }), [products, activeCat, search])

  return (
    <div className="page-in" style={{ minHeight: '80vh', background: '#050611' }}>

      {/* Cabecera */}
      <div style={{
        borderBottom: '1px solid rgba(255,255,255,0.04)',
        padding: '3rem 1.5rem 2rem',
        background: 'linear-gradient(180deg, rgba(165,180,252,0.03) 0%, transparent 100%)',
      }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <p style={{ color: catInfo.accent, fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', margin: '0 0 7px', textShadow: `0 0 20px ${catInfo.glow}` }}>
            {activeCat ? 'Categoría' : 'Catálogo completo'}
          </p>
          <h1 style={{ color: '#e2e8f0', fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', fontWeight: 900, letterSpacing: '-0.04em', margin: '0 0 2rem' }}>
            {catInfo.label}
          </h1>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
            {/* Tabs */}
            <div style={{
              display: 'flex', gap: 4, padding: 4,
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 12,
            }}>
              {CATS.map(({ val, label, accent, glow }) => {
                const active = activeCat === val
                return (
                  <button key={val} onClick={() => navigate(val ? `/catalogo/${val}` : '/catalogo')}
                    style={{
                      padding: '7px 18px', borderRadius: 8, border: 'none', cursor: 'pointer',
                      fontSize: '0.8rem', fontWeight: 700, transition: 'all 0.15s',
                      background: active ? accent : 'transparent',
                      color: active ? '#050611' : '#3a3d5c',
                      boxShadow: active ? `0 0 20px ${glow}` : 'none',
                    }}>
                    {label}
                  </button>
                )
              })}
            </div>

            {/* Buscador */}
            <div style={{ position: 'relative', flex: 1, minWidth: 180, maxWidth: 300 }}>
              <svg style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#2a2c50', width: 15, height: 15 }}
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input type="text" placeholder="Buscar equipo..." value={search} onChange={e => setSearch(e.target.value)}
                style={{
                  width: '100%', padding: '8px 12px 8px 36px',
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 10, color: '#e2e8f0', fontSize: '0.82rem', outline: 'none',
                  boxSizing: 'border-box', transition: 'border-color 0.15s',
                }}
                onFocus={e => e.target.style.borderColor = 'rgba(165,180,252,0.25)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.06)'}
              />
            </div>

            {!loading && (
              <span style={{ color: '#1a1c38', fontSize: '0.75rem', fontWeight: 600, marginLeft: 'auto' }}>
                {filtered.length} {filtered.length === 1 ? 'modelo' : 'modelos'}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '2.5rem 1.5rem 5rem' }}>
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px,1fr))', gap: 12 }}>
            {[...Array(18)].map((_,i) => <SkeletonCard key={i} />)}
          </div>
        ) : filtered.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px,1fr))', gap: 12 }}>
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '8rem 0' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: 14, opacity: 0.3 }}>◌</div>
            <p style={{ color: '#3a3d5c', fontWeight: 600, margin: '0 0 6px' }}>Sin resultados</p>
            <p style={{ color: '#1e2240', fontSize: '0.85rem', margin: 0 }}>Probá con otro término</p>
          </div>
        )}
      </div>
    </div>
  )
}
