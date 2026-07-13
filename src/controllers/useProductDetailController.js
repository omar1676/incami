import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useProduct } from '../hooks/useProducts'
import { useCart } from '../context/CartContext'
import { useLang } from '../i18n/LanguageContext'
import { PRODUCT_TYPES, DEFAULT_SIZES } from '../data/constants'

export function useProductDetailController() {
  const { id }       = useParams()
  const navigate     = useNavigate()
  const { product }  = useProduct(id)
  const { addItem }  = useCart()
  const { t }        = useLang()

  const [activeImg,    setActiveImg]    = useState(0)
  const [selectedSize, setSelectedSize] = useState(null)
  const [qty,          setQty]          = useState(1)
  const [added,        setAdded]        = useState(false)
  const [extras,       setExtras]       = useState({ parche: false, numero: null, nombre: null })

  const typeInfo   = product ? (PRODUCT_TYPES[product.type] ?? null)          : null
  const sizes      = product?.sizes ?? DEFAULT_SIZES

  const breadcrumbs = product ? [
    { to: '/', label: t('nav_home') },
    {
      to: `/catalogo/${product.category}`,
      label: product.category === 'selecciones' ? t('nav_national') : t('nav_clubs'),
    },
  ] : []

  const features = product ? [
    t('feat_sizes'),
    `${t('detail_season')} ${product.season}`,
    t('feat_telegram'),
  ] : []

  const toggleParche = () => setExtras(e => ({ ...e, parche: !e.parche }))
  const toggleNumero = () => setExtras(e => ({ ...e, numero: e.numero === null ? '' : null }))
  const toggleNombre = () => setExtras(e => ({ ...e, nombre: e.nombre === null ? '' : null }))
  const setNumero    = v  => setExtras(e => ({ ...e, numero: v }))
  const setNombre    = v  => setExtras(e => ({ ...e, nombre: v.toUpperCase() }))

  function handleAddToCart() {
    if (!selectedSize || !product) return
    addItem(product, selectedSize, {
      parche: extras.parche,
      numero: extras.numero?.trim() || null,
      nombre: extras.nombre?.trim() || null,
    }, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return {
    product, navigate,
    activeImg, setActiveImg,
    selectedSize, setSelectedSize,
    qty, setQty,
    handleAddToCart, added,
    extras, toggleParche, toggleNumero, toggleNombre, setNumero, setNombre,
    typeInfo, sizes, breadcrumbs, features,
    t,
  }
}
