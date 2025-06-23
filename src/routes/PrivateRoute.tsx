// src/routes/PrivateRoute.tsx
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export const PrivateRoute = () => {
  const { authenticated } = useAuth()
  return authenticated ? <Outlet /> : <Navigate to="/login" />
}
