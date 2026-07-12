import { useState, useCallback } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider }      from './context/CartContext'
import { FavoritesProvider } from './context/FavoritesContext'
import { LanguageProvider }  from './i18n/LanguageContext'
import Header            from './components/Header'
import Footer            from './components/Footer'
import TrustBand         from './components/TrustBand'
import TelegramButton    from './components/TelegramButton'
import IntroAnimation    from './components/IntroAnimation'
import Home              from './views/Home'
import Catalog           from './views/Catalog'
import ProductDetail     from './views/ProductDetail'
import AvisoLegal        from './views/AvisoLegal'
import Privacidad        from './views/Privacidad'
import Cookies           from './views/Cookies'

export default function App() {
  const [introDone, setIntroDone] = useState(false)
  const handleIntroDone = useCallback(() => setIntroDone(true), [])

  return (
    <LanguageProvider>
    <CartProvider>
      <FavoritesProvider>
        {!introDone && <IntroAnimation onDone={handleIntroDone} />}

        <BrowserRouter>
          <div className="min-h-screen flex flex-col" style={{ background: '#050611' }}>
            <Header />
            <TrustBand />
            <main className="flex-1">
              <Routes>
                <Route path="/"                 element={<Home />} />
                <Route path="/catalogo"         element={<Catalog />} />
                <Route path="/catalogo/:cat"    element={<Catalog />} />
                <Route path="/producto/:id"     element={<ProductDetail />} />
                <Route path="/aviso-legal"      element={<AvisoLegal />} />
                <Route path="/privacidad"       element={<Privacidad />} />
                <Route path="/cookies"          element={<Cookies />} />
              </Routes>
            </main>
            <Footer />
          </div>
          <TelegramButton />
        </BrowserRouter>
      </FavoritesProvider>
    </CartProvider>
  </LanguageProvider>
  )
}
