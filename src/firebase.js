import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

// TODO: Reemplazar con las credenciales de tu proyecto Firebase
// Las encontrás en: Firebase Console → Tu proyecto → Configuración → SDK de Firebase
const firebaseConfig = {
  apiKey: 'TU_API_KEY',
  authDomain: 'TU_PROJECT_ID.firebaseapp.com',
  projectId: 'TU_PROJECT_ID',
  storageBucket: 'TU_PROJECT_ID.appspot.com',
  messagingSenderId: 'TU_MESSAGING_SENDER_ID',
  appId: 'TU_APP_ID',
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)
export default app
