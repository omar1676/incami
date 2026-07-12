import { useCartDrawerController } from '../controllers/useCartDrawerController'

export default function CartDrawer({ open, onClose }) {
  const { items, removeItem, updateQty, totalItems, totalPrice, itemPrice, handleConsultar, t } = useCartDrawerController()

  return (
    <>
      {open && (
        <div onClick={onClose} style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)', zIndex: 40,
        }} />
      )}

      <div style={{
        position: 'fixed', top: 0, right: 0,
        height: '100%', width: '100%', maxWidth: 420,
        background: '#080a1e', borderLeft: '1px solid rgba(255,255,255,0.07)',
        zIndex: 50, display: 'flex', flexDirection: 'column',
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1)',
      }}>

        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '1.25rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <h2 style={{ color: '#e2e8f0', fontSize: '1rem', fontWeight: 800, margin: 0 }}>{t('cart_title')}</h2>
            {totalItems > 0 && (
              <span style={{
                background: 'rgba(74,222,128,0.15)', color: '#4ade80',
                fontSize: '0.7rem', fontWeight: 800, padding: '2px 8px', borderRadius: 999,
                border: '1px solid rgba(74,222,128,0.25)',
              }}>
                {totalItems} {totalItems === 1 ? t('cart_model') : t('cart_models')}
              </span>
            )}
          </div>
          <button onClick={onClose} style={{
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 8, color: '#64748b', cursor: 'pointer',
            width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.15s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.09)'; e.currentTarget.style.color = '#94a3b8' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#64748b' }}
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '5rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
              <div style={{
                width: 64, height: 64, borderRadius: '50%',
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="28" height="28" fill="none" stroke="#334155" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <p style={{ color: '#475569', fontWeight: 700, margin: '0 0 4px' }}>{t('cart_empty')}</p>
                <p style={{ color: '#334155', fontSize: '0.82rem', margin: 0 }}>{t('cart_empty_sub')}</p>
              </div>
            </div>
          ) : (
            items.map(item => (
              <div key={`${item.id}-${item.selectedSize}`} style={{
                display: 'flex', gap: 14, background: '#0c0e22', borderRadius: 14,
                border: '1px solid rgba(255,255,255,0.07)', padding: '1rem',
              }}>
                <img src={item.images?.[0]} alt={item.name}
                  style={{ width: 72, height: 72, objectFit: 'cover', borderRadius: 10, flexShrink: 0, background: '#10122a' }}
                  onError={e => { e.target.src = 'https://placehold.co/72x72/10122a/1a1c38?text=?' }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ color: '#e2e8f0', fontWeight: 600, fontSize: '0.85rem', margin: '0 0 3px', lineHeight: 1.3 }}>{item.name}</p>
                  <p style={{ color: '#4ade80', fontSize: '0.72rem', fontWeight: 700, margin: '0 0 6px' }}>
                    {t('cart_size')}: {item.selectedSize}
                  </p>
                  {item.extras && (item.extras.parche || item.extras.numero || item.extras.nombre) && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 8 }}>
                      {item.extras.parche && <span style={{ background: 'rgba(251,191,36,0.1)', color: '#fbbf24', fontSize: '0.65rem', fontWeight: 700, padding: '2px 8px', borderRadius: 5, border: '1px solid rgba(251,191,36,0.2)' }}>{t('detail_badge')}</span>}
                      {item.extras.numero && <span style={{ background: 'rgba(251,191,36,0.1)', color: '#fbbf24', fontSize: '0.65rem', fontWeight: 700, padding: '2px 8px', borderRadius: 5, border: '1px solid rgba(251,191,36,0.2)' }}>N° {item.extras.numero}</span>}
                      {item.extras.nombre && <span style={{ background: 'rgba(251,191,36,0.1)', color: '#fbbf24', fontSize: '0.65rem', fontWeight: 700, padding: '2px 8px', borderRadius: 5, border: '1px solid rgba(251,191,36,0.2)' }}>{item.extras.nombre}</span>}
                    </div>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <button onClick={() => updateQty(item.id, item.selectedSize, item.qty - 1)} style={{ width: 28, height: 28, borderRadius: 7, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' }}>−</button>
                      <span style={{ color: '#e2e8f0', fontWeight: 700, fontSize: '0.9rem', minWidth: 16, textAlign: 'center' }}>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.selectedSize, item.qty + 1)} style={{ width: 28, height: 28, borderRadius: 7, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' }}>+</button>
                    </div>
                    <span style={{ color: '#4ade80', fontWeight: 800, fontSize: '0.9rem' }}>
                      {itemPrice(item) * item.qty}€
                    </span>
                    <button onClick={() => removeItem(item.id, item.selectedSize)} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#475569', cursor: 'pointer', padding: 4, transition: 'color 0.15s', display: 'flex', alignItems: 'center' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#f87171'}
                      onMouseLeave={e => e.currentTarget.style.color = '#475569'}
                    >
                      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: '1.25rem 1.5rem', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          {items.length > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ color: '#64748b', fontSize: '0.82rem', fontWeight: 600 }}>Total</span>
              <span style={{ color: '#4ade80', fontSize: '1.4rem', fontWeight: 900, letterSpacing: '-0.03em' }}>{totalPrice}€</span>
            </div>
          )}
          <button onClick={handleConsultar} disabled={!items.length} style={{
            width: '100%', padding: '15px 24px', borderRadius: 14, border: 'none',
            cursor: items.length ? 'pointer' : 'not-allowed',
            fontWeight: 800, fontSize: '0.95rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            background: items.length ? 'linear-gradient(135deg, #229ED9, #1a7fc1)' : 'rgba(255,255,255,0.05)',
            color: items.length ? '#fff' : '#334155',
            boxShadow: items.length ? '0 4px 24px rgba(34,158,217,0.35)' : 'none',
            transition: 'all 0.2s',
          }}>
            {items.length > 0 && (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.013 9.484c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L6.972 14.7l-2.946-.92c-.64-.203-.654-.64.136-.953l11.49-4.43c.537-.194 1.006.131.91.851z"/>
              </svg>
            )}
            {items.length ? t('cart_btn') : t('cart_btn_empty')}
          </button>
        </div>
      </div>
    </>
  )
}
