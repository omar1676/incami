import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useLang } from '../i18n/LanguageContext'

export function useHeaderController() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const { totalItems } = useCart()
  const { lang, toggleLang, t } = useLang()

  const NAV = [
    { to: '/',                     label: t('nav_home'),     end: true  },
    { to: '/catalogo/selecciones', label: t('nav_national'), end: false },
    { to: '/catalogo/clubes',      label: t('nav_clubs'),    end: false },
    { to: '/catalogo',             label: t('nav_catalog'),  end: true  },
  ]

  return { menuOpen, setMenuOpen, cartOpen, setCartOpen, totalItems, lang, toggleLang, NAV }
}
