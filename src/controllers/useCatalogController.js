import { useNavigate, useParams } from 'react-router-dom'
import { useState, useMemo }      from 'react'
import { useProducts }            from '../hooks/useProducts'
import { useLang }                from '../i18n/LanguageContext'
import { PRODUCT_TYPES }          from '../data/constants'

export const CATS = [
  { val: '',            accent: '#4ade80', glow: 'rgba(74,222,128,0.3)'  },
  { val: 'selecciones', accent: '#a5b4fc', glow: 'rgba(165,180,252,0.3)' },
  { val: 'clubes',      accent: '#f9a8d4', glow: 'rgba(249,168,212,0.3)' },
]

export function useCatalogController() {
  const { cat: catParam } = useParams()
  const navigate          = useNavigate()
  const { products }      = useProducts()
  const { t }             = useLang()

  const activeCat  = catParam ?? ''
  const catInfo    = CATS.find(c => c.val === activeCat) ?? CATS[0]

  const [search,     setSearch]     = useState('')
  const [activeType, setActiveType] = useState('')

  const availableTypes = useMemo(() => {
    const base = activeCat ? products.filter(p => p.category === activeCat) : products
    const types = [...new Set(base.map(p => p.type).filter(Boolean))]
    return types.map(type => ({ val: type, label: t(PRODUCT_TYPES[type]?.labelShortKey ?? type) }))
  }, [products, activeCat, t])

  const filtered = useMemo(() => products.filter(p => {
    const matchCat  = !activeCat   || p.category === activeCat
    const matchType = !activeType  || p.type === activeType
    const q         = search.toLowerCase()
    const matchQ    = !q || p.name.toLowerCase().includes(q) || (p.team ?? '').toLowerCase().includes(q)
    return matchCat && matchType && matchQ
  }), [products, activeCat, activeType, search])

  function goToCategory(val) {
    setActiveType('')
    navigate(val ? `/catalogo/${val}` : '/catalogo')
  }

  function toggleType(val) {
    setActiveType(prev => prev === val ? '' : val)
  }

  return { activeCat, catInfo, search, setSearch, filtered, goToCategory, availableTypes, activeType, toggleType }
}
