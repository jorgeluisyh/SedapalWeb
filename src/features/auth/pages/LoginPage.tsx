import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginForm } from '../components/LoginForm'
import { authenticateUser } from '../apis/loginApi'
import Cookies from 'js-cookie'
import { Card } from 'primereact/card'
import styles from './LoginPage.module.css'
// las paginas consumen las apis
//los componentes reciben informacion

export const LoginPage = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (data: { username: string; password: string }) => {
    try {
      setLoading(true)
      setError('')

      console.log('Enviando datos de inicio de sesión:', data)
      // Simulamos un retraso de 1.5 segundos para que se vea el loading
      await new Promise((resolve) => setTimeout(resolve, 2500))
      const response = await authenticateUser(data)

      Cookies.set('auth_token', response.token)
      localStorage.setItem(
        'user',
        JSON.stringify({
          username: data.username,
          token: response.token,
        })
      )
      navigate('/dashboard')
    } catch (error) {
      console.log(error)

      setError('Ocurrió un error al iniciar sesión')
      setTimeout(() => setError(''), 5000)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.loginContainer}>
      <Card className={styles.card} title="Inicio de sesión">
        <LoginForm onLogin={handleSubmit} loading={loading} />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {loading && (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <p>Verificando credenciales...</p>
            {/* Puedes añadir un spinner aquí */}
            <div
              style={{
                width: '40px',
                height: '40px',
                margin: '20px auto',
                border: '4px solid #f3f3f3',
                borderTop: '4px solid #3498db',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
              }}
            ></div>
          </div>
        )}
      </Card>
    </div>
  )
}
