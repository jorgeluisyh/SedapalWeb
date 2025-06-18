// src/pages/LoginPage.tsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginForm } from '../components/LoginForm'
import { login } from '../apis/loginApi'
import Cookies from 'js-cookie'
// las paginas consumen las apis
//los componentes reciben informacion

export const LoginPage = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (data: { username: string; password: string }) => {
    console.log('Enviando datos de inicio de sesión:', data)
    const response = await login(data)
    Cookies.set('auth_token', response.token)
    setLoading(true)

    // Aquí realizarías la autenticación real, por ejemplo llamando a tu API

    // Actualmente, simula la autenticación y redirige al dashboard
    setTimeout(() => {
      setLoading(false)
      localStorage.setItem('user', JSON.stringify(data)) // Simulamos el guardado del usuario
      navigate('/dashboard') // Redirige al dashboard o a la página principal
    }, 1000) // Simulando un retraso de 1 segundo
  }

  return <LoginForm onSubmit={handleSubmit} />
}
