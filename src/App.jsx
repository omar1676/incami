import { useState, useCallback } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import PrivateRoute from './components/PrivateRoute'
import IntroAnimation from './components/IntroAnimation'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import ProductDetail from './pages/ProductDetail'
import Admin from './pages/Admin'
import Login from './pages/Login'

export default function App() {
  const [introDone, setIntroDone] = useState(false)
  const handleIntroDone = useCallback(() => setIntroDone(true), [])

  return (
    <>
      {!introDone && <IntroAnimation onDone={handleIntroDone} />}

      <BrowserRouter>
        <div className="min-h-screen flex flex-col" style={{ background: '#050611' }}>
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/catalogo" element={<Catalog />} />
              <Route path="/catalogo/:cat" element={<Catalog />} />
              <Route path="/producto/:id" element={<ProductDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={<PrivateRoute><Admin /></PrivateRoute>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  )
}
