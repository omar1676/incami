import { Link, NavLink }        from 'react-router-dom'
import { useHeaderController }  from '../controllers/useHeaderController'
import CartDrawer               from './CartDrawer'

export default function Header() {
  const { menuOpen, setMenuOpen, cartOpen, setCartOpen, totalItems, lang, toggleLang, NAV } = useHeaderController()

  return (
    <>
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(5,6,17,0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 1.5rem', height: 58, display: 'flex', alignItems: 'center', gap: '2rem' }}>

          <Link to="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
            <span style={{ fontWeight: 900, fontSize: '1.3rem', letterSpacing: '-0.04em' }}>
              <span style={{ color: '#4ade80' }}>IN</span>
              <span style={{ color: '#e2e8f0' }}>CAMI</span>
            </span>
          </Link>

          <nav className="hidden md:flex" style={{ gap: 2 }}>
            {NAV.map(({ to, label, end }) => (
              <NavLink key={to} to={to} end={end} style={({ isActive }) => ({
                textDecoration: 'none',
                fontSize: '0.82rem', fontWeight: 600,
                padding: '6px 14px', borderRadius: 8,
                color: isActive ? '#e2e8f0' : '#3a3d5c',
                background: isActive ? 'rgba(255,255,255,0.06)' : 'transparent',
                transition: 'all 0.15s',
              })}
                onMouseEnter={e => { if (!e.currentTarget.getAttribute('aria-current')) e.currentTarget.style.color = '#94a3b8' }}
                onMouseLeave={e => { if (!e.currentTarget.getAttribute('aria-current')) e.currentTarget.style.color = '#3a3d5c' }}
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <div style={{ flex: 1 }} />

          {/* Lang toggle */}
          <button onClick={toggleLang} style={{
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 8, padding: '4px 10px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 4,
            fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em',
            transition: 'border-color 0.15s',
          }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
          >
            <span style={{ color: lang === 'es' ? '#4ade80' : '#3a3d5c', transition: 'color 0.15s' }}>ES</span>
            <span style={{ color: '#1e2535' }}>|</span>
            <span style={{ color: lang === 'en' ? '#4ade80' : '#3a3d5c', transition: 'color 0.15s' }}>EN</span>
          </button>

          {/* Consulta button */}
          <button onClick={() => setCartOpen(true)} style={{
            position: 'relative', background: 'none', border: 'none',
            cursor: 'pointer', padding: 6, display: 'flex', alignItems: 'center',
            color: totalItems > 0 ? '#4ade80' : '#3a3d5c',
            transition: 'color 0.15s',
          }}
            onMouseEnter={e => e.currentTarget.style.color = '#e2e8f0'}
            onMouseLeave={e => e.currentTarget.style.color = totalItems > 0 ? '#4ade80' : '#3a3d5c'}
          >
            <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            {totalItems > 0 && (
              <span style={{
                position: 'absolute', top: 0, right: 0,
                background: '#4ade80', color: '#050611',
                fontSize: '0.6rem', fontWeight: 900,
                width: 16, height: 16, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 8px rgba(74,222,128,0.6)',
              }}>{totalItems}</span>
            )}
          </button>

          {/* Mobile hamburger */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: 'none', border: 'none', color: '#3a3d5c', cursor: 'pointer', padding: 4, display: 'flex' }}>
            <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden" style={{
            borderTop: '1px solid rgba(255,255,255,0.05)',
            padding: '1rem 1.5rem',
            background: 'rgba(5,6,17,0.97)',
            display: 'flex', flexDirection: 'column', gap: 2,
          }}>
            {NAV.map(({ to, label }) => (
              <Link key={to} to={to} onClick={() => setMenuOpen(false)} style={{
                textDecoration: 'none', color: '#64748b', fontWeight: 600, fontSize: '0.9rem',
                padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.04)',
              }}>
                {label}
              </Link>
            ))}
            <div style={{ paddingTop: 10 }}>
              <button onClick={toggleLang} style={{
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 8, padding: '6px 14px', cursor: 'pointer',
                fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', display: 'flex', gap: 6,
              }}>
                <span style={{ color: lang === 'es' ? '#4ade80' : '#3a3d5c' }}>ES</span>
                <span style={{ color: '#1e2535' }}>|</span>
                <span style={{ color: lang === 'en' ? '#4ade80' : '#3a3d5c' }}>EN</span>
              </button>
            </div>
          </div>
        )}
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}
