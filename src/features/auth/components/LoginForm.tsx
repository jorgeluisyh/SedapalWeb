import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { useState } from 'react'

interface LoginFormData {
  username: string
  password: string
}

interface LoginFormProps {
  onLogin: (data: LoginFormData) => void
  loading: boolean
}

export const LoginForm = ({ onLogin, loading }: LoginFormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault() // Evita que el formulario recargue la página
    onLogin({ username: usernameValue, password: passwordValue }) // Llama a la función `onLogin` pasando email y contraseña
  }
  const [passwordValue, setPasswordValue] = useState('')
  const [usernameValue, setUsernameValue] = useState('')

  return (
    <>
      <div className="p-fluid">
        <form onSubmit={handleSubmit} className="p-fluid">
          <div className="flex flex-column gap-2 mb-4">
            <label htmlFor="username">Usuario</label>
            <InputText
              disabled={loading}
              id="username"
              value={usernameValue}
              onChange={(e) => setUsernameValue(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-column gap-2 mb-4">
            <label htmlFor="password">Contraseña</label>
            <Password
              disabled={loading}
              id="password"
              value={passwordValue}
              onChange={(e) => setPasswordValue(e.target.value)}
              feedback={false}
              toggleMask
              required
            />
          </div>

          <div className="flex justify-content-center">
            <Button
              disabled={loading}
              label="Login"
              style={{
                padding: '12px',
                border: 'none',
                borderRadius: '4px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '16px',
                transition: 'background-color 0.3s',
              }}
              type="submit"
              className="p-button-primary"
            />
          </div>
        </form>
      </div>
    </>
  )
}
