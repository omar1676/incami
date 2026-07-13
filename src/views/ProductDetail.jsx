import { Link } from 'react-router-dom'
import { useProductDetailController } from '../controllers/useProductDetailController'

const INPUT_STYLE = {
  display: 'block', width: '100%', marginBottom: 8,
  padding: '9px 14px', borderRadius: 10, outline: 'none', boxSizing: 'border-box',
  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(251,191,36,0.25)',
  color: '#e2e8f0', fontSize: '0.88rem',
}

export default function ProductDetail() {
  const {
    product, navigate,
    activeImg, setActiveImg,
    selectedSize, setSelectedSize,
    qty, setQty,
    handleAddToCart, added,
    extras, toggleParche, toggleNumero, toggleNombre, setNumero, setNombre,
    typeInfo, sizes, breadcrumbs, features,
    t,
  } = useProductDetailController()

  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '8rem 1.5rem' }}>
        <p style={{ color: '#475569', marginBottom: 20 }}>{t('detail_not_found')}</p>
        <Link to="/catalogo" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          color: '#050611', background: '#4ade80', fontWeight: 700,
          textDecoration: 'none', padding: '10px 20px', borderRadius: 10, fontSize: '0.88rem',
        }}>{t('detail_back_cat')}</Link>
      </div>
    )
  }

  const images = product.images || []

  const EXTRAS_OPTIONS = [
    { key: 'parche', label: t('detail_badge'),  active: extras.parche,         onToggle: toggleParche },
    { key: 'numero', label: t('detail_number'), active: extras.numero !== null, onToggle: toggleNumero },
    { key: 'nombre', label: t('detail_name'),   active: extras.nombre !== null, onToggle: toggleNombre },
  ]

  return (
    <div className="page-in has-sticky-cta" style={{ background: '#050611', minHeight: '80vh' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '2.5rem 1.5rem 6rem' }}>

        {/* Breadcrumb */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: '2.5rem', fontSize: '0.75rem', flexWrap: 'wrap' }}>
          {breadcrumbs.map(({ to, label }) => (
            <span key={to} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Link to={to} style={{ color: '#475569', textDecoration: 'none', transition: 'color 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#94a3b8'}
                onMouseLeave={e => e.currentTarget.style.color = '#475569'}
              >{label}</Link>
              <span style={{ color: '#334155' }}>›</span>
            </span>
          ))}
          <span style={{ color: '#334155' }}>{product.name}</span>
        </nav>

        <div className="detail-grid">

          {/* ── Imágenes ── */}
          <div>
            <div style={{
              aspectRatio: '3/4', borderRadius: 20, overflow: 'hidden',
              background: '#0a0c1e', border: '1px solid rgba(255,255,255,0.07)',
              marginBottom: 10, boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
            }}>
              <img
                src={images[activeImg]} alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
                onError={e => { e.target.src = 'https://placehold.co/400x530/0a0c1e/161828?text=?' }}
              />
            </div>

            {images.length > 1 && (
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImg(i)} style={{
                    width: 62, height: 62, borderRadius: 11, overflow: 'hidden', padding: 0,
                    cursor: 'pointer', background: '#0a0c1e', transition: 'all 0.15s',
                    border: `2px solid ${activeImg === i ? '#4ade80' : 'rgba(255,255,255,0.08)'}`,
                    boxShadow: activeImg === i ? '0 0 18px rgba(74,222,128,0.35)' : 'none',
                  }}>
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={e => { e.target.src = 'https://placehold.co/62x62/0a0c1e/161828?text=?' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Info ── */}
          <div style={{ paddingTop: '0.5rem' }}>

            {/* Equipo + tipo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1rem', flexWrap: 'wrap' }}>
              <span style={{ color: '#4ade80', fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', textShadow: '0 0 18px rgba(74,222,128,0.45)' }}>
                {product.team}
              </span>
              {typeInfo && (
                <span style={{
                  background: typeInfo.bg, color: typeInfo.color,
                  fontSize: '0.6rem', fontWeight: 700, padding: '3px 10px', borderRadius: 6,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  border: `1px solid ${typeInfo.color}30`,
                }}>
                  {t(typeInfo.labelKey)}
                </span>
              )}
            </div>

            <h1 style={{ color: '#f1f5f9', fontSize: 'clamp(1.4rem,3vw,2.1rem)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.15, margin: '0 0 1.25rem' }}>
              {product.name}
            </h1>

            {/* Temporada */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '2rem' }}>
              <span style={{ color: '#475569', fontSize: '0.75rem' }}>{t('detail_season')}</span>
              <span style={{
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
                color: '#94a3b8', fontWeight: 700, fontSize: '0.75rem', padding: '3px 12px', borderRadius: 7,
              }}>{product.season}</span>
            </div>

            {/* Talles */}
            <div style={{ marginBottom: '2rem' }}>
              <p style={{ color: '#475569', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', margin: '0 0 12px' }}>
                {selectedSize ? `${t('detail_size_sel')}: ${selectedSize}` : t('detail_size_pick')}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {sizes.map(size => (
                  <button key={size} onClick={() => setSelectedSize(size)} style={{
                    background: selectedSize === size ? 'rgba(74,222,128,0.14)' : 'rgba(255,255,255,0.04)',
                    border: `1.5px solid ${selectedSize === size ? 'rgba(74,222,128,0.55)' : 'rgba(255,255,255,0.09)'}`,
                    color: selectedSize === size ? '#4ade80' : '#64748b',
                    fontWeight: 700, fontSize: '0.85rem',
                    padding: '9px 16px', borderRadius: 10, minWidth: 48, textAlign: 'center',
                    cursor: 'pointer', transition: 'all 0.15s',
                    boxShadow: selectedSize === size ? '0 0 18px rgba(74,222,128,0.22)' : 'none',
                  }}>
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Personalización */}
            <div style={{ marginBottom: '2rem' }}>
              <p style={{ color: '#475569', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', margin: '0 0 12px' }}>
                {t('detail_custom')}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 10 }}>
                {EXTRAS_OPTIONS.map(({ key, label, active, onToggle }) => (
                  <button key={key} onClick={onToggle} style={{
                    background: active ? 'rgba(251,191,36,0.12)' : 'rgba(255,255,255,0.04)',
                    border: `1.5px solid ${active ? 'rgba(251,191,36,0.5)' : 'rgba(255,255,255,0.09)'}`,
                    color: active ? '#fbbf24' : '#64748b',
                    fontWeight: 700, fontSize: '0.85rem', padding: '9px 18px', borderRadius: 10,
                    cursor: 'pointer', transition: 'all 0.15s',
                    boxShadow: active ? '0 0 16px rgba(251,191,36,0.18)' : 'none',
                  }}>
                    {label}
                  </button>
                ))}
              </div>
              {extras.numero !== null && (
                <input type="text" placeholder={t('detail_number_ph')}
                  value={extras.numero} onChange={e => setNumero(e.target.value)} maxLength={2}
                  style={INPUT_STYLE}
                />
              )}
              {extras.nombre !== null && (
                <input type="text" placeholder={t('detail_name_ph')}
                  value={extras.nombre} onChange={e => setNombre(e.target.value)} maxLength={15}
                  style={INPUT_STYLE}
                />
              )}
            </div>

            {/* Cantidad */}
            <div style={{ marginBottom: '2rem' }}>
              <p style={{ color: '#475569', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', margin: '0 0 12px' }}>
                {t('detail_qty')}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 0, width: 'fit-content', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 12, overflow: 'hidden' }}>
                <button
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  style={{ width: 40, height: 40, background: 'none', border: 'none', color: qty > 1 ? '#94a3b8' : '#334155', cursor: qty > 1 ? 'pointer' : 'default', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'color 0.15s' }}
                >−</button>
                <span style={{ minWidth: 36, textAlign: 'center', color: '#e2e8f0', fontWeight: 800, fontSize: '1rem' }}>{qty}</span>
                <button
                  onClick={() => setQty(q => Math.min(20, q + 1))}
                  style={{ width: 40, height: 40, background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'color 0.15s' }}
                >+</button>
              </div>
            </div>

            <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '0 0 1.75rem' }} />

            {/* Features */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginBottom: '1.75rem' }}>
              {features.map(txt => (
                <div key={txt} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <span style={{ color: '#4ade80', fontSize: '0.72rem', flexShrink: 0 }}>✓</span>
                  <span style={{ color: '#475569', fontSize: '0.83rem' }}>{txt}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button onClick={handleAddToCart} disabled={!selectedSize} style={{
              width: '100%', padding: '15px 24px', borderRadius: 14,
              cursor: selectedSize ? 'pointer' : 'not-allowed',
              fontWeight: 800, fontSize: '0.95rem', letterSpacing: '0.02em',
              transition: 'all 0.2s ease', marginBottom: 10,
              background: added
                ? 'rgba(74,222,128,0.14)'
                : selectedSize ? 'linear-gradient(135deg, #4ade80, #22c55e)' : 'rgba(255,255,255,0.05)',
              color: added ? '#4ade80' : selectedSize ? '#050611' : '#334155',
              border: added ? '1px solid rgba(74,222,128,0.35)' : '1px solid transparent',
              boxShadow: selectedSize && !added ? '0 6px 28px rgba(74,222,128,0.32)' : 'none',
            }}>
              {added ? t('detail_added') : selectedSize ? t('detail_add') : t('detail_pick_first')}
            </button>

            {/* CTA sticky mobile */}
            <div className="sticky-cta-mobile">
              <button onClick={handleAddToCart} disabled={!selectedSize} style={{
                flex: 1, padding: '13px 20px', borderRadius: 12, border: 'none',
                cursor: selectedSize ? 'pointer' : 'not-allowed',
                fontWeight: 800, fontSize: '0.9rem', transition: 'all 0.2s',
                background: added
                  ? 'rgba(74,222,128,0.14)'
                  : selectedSize ? 'linear-gradient(135deg, #4ade80, #22c55e)' : 'rgba(255,255,255,0.06)',
                color: added ? '#4ade80' : selectedSize ? '#050611' : '#475569',
                border: added ? '1px solid rgba(74,222,128,0.35)' : '1px solid transparent',
              }}>
                {added ? t('detail_added_short') : selectedSize ? `${t('detail_add_short')} ${selectedSize}` : t('detail_size_pick')}
              </button>
            </div>

            <button onClick={() => navigate(-1)} style={{
              width: '100%', padding: '11px 22px', borderRadius: 12, cursor: 'pointer',
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
              color: '#475569', fontSize: '0.83rem', fontWeight: 600, transition: 'all 0.15s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(165,180,252,0.22)'; e.currentTarget.style.color = '#94a3b8' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#475569' }}
            >{t('detail_back')}</button>

          </div>
        </div>
      </div>
    </div>
  )
}
