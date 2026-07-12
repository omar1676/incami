import { Link }                from 'react-router-dom'
import { useLang }            from '../i18n/LanguageContext'
import { STORE_CONFIG, telegramContactLink } from '../config'

const NAV_KEYS = [
  { to: '/catalogo/selecciones', key: 'nav_national' },
  { to: '/catalogo/clubes',      key: 'nav_clubs'    },
  { to: '/catalogo',             key: 'nav_catalog'  },
]

const FAQ_KEYS = ['faq_1', 'faq_2', 'faq_3', 'faq_4']

const LEGAL = [
  { to: '/aviso-legal', key: 'legal_notice'  },
  { to: '/privacidad',  key: 'legal_privacy' },
  { to: '/cookies',     key: 'legal_cookies' },
]

export default function Footer() {
  const { t } = useLang()

  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.07)',
      background: 'linear-gradient(180deg, #060714 0%, #050611 100%)',
    }}>
      <div style={{
        maxWidth: 1400, margin: '0 auto', padding: '3.5rem 1.5rem 2.5rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '2.5rem',
      }}>

        {/* Marca */}
        <div>
          <p style={{ fontWeight: 900, fontSize: '1.35rem', letterSpacing: '-0.04em', margin: '0 0 8px' }}>
            <span style={{ color: '#4ade80', textShadow: '0 0 24px rgba(74,222,128,0.4)' }}>IN</span>
            <span style={{ color: '#e2e8f0' }}>CAMI</span>
          </p>
          <p style={{ color: '#475569', fontSize: '0.78rem', margin: '0 0 4px' }}>{STORE_CONFIG.fullName}</p>
          <p style={{ color: '#334155', fontSize: '0.72rem', margin: '0 0 18px' }}>{t('footer_season')}</p>
          <a href={telegramContactLink()} target="_blank" rel="noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(34,158,217,0.12)', border: '1px solid rgba(34,158,217,0.25)',
            color: '#229ED9', fontSize: '0.78rem', fontWeight: 700,
            padding: '7px 14px', borderRadius: 8, textDecoration: 'none', transition: 'opacity 0.15s',
          }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.75'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.013 9.484c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L6.972 14.7l-2.946-.92c-.64-.203-.654-.64.136-.953l11.49-4.43c.537-.194 1.006.131.91.851z"/>
            </svg>
            {t('footer_contact')}
          </a>
        </div>

        {/* Catálogo */}
        <div>
          <p style={{ color: '#64748b', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 14px' }}>{t('footer_catalog')}</p>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {NAV_KEYS.map(({ to, key }) => (
              <Link key={to} to={to} style={{ color: '#475569', fontSize: '0.85rem', textDecoration: 'none', fontWeight: 500, transition: 'color 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#94a3b8'}
                onMouseLeave={e => e.currentTarget.style.color = '#475569'}
              >{t(key)}</Link>
            ))}
          </nav>
        </div>

        {/* FAQ */}
        <div>
          <p style={{ color: '#64748b', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 14px' }}>{t('footer_faq')}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {FAQ_KEYS.map(key => (
              <p key={key} style={{ color: '#334155', fontSize: '0.8rem', margin: 0, lineHeight: 1.45 }}>{t(key)}</p>
            ))}
          </div>
        </div>

        {/* Contacto */}
        <div>
          <p style={{ color: '#64748b', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 14px' }}>{t('footer_contact_t')}</p>
          <p style={{ color: '#475569', fontSize: '0.82rem', margin: '0 0 6px', lineHeight: 1.55 }}>{t('footer_tg_only')}</p>
          <p style={{ color: '#334155', fontSize: '0.78rem', margin: '0 0 14px' }}>{t('footer_reply')}</p>
          <p style={{ color: '#64748b', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', margin: '0 0 6px' }}>{t('footer_hours_lbl')}</p>
          <p style={{ color: '#334155', fontSize: '0.78rem', margin: 0 }}>{t('footer_hours')}</p>
        </div>

        {/* Legal */}
        <div>
          <p style={{ color: '#64748b', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 14px' }}>{t('footer_legal')}</p>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {LEGAL.map(({ to, key }) => (
              <Link key={to} to={to} style={{ color: '#334155', fontSize: '0.82rem', textDecoration: 'none', fontWeight: 500, transition: 'color 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#64748b'}
                onMouseLeave={e => e.currentTarget.style.color = '#334155'}
              >{t(key)}</Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Disclaimer */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)', padding: '1.25rem 1.5rem', maxWidth: 1400, margin: '0 auto' }}>
        <p style={{
          color: '#1e2240', fontSize: '0.68rem', lineHeight: 1.7, margin: '0 0 12px',
          borderLeft: '2px solid rgba(255,255,255,0.05)', paddingLeft: 12,
        }}>
          {t('footer_disclaimer')}
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
          <p style={{ color: '#334155', fontSize: '0.72rem', margin: 0 }}>
            © {new Date().getFullYear()} INCAMI — {t('footer_copy')}
          </p>
          <p style={{ color: '#1e2240', fontSize: '0.68rem', margin: 0 }}>{t('footer_season_tag')}</p>
        </div>
      </div>
    </footer>
  )
}
