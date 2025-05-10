import { useState, useEffect, createContext, useContext } from "react"
import { signInWithPopup, signOut } from "firebase/auth"
import { auth, googleProvider } from "@/lib/firebase"

// Create the auth context with a default value of undefined
const AuthContext = createContext(undefined)

// Provider component that wraps app and makes auth object available to any child component that calls useAuth()
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Subscribe to auth state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user)
      setLoading(false)
    })

    // Cleanup subscription on unmount
    return unsubscribe
  }, [])

  // Sign in with Google
  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
    } catch (error) {
      console.error("Error signing in with Google:", error)
      throw error
    }
  }

  // Sign out
  const logout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error("Error signing out:", error)
      throw error
    }
  }

  // The value that will be supplied to any consuming components
  const value = {
    user,
    loginWithGoogle,
    logout,
    loading
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Hook for components to get the auth object and re-render when it changes
export function useAuth() {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  return context
}
