import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "demo-key",
  authDomain: `${import.meta.env.VITE_FIREBASE_PROJECT_ID || "demo"}.firebaseapp.com`,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "demo",
  storageBucket: `${import.meta.env.VITE_FIREBASE_PROJECT_ID || "demo"}.appspot.com`,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "demo-app-id"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Auth exports
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

export default app
