import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useProduct } from '../hooks/useProducts'

const TYPE_LABELS = { home:'Local', away:'Visitante', special:'Edición Especial', training:'Entrenamiento', goalkeeper:'Arquero' }
const TYPE_COLOR  = { home:'#a5b4fc', away:'#f9a8d4', special:'#fbbf24', training:'#94a3b8', goalkeeper:'#34d399' }

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { product, loading } = useProduct(id)
  const [activeImg, setActiveImg] = useState(0)

  if (loading) {
    return (
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '3rem 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
          <div style={{ aspectRatio: '3/4', background: '#0c0e22', borderRadius: 18 }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, paddingTop: '1rem' }}>
            {[80,60,40,90,50].map((w,i) => (
              <div key={i} style={{ height: i===1?28:12, borderRadius: 6, background: '#0c0e22', width:`${w}%` }} />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '8rem 1.5rem' }}>
        <p style={{ color: '#3a3d5c', marginBottom: 16, fontSize: '1rem' }}>Producto no encontrado</p>
        <Link to="/catalogo" style={{ color: '#4ade80', fontWeight: 700, textDecoration: 'none' }}>← Volver al catálogo</Link>
      </div>
    )
  }

  const images = product.images || []
  const typeColor = TYPE_COLOR[product.type] ?? '#94a3b8'

  return (
    <div className="page-in" style={{ background: '#050611', minHeight: '80vh' }}>
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '2.5rem 1.5rem 6rem' }}>

        {/* Breadcrumb */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '2.5rem', fontSize: '0.75rem', color: '#1e2240' }}>
          {[
            { to: '/', label: 'Inicio' },
            { to: `/catalogo/${product.category}`, label: product.category === 'selecciones' ? 'Selecciones' : 'Clubes' },
          ].map(({ to, label }) => (
            <span key={to} style={{ display:'flex', alignItems:'center', gap:8 }}>
              <Link to={to} style={{ color:'#1e2240', textDecoration:'none', transition:'color 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.color='#64748b'}
                onMouseLeave={e => e.currentTarget.style.color='#1e2240'}
              >{label}</Link>
              <span style={{ color:'#12142a' }}>·</span>
            </span>
          ))}
          <span style={{ color:'#2a2c50' }}>{product.name}</span>
        </nav>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: '3.5rem', alignItems: 'start' }}>

          {/* ── Imágenes ── */}
          <div>
            <div style={{
              aspectRatio: '3/4', borderRadius: 18, overflow: 'hidden',
              background: '#0c0e22',
              border: '1px solid rgba(255,255,255,0.06)',
              marginBottom: 10,
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            }}>
              <img src={images[activeImg]} alt={product.name}
                style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center top' }}
                onError={e => { e.target.src='https://placehold.co/400x530/0c0e22/1a1c38?text=?' }} />
            </div>
            {images.length > 1 && (
              <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                {images.map((img,i) => (
                  <button key={i} onClick={() => setActiveImg(i)} style={{
                    width:62, height:62, borderRadius:10, overflow:'hidden',
                    border:`2px solid ${activeImg===i ? '#4ade80' : 'rgba(255,255,255,0.06)'}`,
                    padding:0, cursor:'pointer', background:'#0c0e22',
                    transition:'border-color 0.15s',
                    boxShadow: activeImg===i ? '0 0 16px rgba(74,222,128,0.3)' : 'none',
                  }}>
                    <img src={img} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }}
                      onError={e => { e.target.src='https://placehold.co/62x62/0c0e22/1a1c38?text=?' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Info ── */}
          <div style={{ paddingTop: '0.5rem' }}>
            {/* Team + tipo */}
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:'1rem', flexWrap:'wrap' }}>
              <span style={{ color:'#4ade80', fontSize:'0.65rem', fontWeight:800, letterSpacing:'0.18em', textTransform:'uppercase', textShadow:'0 0 16px rgba(74,222,128,0.4)' }}>
                {product.team}
              </span>
              {product.type && (
                <span style={{
                  background:`rgba(${typeColor==='#a5b4fc'?'165,180,252':typeColor==='#f9a8d4'?'249,168,212':typeColor==='#fbbf24'?'251,191,36':typeColor==='#34d399'?'52,211,153':'148,163,184'},0.1)`,
                  color: typeColor,
                  fontSize:'0.6rem', fontWeight:700,
                  padding:'3px 10px', borderRadius:6,
                  letterSpacing:'0.1em', textTransform:'uppercase',
                  border:`1px solid ${typeColor}22`,
                }}>
                  {TYPE_LABELS[product.type] ?? product.type}
                </span>
              )}
            </div>

            <h1 style={{ color:'#e2e8f0', fontSize:'clamp(1.4rem,3vw,2.2rem)', fontWeight:900, letterSpacing:'-0.03em', lineHeight:1.15, margin:'0 0 1.5rem' }}>
              {product.name}
            </h1>

            {/* Temporada */}
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:'2rem' }}>
              <span style={{ color:'#1e2240', fontSize:'0.75rem' }}>Temporada</span>
              <span style={{
                background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.06)',
                color:'#64748b', fontWeight:700, fontSize:'0.75rem',
                padding:'3px 12px', borderRadius:7,
              }}>{product.season}</span>
            </div>

            {/* Talles */}
            <div style={{ marginBottom:'2.5rem' }}>
              <p style={{ color:'#1e2240', fontSize:'0.65rem', fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', margin:'0 0 12px' }}>
                Talles disponibles
              </p>
              <div style={{ display:'flex', flexWrap:'wrap', gap:7 }}>
                {(product.sizes || ['S','M','L','XL','2XL','3XL','4XL']).map(size => (
                  <span key={size} style={{
                    background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)',
                    color:'#94a3b8', fontWeight:700, fontSize:'0.82rem',
                    padding:'7px 14px', borderRadius:9, minWidth:44, textAlign:'center',
                    transition:'border-color 0.15s, color 0.15s',
                  }}>
                    {size}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ height:1, background:'rgba(255,255,255,0.04)', margin:'0 0 2rem' }} />

            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {['Talles S a 4XL disponibles', `Temporada ${product.season}`, 'Catálogo de exhibición'].map(txt => (
                <div key={txt} style={{ display:'flex', gap:10, alignItems:'center' }}>
                  <span style={{ color:'#4ade80', fontSize:'0.7rem', textShadow:'0 0 8px rgba(74,222,128,0.5)' }}>✓</span>
                  <span style={{ color:'#2a2c50', fontSize:'0.82rem' }}>{txt}</span>
                </div>
              ))}
            </div>

            <button onClick={() => navigate(-1)} style={{
              marginTop:'2rem',
              background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.06)',
              color:'#3a3d5c', fontSize:'0.82rem', fontWeight:600,
              padding:'10px 22px', borderRadius:10, cursor:'pointer',
              transition:'all 0.15s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(165,180,252,0.2)'; e.currentTarget.style.color='#94a3b8' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.06)'; e.currentTarget.style.color='#3a3d5c' }}
            >← Volver</button>
          </div>
        </div>
      </div>
    </div>
  )
}
