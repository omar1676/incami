import { createContext, useContext, useReducer, useEffect } from 'react'

const CartContext = createContext(null)

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const key = `${action.item.id}-${action.item.selectedSize}`
      const existing = state.find((i) => `${i.id}-${i.selectedSize}` === key)
      if (existing) {
        return state.map((i) =>
          `${i.id}-${i.selectedSize}` === key ? { ...i, qty: i.qty + 1 } : i
        )
      }
      return [...state, { ...action.item, qty: 1 }]
    }
    case 'REMOVE': {
      const key = `${action.id}-${action.size}`
      return state.filter((i) => `${i.id}-${i.selectedSize}` !== key)
    }
    case 'UPDATE_QTY': {
      const key = `${action.id}-${action.size}`
      if (action.qty < 1) {
        return state.filter((i) => `${i.id}-${i.selectedSize}` !== key)
      }
      return state.map((i) =>
        `${i.id}-${i.selectedSize}` === key ? { ...i, qty: action.qty } : i
      )
    }
    case 'CLEAR':
      return []
    default:
      return state
  }
}

function loadCart() {
  try {
    const saved = localStorage.getItem('cart')
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, [], loadCart)

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items))
  }, [items])

  const totalItems = items.reduce((sum, i) => sum + i.qty, 0)

  function addItem(product, selectedSize) {
    dispatch({ type: 'ADD', item: { ...product, selectedSize } })
  }

  function removeItem(id, size) {
    dispatch({ type: 'REMOVE', id, size })
  }

  function updateQty(id, size, qty) {
    dispatch({ type: 'UPDATE_QTY', id, size, qty })
  }

  function clearCart() {
    dispatch({ type: 'CLEAR' })
  }

  return (
    <CartContext.Provider value={{ items, totalItems, addItem, removeItem, updateQty, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
