import { useState, useEffect } from 'react'
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, serverTimestamp, query, orderBy } from 'firebase/firestore'
import { signOut } from 'firebase/auth'
import { db, auth } from '../firebase'
import { useNavigate } from 'react-router-dom'

const EMPTY_FORM = {
  name: '',
  category: 'clubes',
  team: '',
  season: '26-27',
  type: 'home',
  price: '',
  sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'],
  images: [''],
  available: true,
  yupooAlbum: '',
}

const SIZE_OPTIONS = ['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL']

export default function Admin() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(EMPTY_FORM)
  const [editing, setEditing] = useState(null) // product id being edited
  const [saving, setSaving] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const navigate = useNavigate()

  useEffect(() => { loadProducts() }, [])

  async function loadProducts() {
    setLoading(true)
    try {
      const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'))
      const snap = await getDocs(q)
      setProducts(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  function startEdit(product) {
    setForm({
      name: product.name || '',
      category: product.category || 'clubes',
      team: product.team || '',
      season: product.season || '26-27',
      type: product.type || 'home',
      price: product.price?.toString() || '',
      sizes: product.sizes || SIZE_OPTIONS,
      images: product.images?.length ? product.images : [''],
      available: product.available !== false,
      yupooAlbum: product.yupooAlbum || '',
    })
    setEditing(product.id)
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function cancelForm() {
    setForm(EMPTY_FORM)
    setEditing(null)
    setShowForm(false)
  }

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true)
    const data = {
      ...form,
      price: parseFloat(form.price) || 0,
      images: form.images.filter(Boolean),
    }
    try {
      if (editing) {
        await updateDoc(doc(db, 'products', editing), { ...data, updatedAt: serverTimestamp() })
      } else {
        await addDoc(collection(db, 'products'), { ...data, createdAt: serverTimestamp() })
      }
      await loadProducts()
      cancelForm()
    } catch (err) {
      alert('Error al guardar: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id) {
    if (!confirm('¿Eliminar este producto?')) return
    await deleteDoc(doc(db, 'products', id))
    await loadProducts()
  }

  function toggleSize(size) {
    setForm((f) => ({
      ...f,
      sizes: f.sizes.includes(size) ? f.sizes.filter((s) => s !== size) : [...f.sizes, size],
    }))
  }

  function updateImage(idx, val) {
    setForm((f) => {
      const imgs = [...f.images]
      imgs[idx] = val
      return { ...f, images: imgs }
    })
  }

  function addImageField() {
    setForm((f) => ({ ...f, images: [...f.images, ''] }))
  }

  async function handleLogout() {
    await signOut(auth)
    navigate('/login')
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-white">Panel Admin</h1>
          <p className="text-slate-400 mt-1">Gestión de productos</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => { setShowForm(true); setEditing(null); setForm(EMPTY_FORM) }}
            className="bg-green-600 hover:bg-green-500 text-white font-bold px-5 py-2.5 rounded-xl transition-colors"
          >
            + Agregar producto
          </button>
          <button
            onClick={handleLogout}
            className="bg-slate-700 hover:bg-slate-600 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors"
          >
            Salir
          </button>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-slate-800 rounded-2xl p-8 mb-10">
          <h2 className="text-xl font-bold text-white mb-6">{editing ? 'Editar producto' : 'Nuevo producto'}</h2>
          <form onSubmit={handleSave} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Name */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Nombre del producto *</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-slate-700 border border-slate-600 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 transition-colors"
                  placeholder="Ej: Real Madrid Home 26-27"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Categoría</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full bg-slate-700 border border-slate-600 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 transition-colors"
                >
                  <option value="clubes">Clubes</option>
                  <option value="selecciones">Selecciones</option>
                </select>
              </div>

              {/* Type */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Tipo</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="w-full bg-slate-700 border border-slate-600 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 transition-colors"
                >
                  <option value="home">Local</option>
                  <option value="away">Visitante</option>
                  <option value="special">Edición Especial</option>
                  <option value="training">Entrenamiento</option>
                </select>
              </div>

              {/* Team */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Equipo</label>
                <input
                  value={form.team}
                  onChange={(e) => setForm({ ...form, team: e.target.value })}
                  className="w-full bg-slate-700 border border-slate-600 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 transition-colors"
                  placeholder="Ej: Real Madrid"
                />
              </div>

              {/* Season */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Temporada</label>
                <input
                  value={form.season}
                  onChange={(e) => setForm({ ...form, season: e.target.value })}
                  className="w-full bg-slate-700 border border-slate-600 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 transition-colors"
                  placeholder="26-27"
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Precio (0 = consultar)</label>
                <input
                  type="number"
                  min="0"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className="w-full bg-slate-700 border border-slate-600 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 transition-colors"
                  placeholder="0"
                />
              </div>

              {/* Yupoo album */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Album Yupoo (ID)</label>
                <input
                  value={form.yupooAlbum}
                  onChange={(e) => setForm({ ...form, yupooAlbum: e.target.value })}
                  className="w-full bg-slate-700 border border-slate-600 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 transition-colors"
                  placeholder="Ej: 229527066"
                />
              </div>
            </div>

            {/* Sizes */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Talles disponibles</label>
              <div className="flex flex-wrap gap-2">
                {SIZE_OPTIONS.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => toggleSize(size)}
                    className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                      form.sizes.includes(size)
                        ? 'bg-green-600 text-white'
                        : 'bg-slate-700 text-slate-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Images */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">URLs de imágenes</label>
              <div className="space-y-2">
                {form.images.map((img, idx) => (
                  <input
                    key={idx}
                    value={img}
                    onChange={(e) => updateImage(idx, e.target.value)}
                    className="w-full bg-slate-700 border border-slate-600 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 transition-colors"
                    placeholder={`URL imagen ${idx + 1} (ej: https://photo.yupoo.com/...)`}
                  />
                ))}
                <button
                  type="button"
                  onClick={addImageField}
                  className="text-sm text-green-400 hover:text-green-300 font-medium"
                >
                  + Agregar otra imagen
                </button>
              </div>
            </div>

            {/* Available toggle */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setForm((f) => ({ ...f, available: !f.available }))}
                className={`w-12 h-6 rounded-full transition-colors relative ${form.available ? 'bg-green-600' : 'bg-slate-600'}`}
              >
                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${form.available ? 'translate-x-7' : 'translate-x-1'}`} />
              </button>
              <span className="text-slate-300 text-sm">
                {form.available ? 'Disponible' : 'Sin stock'}
              </span>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="bg-green-600 hover:bg-green-500 disabled:opacity-60 text-white font-bold px-8 py-3 rounded-xl transition-colors"
              >
                {saving ? 'Guardando...' : editing ? 'Guardar cambios' : 'Crear producto'}
              </button>
              <button
                type="button"
                onClick={cancelForm}
                className="bg-slate-700 hover:bg-slate-600 text-white font-bold px-8 py-3 rounded-xl transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Products list */}
      <div>
        <h2 className="text-lg font-bold text-white mb-4">
          Productos ({products.length})
        </h2>

        {loading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-slate-800 rounded-xl h-20 animate-pulse" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16 text-slate-500 bg-slate-800 rounded-2xl">
            <p>No hay productos. Creá el primero.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {products.map((p) => (
              <div key={p.id} className="flex items-center gap-4 bg-slate-800 rounded-xl p-4">
                <img
                  src={p.images?.[0]}
                  alt={p.name}
                  className="w-16 h-16 rounded-lg object-cover flex-shrink-0 bg-slate-700"
                  onError={(e) => { e.target.src = 'https://placehold.co/64x64/1e293b/94a3b8?text=?' }}
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white text-sm">{p.name}</p>
                  <p className="text-slate-400 text-xs mt-0.5 capitalize">
                    {p.category} • {p.season} • {p.available ? '✓ Disponible' : '✗ Sin stock'}
                  </p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => startEdit(p)}
                    className="text-slate-400 hover:text-white text-sm px-3 py-1.5 rounded-lg hover:bg-slate-700 transition-colors"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="text-red-400 hover:text-red-300 text-sm px-3 py-1.5 rounded-lg hover:bg-slate-700 transition-colors"
                  >
                    Borrar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
