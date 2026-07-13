import { useCart }            from '../context/CartContext'
import { useLang }           from '../i18n/LanguageContext'
import { buildTelegramLink } from '../config'

export function useCartDrawerController() {
  const { items, removeItem, updateQty, totalItems, totalPrice } = useCart()
  const { t } = useLang()

  function handleConsultar() {
    if (!items.length) return
    window.open(buildTelegramLink(items), '_blank')
  }

  return { items, removeItem, updateQty, totalItems, handleConsultar, t }
}
