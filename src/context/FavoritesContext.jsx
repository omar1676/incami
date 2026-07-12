import { createContext, useContext, useState, useEffect } from 'react'

const FavoritesContext = createContext(null)

function load() {
  try { return JSON.parse(localStorage.getItem('favorites') || '[]') }
  catch { return [] }
}

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(load)

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  const toggleFavorite = id =>
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id])

  const isFavorite = id => favorites.includes(id)

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, count: favorites.length }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error('useFavorites must be used inside FavoritesProvider')
  return ctx
}
