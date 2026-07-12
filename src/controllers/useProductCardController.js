import { PRODUCT_TYPES } from '../data/constants'
import { useFavorites }  from '../context/FavoritesContext'
import { useLang }       from '../i18n/LanguageContext'

export function useProductCardController(product) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const { t } = useLang()
  const typeInfo = PRODUCT_TYPES[product.type] ?? null
  const fav      = isFavorite(product.id)

  function handleFav(e) {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(product.id)
  }

  return { typeInfo, fav, handleFav, t }
}
