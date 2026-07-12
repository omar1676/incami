export const STORE_CONFIG = {
  telegramNumber:   '34633311108',   // con prefijo país, sin +
  telegramUsername: '',              // pon tu @usuario de Telegram para activar mensajes prellenados
  botUsername:      'incami_shop_bot', // bot de Telegram para pedidos automáticos
  storeName:  'INCAMI',
  fullName:   'info camisetas',
}

function telegramBase() {
  return STORE_CONFIG.telegramUsername
    ? `https://t.me/${STORE_CONFIG.telegramUsername}`
    : `https://t.me/+${STORE_CONFIG.telegramNumber}`
}

export function buildTelegramLink(items) {
  // Si hay bot configurado, usar el bot automático con payload codificado
  if (STORE_CONFIG.botUsername) {
    const payload = btoa(JSON.stringify(
      items.map(i => ({
        id:     i.id,
        size:   i.selectedSize,
        qty:    i.qty,
        extras: i.extras ?? {},
      }))
    )).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
    return `https://t.me/${STORE_CONFIG.botUsername}?start=${payload}`
  }

  // Fallback: mensaje de texto a número/username
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
