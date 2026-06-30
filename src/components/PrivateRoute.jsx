import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { Navigate } from 'react-router-dom'
import { auth } from '../firebase'

export default function PrivateRoute({ children }) {
  const [user, setUser] = useState(undefined)

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => setUser(u))
  }, [])

  if (user === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-green-400 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return user ? children : <Navigate to="/login" replace />
}
