export const STORE_CONFIG = {
  telegramNumber:   '212669766763',
  telegramUsername: '',
  botUsername:      'incami_shop_bot',
  storeName:  'INCAMI',
  fullName:   'info camisetas',
}

// Orden idéntico al CATALOG de bot/products.py
const ORDERED_IDS = [
  'arg-away-26-27','arg-training-26-27','arg-goat-26-27',
  'bra-home-26-27','bra-away-26-27','bra-gk-green-26-27',
  'fra-away-26-27','eng-home-26-27','eng-special-26-27','eng-training-26-27',
  'por-gk-green-26-27','por-gk-pink-26-27','por-gk-grey-26-27','por-goat-26-27',
  'esp-away-26-27','ger-home-26-27','col-home-26-27',
  'ned-home-26-27','ned-away-26-27','cro-home-26-27','cro-away-26-27',
  'jpn-away-26-27','kor-away-26-27','nor-home-26-27','nor-away-26-27',
  'jam-away-26-27','rm-home-26-27','bar-home-26-27','bar-special-26-27',
  'bar-training-26-27','manu-home-26-27','manu-graffiti-26-27','mancity-home-26-27',
  'ars-home-26-27','ars-away-26-27','acm-home-26-27','acm-away-26-27',
  'psg-white-26-27','psg-beige-training-26-27','tot-training-26-27',
  'ben-third-26-27','cel-home-26-27','lag-home-26-27','fla-home-26-27',
  'pal-home-26-27','pal-away-26-27','liv-training-24-26','por-special-25-26',
]

const SIZE_ENC = { S:'S', M:'M', L:'L', XL:'X', '2XL':'2', '3XL':'3', '4XL':'4' }

function telegramBase() {
  return STORE_CONFIG.telegramUsername
    ? `https://t.me/${STORE_CONFIG.telegramUsername}`
    : `https://t.me/+${STORE_CONFIG.telegramNumber}`
}

export function buildTelegramLink(items) {
  if (STORE_CONFIG.botUsername) {
    // Formato compacto: 'p' + grupos de 4 chars por item (II=index, S=size, Q=qty)
    const parts = items.map(i => {
      const idx = ORDERED_IDS.indexOf(i.id)
      if (idx < 0) return null
      const s = SIZE_ENC[i.selectedSize] || 'M'
      const q = Math.min(i.qty, 9)
      const e = i.extras ?? {}
      const ef = (e.parche ? 1 : 0) + (e.numero != null ? 2 : 0) + (e.nombre != null ? 4 : 0)
      return `${String(idx).padStart(2, '0')}${s}${q}${ef}`
    }).filter(Boolean)
    if (!parts.length) return telegramBase()
    return `https://t.me/${STORE_CONFIG.botUsername}?start=p${parts.join('')}`
  }

  const base = telegramBase()
  if (!items?.length) return base

  let grandTotal = 0
  const lines = items.map((item, i) => {
    const e          = item.extras ?? {}
    const extrasList = [
      e.parche  && 'Parche (+5€)',
      e.numero  && `Número: ${e.numero} (+5€)`,
      e.nombre  && `Nombre: ${e.nombre} (+5€)`,
    ].filter(Boolean)
    const extrasLine  = extrasList.length ? `\nExtras: ${extrasList.join(' · ')}` : ''
    const unitPrice   = (item.price ?? 0) + extrasList.length * 5
    const lineTotal   = unitPrice * item.qty
    grandTotal += lineTotal
    return `${i + 1}. ${item.name}\nTalle: ${item.selectedSize} · Cant: ${item.qty} · ${unitPrice}€/ud = ${lineTotal}€${extrasLine}`
  })

  const message = `🛒 Pedido INCAMI\n\n${lines.join('\n\n')}\n\n💰 TOTAL: ${grandTotal}€\n\n¿Confirman disponibilidad?`
  return STORE_CONFIG.telegramUsername
    ? `${base}?text=${encodeURIComponent(message)}`
    : base
}

export function telegramContactLink() {
  return telegramBase()
}
