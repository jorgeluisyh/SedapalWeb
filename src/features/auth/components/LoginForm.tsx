import { useForm } from 'react-hook-form'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Message } from 'primereact/message' // Para mostrar mensajes de error
import { Card } from 'primereact/card'
import styles from './LoginForm.module.css'
import { Password } from 'primereact/password'
import { useState } from 'react'

interface LoginFormData {
  username: string
  password: string
}

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void
}

export const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>()
  const [showPassword, setShowPassword] = useState(false)
  const [passwordValue, setPasswordValue] = useState('')
  const [usernameValue, setUsernameValue] = useState('')

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className={styles.loginContainer}>
      <Card className={styles.card} title="Inicio de sesión">
        <div className="p-fluid">
          <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
            <div className="flex flex-column gap-2 mb-4">
              <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-user"></i>
                </span>
                <InputText
                  value={usernameValue}
                  onChange={(e) => setUsernameValue(e.target.value)}
                  placeholder="Usuario"
                />
              </div>
            </div>

            <div className="flex flex-column gap-2 mb-4">
              <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-lock"></i>
                </span>
                {/* <Password
                  value={passwordValue}
                  onChange={(e) => setPasswordValue(e.target.value)}
                  feedback={false}
                  toggleMask
                /> */}
                <InputText
                  value={passwordValue}
                  onChange={(e) => setPasswordValue(e.target.value)}
                  placeholder="Contraseña"
                  type={showPassword ? 'text' : 'password'}
                />
                <Button
                  type="button"
                  icon={showPassword ? 'pi pi-eye-slash' : 'pi pi-eye'}
                  className="p-button-text"
                  onClick={togglePasswordVisibility}
                />
              </div>
            </div>
            <div className="flex flex-column gap-2 mb-4">
              <div className="p-inputgroup flex-1">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-lock"></i>
                </span>
                {/* <Password
                  value={passwordValue}
                  onChange={(e) => setPasswordValue(e.target.value)}
                  feedback={false}
                  toggleMask
                /> */}
              </div>
            </div>

            <div className="flex justify-content-center">
              <Button
                label="Login"
                type="submit"
                className="p-button-primary"
              />
            </div>
          </form>
        </div>
      </Card>
    </div>
  )
}

{
  /* <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
      <div className="flex flex-column gap-2 mb-4">
        <label htmlFor="username">Username</label>
        <InputText
          id="username"
          {...register('username', { required: 'Username is required' })}
          className={errors.username ? 'p-invalid' : ''}
        />
        {errors.username && (
          <Message severity="error" text={errors.username.message} />
        )}
      </div>

      <div className="flex flex-column gap-2 mb-4">
        <label htmlFor="password">Password</label>
        <InputText
          id="password"
          type="password"
          {...register('password', { required: 'Password is required' })}
          className={errors.password ? 'p-invalid' : ''}
        />
        {errors.password && (
          <Message severity="error" text={errors.password.message} />
        )}
      </div>

      <div className="flex justify-content-center">
        <Button label="Login" type="submit" className="p-button-primary" />
      </div>
    </form> */
}
