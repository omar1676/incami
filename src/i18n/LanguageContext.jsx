import { createContext, useContext, useState } from 'react'
import { es } from './translations'
import { en } from './translations'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en')
  const dict = lang === 'es' ? es : en

  function t(key) {
    return dict[key] ?? key
  }

  function toggleLang() {
    setLang(l => l === 'es' ? 'en' : 'es')
  }

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used inside LanguageProvider')
  return ctx
}
