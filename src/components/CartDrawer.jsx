import { useCart } from '../context/CartContext'
import { buildWhatsAppLink, STORE_CONFIG } from '../config'

export default function CartDrawer({ open, onClose }) {
  const { items, removeItem, updateQty, totalItems } = useCart()

  function handleOrder() {
    if (items.length === 0) return
    const link = buildWhatsAppLink(items)
    window.open(link, '_blank')
  }

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-40"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-slate-900 border-l border-slate-700 z-50 flex flex-col transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700">
          <h2 className="text-lg font-bold text-white">
            Carrito {totalItems > 0 && <span className="text-green-400">({totalItems})</span>}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 scrollbar-hide">
          {items.length === 0 ? (
            <div className="text-center py-16 text-slate-500">
              <div className="text-5xl mb-4">🛒</div>
              <p className="text-lg font-medium">El carrito está vacío</p>
              <p className="text-sm mt-1">Agregá camisetas para hacer tu pedido</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4 bg-slate-800 rounded-xl p-4">
                <img
                  src={item.images?.[0]}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg flex-shrink-0 bg-slate-700"
                  onError={(e) => { e.target.src = 'https://placehold.co/80x80/1e293b/94a3b8?text=?' }}
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white text-sm leading-tight">{item.name}</p>
                  <p className="text-green-400 text-sm mt-1">Talle: <span className="font-bold">{item.selectedSize}</span></p>
                  {item.price > 0 && (
                    <p className="text-slate-300 text-sm mt-1">{STORE_CONFIG.currencySymbol}{item.price}</p>
                  )}
                  {/* Qty controls */}
                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() => updateQty(item.id, item.selectedSize, item.qty - 1)}
                      className="w-7 h-7 rounded-full bg-slate-700 hover:bg-slate-600 text-white flex items-center justify-center text-lg leading-none font-bold transition-colors"
                    >−</button>
                    <span className="text-white font-semibold w-4 text-center">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.id, item.selectedSize, item.qty + 1)}
                      className="w-7 h-7 rounded-full bg-slate-700 hover:bg-slate-600 text-white flex items-center justify-center text-lg leading-none font-bold transition-colors"
                    >+</button>
                    <button
                      onClick={() => removeItem(item.id, item.selectedSize)}
                      className="ml-auto text-slate-500 hover:text-red-400 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer — WhatsApp button */}
        <div className="px-6 py-4 border-t border-slate-700">
          {items.length > 0 ? (
            <button
              onClick={handleOrder}
              className="w-full bg-green-500 hover:bg-green-400 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 text-lg transition-colors shadow-lg shadow-green-900/30"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Pedir por WhatsApp
            </button>
          ) : (
            <button
              disabled
              className="w-full bg-slate-700 text-slate-500 font-bold py-4 rounded-xl flex items-center justify-center gap-3 text-lg cursor-not-allowed"
            >
              Carrito vacío
            </button>
          )}
        </div>
      </div>
    </>
  )
}
