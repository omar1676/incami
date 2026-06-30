import { useState, useEffect } from 'react'
import { collection, getDocs, doc, getDoc, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase'
import { sampleProducts } from '../data/products'

// Returns true if Firebase is properly configured
function isFirebaseConfigured() {
  try {
    return !db.app.options.apiKey.startsWith('TU_')
  } catch {
    return false
  }
}

export function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function load() {
      if (!isFirebaseConfigured()) {
        setProducts(sampleProducts)
        setLoading(false)
        return
      }
      try {
        const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'))
        const snap = await getDocs(q)
        const docs = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
        setProducts(docs.length > 0 ? docs : sampleProducts)
      } catch (err) {
        console.error(err)
        setProducts(sampleProducts)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return { products, loading, error }
}

export function useProduct(id) {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function load() {
      if (!isFirebaseConfigured()) {
        const found = sampleProducts.find((p) => p.id === id)
        setProduct(found || null)
        setLoading(false)
        return
      }
      try {
        const snap = await getDoc(doc(db, 'products', id))
        if (snap.exists()) {
          setProduct({ id: snap.id, ...snap.data() })
        } else {
          // fallback to sample
          const found = sampleProducts.find((p) => p.id === id)
          setProduct(found || null)
        }
      } catch (err) {
        console.error(err)
        const found = sampleProducts.find((p) => p.id === id)
        setProduct(found || null)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  return { product, loading, error }
}
