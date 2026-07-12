import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { useHomeController } from '../controllers/useHomeController'

export default function Home() {
  const { products, selecciones, clubes, t } = useHomeController()

  return (
    <div className="page-in">

      {/* ══ HERO ══ */}
      <section style={{
        minHeight: '88vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center',
        padding: '6rem 1.5rem 5rem',
        position: 'relative', overflow: 'hidden',
        background: 'radial-gradient(ellipse 90% 70% at 50% -10%, rgba(129,140,248,0.08) 0%, transparent 60%), #050611',
      }}>
        {/* Blobs */}
        <div style={{ position: 'absolute', top: '12%', left: '8%', width: 380, height: 380, borderRadius: '50%', background: 'radial-gradient(circle, rgba(74,222,128,0.05) 0%, transparent 70%)', filter: 'blur(50px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '8%', right: '6%', width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(165,180,252,0.06) 0%, transparent 70%)', filter: 'blur(50px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '45%', right: '18%', width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(249,168,212,0.05) 0%, transparent 70%)', filter: 'blur(35px)', pointerEvents: 'none' }} />

        {/* Pill */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.22)',
          borderRadius: 999, padding: '6px 18px', marginBottom: '2.5rem',
        }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ade80', display: 'inline-block', boxShadow: '0 0 10px rgba(74,222,128,0.8)' }} />
          <span style={{ color: '#4ade80', fontSize: '0.63rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase' }}>
            {t('hero_pill')}
          </span>
        </div>

        {/* INCAMI */}
        <h1 style={{
          fontSize: 'clamp(5rem, 21vw, 13rem)',
          fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 0.85,
          margin: '0 0 2rem', userSelect: 'none',
          textShadow: '0 0 100px rgba(165,180,252,0.1)',
        }}>
          <span style={{ color: '#4ade80', textShadow: '0 0 70px rgba(74,222,128,0.35)' }}>IN</span>
          <span style={{ color: '#e2e8f0' }}>CAMI</span>
        </h1>

        <p style={{ color: '#64748b', fontSize: 'clamp(0.92rem, 2vw, 1.05rem)', fontWeight: 400, lineHeight: 1.75, maxWidth: 380, marginBottom: '3.5rem', whiteSpace: 'pre-line' }}>
          {t('hero_sub')}
        </p>

        {/* Stats */}
        <div style={{ display: 'flex', gap: '3rem', justifyContent: 'center', marginBottom: '4rem', flexWrap: 'wrap' }}>
          {[
            { n: selecciones.length, label: t('stat_national'), color: '#a5b4fc' },
            { n: products.length,    label: t('stat_jerseys'),  color: '#4ade80' },
            { n: clubes.length,      label: t('stat_clubs'),    color: '#f9a8d4' },
          ].map(({ n, label, color }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.8rem', fontWeight: 900, color, lineHeight: 1, textShadow: `0 0 40px ${color}60` }}>{n}</div>
              <div style={{ fontSize: '0.58rem', color: '#475569', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: 6 }}>{label}</div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/catalogo/selecciones" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'linear-gradient(135deg, #818cf8, #6366f1)',
            color: '#fff', fontWeight: 800, fontSize: '0.88rem', letterSpacing: '0.04em',
            padding: '12px 26px', borderRadius: 12, textDecoration: 'none',
            boxShadow: '0 4px 28px rgba(99,102,241,0.4)', transition: 'transform 0.15s, box-shadow 0.15s',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 8px 36px rgba(99,102,241,0.55)' }}
            onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 4px 28px rgba(99,102,241,0.4)' }}
          >🌍 {t('hero_national')}</Link>

          <Link to="/catalogo/clubes" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'linear-gradient(135deg, #f472b6, #ec4899)',
            color: '#fff', fontWeight: 800, fontSize: '0.88rem', letterSpacing: '0.04em',
            padding: '12px 26px', borderRadius: 12, textDecoration: 'none',
            boxShadow: '0 4px 28px rgba(236,72,153,0.4)', transition: 'transform 0.15s, box-shadow 0.15s',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 8px 36px rgba(236,72,153,0.55)' }}
            onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 4px 28px rgba(236,72,153,0.4)' }}
          >⚽ {t('hero_clubs')}</Link>

          <Link to="/catalogo" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
            color: '#94a3b8', fontWeight: 700, fontSize: '0.88rem',
            padding: '12px 22px', borderRadius: 12, textDecoration: 'none', transition: 'all 0.15s',
          }}
            onMouseEnter={e => { e.currentTarget.style.color='#e2e8f0'; e.currentTarget.style.borderColor='rgba(255,255,255,0.18)' }}
            onMouseLeave={e => { e.currentTarget.style.color='#94a3b8'; e.currentTarget.style.borderColor='rgba(255,255,255,0.1)' }}
          >{t('hero_all')}</Link>
        </div>
      </section>

      {/* ══ CATEGORÍAS ══ */}
      <section style={{ padding: '0 1.5rem 6rem', background: '#050611' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <p style={{ color: '#334155', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 10 }}>
              {t('nav_catalog')}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
            {[
              {
                to: '/catalogo/selecciones', emoji: '🌍',
                tag: t('cat_national_tag'), title: t('cat_national_title'), desc: t('cat_national_desc'),
                color: '#a5b4fc', border: 'rgba(165,180,252,0.18)', bg: 'linear-gradient(145deg, #08092e, #0f1245)',
                glowBg: 'rgba(165,180,252,0.12)', shadow: 'rgba(129,140,248,0.08)', sep: 'rgba(165,180,252,0.12)',
                count: `${selecciones.length} ${t('cat_models')}`,
                cta: t('cat_see_all_nat'),
              },
              {
                to: '/catalogo/clubes', emoji: '⚽',
                tag: t('cat_clubs_tag'), title: t('cat_clubs_title'), desc: t('cat_clubs_desc'),
                color: '#f9a8d4', border: 'rgba(249,168,212,0.18)', bg: 'linear-gradient(145deg, #16061e, #240830)',
                glowBg: 'rgba(249,168,212,0.1)', shadow: 'rgba(236,72,153,0.08)', sep: 'rgba(249,168,212,0.12)',
                count: `${clubes.length} ${t('cat_models')}`,
                cta: t('cat_see_all_clubs'),
              },
              {
                to: '/catalogo', emoji: '🗂️',
                tag: t('cat_all_tag'), title: t('cat_all_title'), desc: t('cat_all_desc'),
                color: '#4ade80', border: 'rgba(74,222,128,0.15)', bg: 'linear-gradient(145deg, #070a14, #0c1020)',
                glowBg: 'rgba(74,222,128,0.07)', shadow: 'rgba(74,222,128,0.05)', sep: 'rgba(74,222,128,0.1)',
                count: `${products.length} ${t('cat_jerseys')}`,
                cta: t('hero_all'),
              },
            ].map(({ to, emoji, tag, title, desc, color, border, bg, glowBg, shadow, sep, count, cta }) => (
              <Link key={to} to={to} style={{ textDecoration: 'none' }}>
                <div className="card-hover" style={{
                  background: bg, border: `1px solid ${border}`, borderRadius: 20, padding: '2rem',
                  display: 'flex', flexDirection: 'column', gap: 13,
                  position: 'relative', overflow: 'hidden',
                  boxShadow: `0 4px 30px ${shadow}`,
                }}>
                  <div style={{ position: 'absolute', top: -50, right: -50, width: 180, height: 180, background: `radial-gradient(circle, ${glowBg} 0%, transparent 70%)`, borderRadius: '50%', pointerEvents: 'none' }} />
                  <span style={{ fontSize: '2rem', lineHeight: 1 }}>{emoji}</span>
                  <div>
                    <div style={{ color, fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 7 }}>{tag}</div>
                    <div style={{ color: '#e2e8f0', fontSize: '1.65rem', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1 }}>{title}</div>
                  </div>
                  <p style={{ color: '#475569', fontSize: '0.82rem', lineHeight: 1.55, margin: 0 }}>{desc}</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 14, borderTop: `1px solid ${sep}` }}>
                    <span style={{ color, fontSize: '0.8rem', fontWeight: 700 }}>{count}</span>
                    <span style={{ color, fontSize: '1.1rem' }}>→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SELECCIONES ══ */}
      <section style={{ padding: '4rem 1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'linear-gradient(180deg, #060714 0%, #050611 100%)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <div>
              <p style={{ color: '#a5b4fc', fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 6px' }}>
                {t('nav_catalog')}
              </p>
              <h2 style={{ color: '#e2e8f0', fontSize: '1.65rem', fontWeight: 900, letterSpacing: '-0.03em', margin: 0 }}>{t('nav_national')}</h2>
            </div>
            <Link to="/catalogo/selecciones" style={{ color: '#475569', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#a5b4fc'}
              onMouseLeave={e => e.currentTarget.style.color = '#475569'}
            >{t('cat_see_all_nat')}</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px,1fr))', gap: 14 }}>
            {selecciones.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* ══ CLUBES ══ */}
      <section style={{ padding: '4rem 1.5rem 6rem', borderTop: '1px solid rgba(255,255,255,0.05)', background: '#050611' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <div>
              <p style={{ color: '#f9a8d4', fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 6px' }}>
                {t('nav_catalog')}
              </p>
              <h2 style={{ color: '#e2e8f0', fontSize: '1.65rem', fontWeight: 900, letterSpacing: '-0.03em', margin: 0 }}>{t('nav_clubs')}</h2>
            </div>
            <Link to="/catalogo/clubes" style={{ color: '#475569', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#f9a8d4'}
              onMouseLeave={e => e.currentTarget.style.color = '#475569'}
            >{t('cat_see_all_clubs')}</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px,1fr))', gap: 14 }}>
            {clubes.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

    </div>
  )
}
