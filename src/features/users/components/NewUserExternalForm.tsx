import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import type { UserExterno } from '../types/newUserExternalType'
import { FormInput } from '../../../shared/components/form/FormInput'
import { Divider } from 'primereact/divider'
import type { UserPortal } from '../types/userPortalType'
import { validateExternalUserPortal, validateUsuarioBd } from '../apis/userApi'
import { FormMultiSelect } from '../../../shared/components/form/FormMultiSelect'
import type { Profile } from '../../profiles/types/profileType'

interface NewUserExternalFormProps {
  isModalOpen: boolean
  perfiles: Profile[]
  onIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  onSubmit: (data: UserExterno) => Promise<void>
}

export const NewUserExternalForm = ({
  isModalOpen,
  perfiles,
  onIsModalOpen,
  onSubmit,
}: NewUserExternalFormProps) => {
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid },
  } = useForm<UserExterno>({
    mode: 'onBlur',
  })

  const [usuarioPortal, setUsuarioPortal] = useState<UserPortal | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const buscarUsuarioPortal = async () => {
    setUsuarioPortal(null)
    const username = (
      document.getElementById('buscarUsuario') as HTMLInputElement
    ).value

    if (!username) {
      alert('Por favor, ingresa un nombre de usuario')
      return
    }

    try {
      debugger
      const tipoExterno = 2
      const response = await validateUsuarioBd(username, tipoExterno)
      console.log('Respuesta del servidor:', response)

      const userPortal = await validateExternalUserPortal(username)
      if (userPortal) {
        reset({
          nombreUsuario: userPortal.username,
          nombreCompleto: userPortal.fullName,
          correo: userPortal.email,
        })
        setUsuarioPortal(userPortal)
        setErrorMessage(null)
      } else {
        setErrorMessage('Usuario no existe en el portal')
      }
    } catch (error) {
      console.error('Error al buscar usuario en el portal:', error)
      setErrorMessage('Error al buscar usuario en el portal')
    }
  }

  const onSubmitNewProduct = async (data: UserExterno) => {
    data.token = ''
    data.clave = ''
    await onSubmit(data)
    setUsuarioPortal(null)
    reset()
  }

  const footer = (
    <div className="flex justify-content-end gap-2">
      <Button
        label="Agregar"
        // deshabilitar cuando haya errores en errorMessage
        disabled={!isValid || !usuarioPortal}
        icon="pi pi-check"
        onClick={handleSubmit(onSubmitNewProduct)}
        className="p-button-sm p-button-primary"
      />
      <Button
        label="Cancelar"
        icon="pi pi-times"
        severity="secondary"
        onClick={() => {
          setUsuarioPortal(null)
          setErrorMessage(null)
          reset()
          onIsModalOpen(false)
        }}
        className="p-button-sm"
      />
    </div>
  )

  return (
    <Dialog
      header="Agregar usuario Externo"
      visible={isModalOpen}
      maximizable
      style={{ width: '30vw' }}
      onHide={() => {
        setUsuarioPortal(null)
        setErrorMessage(null)
        reset()
        onIsModalOpen(false)
      }}
      footer={footer}
    >
      <label
        htmlFor="buscarUsuario"
        className="p-text-bold"
        style={{ width: '100px' }}
      >
        Buscar Usuario en Portal
      </label>
      <div className="p-inputgroup flex-1">
        <InputText id="buscarUsuario" placeholder="Usuario portal..." />
        <Button
          id="btnBuscarUsuarioPortal"
          icon="pi pi-search"
          className="p-button-info"
          onClick={buscarUsuarioPortal}
        />
      </div>
      <small className="p-error" hidden={errorMessage === null}>
        {errorMessage}
      </small>
      {usuarioPortal && (
        <>
          <Divider />
          <form onSubmit={handleSubmit(onSubmitNewProduct)}>
            {/* Login */}
            <FormInput
              name="nombreUsuario"
              label="Login"
              disabled
              control={control}
              errors={errors}
              rules={{ required: 'Login es requerido' }}
            />

            <FormInput
              name="correo"
              label="Correo"
              disabled
              placeholder="username@dominio.com"
              control={control}
              errors={errors}
              rules={{ required: 'email es requerido' }}
            />
            <FormInput
              name="nombreCompleto"
              label="Representante"
              control={control}
              errors={errors}
              rules={{ required: 'Representante es requerido' }}
            />
            <FormInput
              name="ruc"
              label="Ruc/Dni"
              control={control}
              errors={errors}
              rules={{ required: 'Ruc o Dni es requerido' }}
            />

            <FormInput
              name="descripcion"
              label="Descripción"
              control={control}
              errors={errors}
              rules={{ required: 'Descripción es requerida' }}
            />

            <FormInput
              name="empresa"
              label="Razón Social"
              control={control}
              errors={errors}
              rules={{ required: 'Nombre de la empresa es requerido' }}
            />
            <FormInput
              name="telefono"
              label="Teléfono"
              control={control}
              errors={errors}
              rules={{ required: 'Número de teléfono es requerido' }}
            />

            <FormInput
              name="notas"
              label="Notas"
              control={control}
              errors={errors}
              rules={{ required: 'Se requiere agregar notas' }}
            />
            <FormMultiSelect
              name="perfiles"
              label="Perfiles"
              control={control}
              errors={errors}
              options={perfiles?.map((perfil) => ({
                label: perfil.nombrePerfil,
                value: perfil.idPerfil,
              }))}
            />
          </form>
        </>
      )}
    </Dialog>
  )
}
