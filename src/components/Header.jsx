import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'

const NAV = [
  { to: '/',                     label: 'Inicio',       end: true  },
  { to: '/catalogo/selecciones', label: 'Selecciones',  end: false },
  { to: '/catalogo/clubes',      label: 'Clubes',       end: false },
  { to: '/catalogo',             label: 'Todo',         end: true  },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'rgba(5,6,17,0.85)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
    }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 1.5rem', height: 58, display: 'flex', alignItems: 'center', gap: '2rem' }}>

        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
          <span style={{ fontWeight: 900, fontSize: '1.3rem', letterSpacing: '-0.04em' }}>
            <span style={{ color: '#4ade80' }}>IN</span>
            <span style={{ color: '#e2e8f0' }}>CAMI</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav style={{ display: 'flex', gap: 2 }} className="hidden md:flex">
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

        {/* Mobile hamburger */}
        <button className="md:hidden" onClick={() => setOpen(!open)}
          style={{ background: 'none', border: 'none', color: '#3a3d5c', cursor: 'pointer', padding: 4, display: 'flex' }}>
          <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden" style={{
          borderTop: '1px solid rgba(255,255,255,0.05)',
          padding: '1rem 1.5rem',
          background: 'rgba(5,6,17,0.97)',
          display: 'flex', flexDirection: 'column', gap: 2,
        }}>
          {NAV.map(({ to, label }) => (
            <Link key={to} to={to} onClick={() => setOpen(false)} style={{
              textDecoration: 'none', color: '#64748b', fontWeight: 600, fontSize: '0.9rem',
              padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.04)',
            }}>
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
