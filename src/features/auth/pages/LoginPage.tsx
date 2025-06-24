import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginForm } from '../components/LoginForm'
import { authenticateUser } from '../apis/loginApi'
// import Cookies from 'js-cookie'
import { Card } from 'primereact/card'
import styles from './LoginPage.module.css'
import { ProgressSpinner } from 'primereact/progressspinner'
import { useAuth } from '../../../contexts/AuthContext'

// las paginas consumen las apis
//los componentes reciben informacion

export const LoginPage = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()

  const handleSubmit = async (data: { username: string; password: string }) => {
    try {
      setLoading(true)
      setError('')

      console.log('Enviando datos de inicio de sesión:', data)
      // Simulamos un retraso de 1.5 segundos para que se vea el loading
      await new Promise((resolve) => setTimeout(resolve, 2500))
      const response = await authenticateUser(data)

      login(response.token)
      navigate('/')
    } catch (error) {
      console.log(error)

      setError('Ocurrió un error al iniciar sesión')
      setTimeout(() => setError(''), 3000)
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
            <ProgressSpinner
              style={{ width: '50px', height: '50px' }}
              strokeWidth="4"
            />
          </div>
        )}
      </Card>
    </div>
  )
}
