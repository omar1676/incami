import { useProducts } from '../hooks/useProducts'
import { useLang }     from '../i18n/LanguageContext'

export function useHomeController() {
  const { products } = useProducts()
  const { t }        = useLang()
  const selecciones  = products.filter(p => p.category === 'selecciones')
  const clubes       = products.filter(p => p.category === 'clubes')
  return { products, selecciones, clubes, t }
}
