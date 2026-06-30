import { Link } from 'react-router-dom'
import { STORE_CONFIG } from '../config'

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.04)',
      background: 'linear-gradient(180deg, #060714 0%, #050611 100%)',
    }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '2.5rem 1.5rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}>
        <div>
          <p style={{ fontWeight: 900, fontSize: '1.2rem', letterSpacing: '-0.04em', margin: '0 0 4px' }}>
            <span style={{ color: '#4ade80', textShadow: '0 0 20px rgba(74,222,128,0.4)' }}>IN</span>
            <span style={{ color: '#e2e8f0' }}>CAMI</span>
          </p>
          <p style={{ color: '#1a1c38', fontSize: '0.72rem', margin: 0 }}>{STORE_CONFIG.fullName} · catálogo 26-27</p>
        </div>
        <nav style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
          {[
            { to: '/catalogo/selecciones', label: 'Selecciones' },
            { to: '/catalogo/clubes',      label: 'Clubes'      },
            { to: '/catalogo',             label: 'Todo'        },
          ].map(({ to, label }) => (
            <Link key={to} to={to} style={{ color: '#1e2240', fontSize: '0.82rem', textDecoration: 'none', transition: 'color 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#64748b'}
              onMouseLeave={e => e.currentTarget.style.color = '#1e2240'}
            >{label}</Link>
          ))}
        </nav>
      </div>
      <div style={{ textAlign: 'center', paddingBottom: '1.5rem' }}>
        <p style={{ color: '#12142a', fontSize: '0.7rem', margin: 0 }}>
          © {new Date().getFullYear()} INCAMI — catálogo de exhibición
        </p>
      </div>
    </footer>
  )
}
