import { useEffect, useState } from 'react'

export function useIntroController({ onDone }) {
  const [collapsed, setCollapsed] = useState(false)
  const [fadeOut,   setFadeOut]   = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setCollapsed(true), 900)
    const t2 = setTimeout(() => setFadeOut(true),   2100)
    const t3 = setTimeout(() => onDone(),            2600)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [onDone])

  return { collapsed, fadeOut }
}
