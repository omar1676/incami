import ProductCard from '../components/ProductCard'
import { useLang } from '../i18n/LanguageContext'
import { useCatalogController, CATS } from '../controllers/useCatalogController'

export default function Catalog() {
  const { activeCat, catInfo, search, setSearch, filtered, goToCategory, availableTypes, activeType, toggleType } = useCatalogController()
  const { t } = useLang()

  const tabLabels = {
    '':            t('catalog_tab_all'),
    'selecciones': t('catalog_tab_nat'),
    'clubes':      t('catalog_tab_clubs'),
  }

  const catLabel = !activeCat
    ? t('catalog_full')
    : activeCat === 'selecciones' ? t('catalog_tab_nat') : t('catalog_tab_clubs')

  return (
    <div className="page-in" style={{ minHeight: '80vh', background: '#050611' }}>

      {/* Cabecera */}
      <div style={{
        borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '3rem 1.5rem 2rem',
        background: 'linear-gradient(180deg, rgba(129,140,248,0.04) 0%, transparent 100%)',
      }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <p style={{ color: catInfo.accent, fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', margin: '0 0 8px', textShadow: `0 0 20px ${catInfo.glow}` }}>
            {activeCat ? t('catalog_category') : t('catalog_full')}
          </p>
          <h1 style={{ color: '#e2e8f0', fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', fontWeight: 900, letterSpacing: '-0.04em', margin: '0 0 2rem' }}>
            {catLabel}
          </h1>

          {/* Tabs categoría */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', gap: 4, padding: 4, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12 }}>
              {CATS.map(({ val, accent, glow }) => {
                const active = activeCat === val
                return (
                  <button key={val} onClick={() => goToCategory(val)} style={{
                    padding: '7px 18px', borderRadius: 8, border: 'none', cursor: 'pointer',
                    fontSize: '0.8rem', fontWeight: 700, transition: 'all 0.15s',
                    background: active ? accent : 'transparent',
                    color: active ? '#050611' : '#475569',
                    boxShadow: active ? `0 2px 16px ${glow}` : 'none',
                  }}>
                    {tabLabels[val]}
                  </button>
                )
              })}
            </div>

            {/* Buscador */}
            <div style={{ position: 'relative', flex: 1, minWidth: 180, maxWidth: 300 }}>
              <svg style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#334155', width: 15, height: 15 }}
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input type="text" placeholder={t('catalog_search')}
                value={search} onChange={e => setSearch(e.target.value)}
                style={{
                  width: '100%', padding: '8px 12px 8px 36px',
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 10, color: '#e2e8f0', fontSize: '0.82rem', outline: 'none',
                  boxSizing: 'border-box', transition: 'border-color 0.15s',
                }}
                onFocus={e => e.target.style.borderColor = 'rgba(165,180,252,0.3)'}
                onBlur={e  => e.target.style.borderColor = 'rgba(255,255,255,0.07)'}
              />
            </div>

            <span style={{ color: '#475569', fontSize: '0.75rem', fontWeight: 600, marginLeft: 'auto' }}>
              {filtered.length} {filtered.length === 1 ? t('catalog_model') : t('catalog_models')}
            </span>
          </div>

          {/* Filtro por tipo */}
          {availableTypes.length > 1 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {availableTypes.map(({ val, label }) => {
                const active = activeType === val
                return (
                  <button key={val} onClick={() => toggleType(val)} style={{
                    padding: '5px 14px', borderRadius: 20, border: 'none', cursor: 'pointer',
                    fontSize: '0.72rem', fontWeight: 700, transition: 'all 0.15s',
                    background: active ? 'rgba(165,180,252,0.18)' : 'rgba(255,255,255,0.04)',
                    color: active ? '#a5b4fc' : '#475569',
                    border: `1px solid ${active ? 'rgba(165,180,252,0.35)' : 'rgba(255,255,255,0.07)'}`,
                  }}>
                    {label}
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Grid */}
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '2.5rem 1.5rem 6rem' }}>
        {filtered.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px,1fr))', gap: 14 }}>
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '8rem 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: 16, opacity: 0.25 }}>◌</div>
            <p style={{ color: '#475569', fontWeight: 700, margin: '0 0 8px', fontSize: '1rem' }}>{t('catalog_no_results')}</p>
            <p style={{ color: '#334155', fontSize: '0.85rem', margin: 0 }}>{t('catalog_no_results_sub')}</p>
          </div>
        )}
      </div>
    </div>
  )
}
