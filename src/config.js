// Configuración del catálogo
// Cambiar whatsappNumber por tu número real (sin + ni espacios, con código de país)
export const STORE_CONFIG = {
  whatsappNumber: '5491100000000', // TODO: reemplazar con tu número real
  storeName: 'INCAMI',
  fullName: 'info camisetas',
}

export function buildWhatsAppLink(product) {
  const message = `Hola! Me interesa esta camiseta: *${product.name}*. ¿Está disponible?`
  return `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`
}
