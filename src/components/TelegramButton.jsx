import { telegramContactLink } from '../config'

export default function TelegramButton() {
  return (
    <a
      href={telegramContactLink()}
      className="telegram-float"
      target="_blank"
      rel="noreferrer"
      aria-label="Contactar por Telegram"
      style={{
        position: 'fixed', bottom: '1.5rem', right: '1.5rem',
        width: 56, height: 56, borderRadius: '50%',
        background: 'linear-gradient(135deg, #229ED9, #1a7fc1)',
        boxShadow: '0 4px 24px rgba(34,158,217,0.45)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 60, transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        textDecoration: 'none',
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = '0 6px 32px rgba(34,158,217,0.6)' }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)';   e.currentTarget.style.boxShadow = '0 4px 24px rgba(34,158,217,0.45)' }}
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.013 9.484c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L6.972 14.7l-2.946-.92c-.64-.203-.654-.64.136-.953l11.49-4.43c.537-.194 1.006.131.91.851z"/>
      </svg>
    </a>
  )
}
