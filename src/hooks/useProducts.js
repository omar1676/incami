import { sampleProducts } from '../data/products'

export function useProducts() {
  return { products: sampleProducts }
}

export function useProduct(id) {
  return { product: sampleProducts.find(p => p.id === id) ?? null }
}
