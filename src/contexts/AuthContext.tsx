import { useState, useEffect, createContext, useContext } from 'react'
import type { AuthContextType } from './types/authContextType'
import {
  isAuthenticated,
  removeAuthToken,
  setAuthToken,
} from '../shared/utils/auth'

const AuthContext = createContext<AuthContextType | null>(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe usarse dentro de <AuthProvider>')
  }
  return context
}

// Este componente será el proveedor de datos de autenticación
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authenticated, setAuthenticated] = useState(true)

  // Cuando inicia la app, preguntamos si ya está logueado
  useEffect(() => {
    setAuthenticated(isAuthenticated())
  }, [])

  // Esta función se llama cuando el usuario inicia sesión
  const login = (token: string) => {
    setAuthToken(token) // Guarda el token en las cookies
    setAuthenticated(true) // Cambia el estado global
  }

  // Esta función se llama cuando cierra sesión
  const logout = () => {
    removeAuthToken() // Elimina el token
    setAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ authenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
