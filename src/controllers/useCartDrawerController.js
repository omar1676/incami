import { useCart }            from '../context/CartContext'
import { useLang }           from '../i18n/LanguageContext'
import { buildTelegramLink } from '../config'

export function useCartDrawerController() {
  const { items, removeItem, updateQty, totalItems, totalPrice } = useCart()
  const { t } = useLang()

  function itemPrice(item) {
    const e = item.extras ?? {}
    const extras = [e.parche, e.numero, e.nombre].filter(Boolean).length
    return (item.price ?? 0) + extras * 5
  }

  function handleConsultar() {
    if (!items.length) return
    window.open(buildTelegramLink(items), '_blank')
  }

  return { items, removeItem, updateQty, totalItems, totalPrice, itemPrice, handleConsultar, t }
}
