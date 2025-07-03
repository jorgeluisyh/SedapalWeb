import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { useForm } from 'react-hook-form'
import { Dropdown } from 'primereact/dropdown'
import { useState } from 'react'
import type { UserExterno } from '../types/newUserExternalType'
import { FormInput } from '../../../shared/components/form/FormInput'
import { Divider } from 'primereact/divider'
import type { UserPortal } from '../types/userPortalType'
import { validateExternalUser } from '../apis/userApi'
import { FormMultiSelect } from '../../../shared/components/form/FormMultiSelect'
// import { NewUserForm } from './NewUserForm';

interface NewUserExternalFormProps {
  isModalOpen: boolean
  onIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  onSubmit: (data: UserExterno) => Promise<void>
  onHide: () => void
}

export const NewUserExternalForm = ({
  isModalOpen,
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

  const [selectedPerfil, setSelectedPerfil] = useState<string | null>(null)
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
      const userPortal = await validateExternalUser(username)
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

  const perfiles = [
    { label: 'Admin', value: 'admin' },
    { label: 'Editor', value: 'editor' },
    { label: 'Viewer', value: 'viewer' },
  ]

  const onSubmitNewProduct = async (data: UserExterno) => {
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
              placeholder="1044444444"
              control={control}
              errors={errors}
              rules={{ required: 'Ruc o Dni es requerido' }}
            />

            <FormInput
              name="descripcion"
              label="Descripción"
              control={control}
              errors={errors}
            />

            <FormInput
              name="empresa"
              label="Razón Social"
              control={control}
              errors={errors}
            />
            <FormInput
              name="telefono"
              label="Teléfono"
              placeholder="999999999"
              control={control}
              errors={errors}
            />

            <FormInput
              name="notas"
              label="Notas"
              control={control}
              errors={errors}
            />
            <FormMultiSelect
              name="perfiles"
              label="Perfiles"
              control={control}
              errors={errors}
              options={perfiles?.map((perfil) => ({
                label: perfil.label,
                value: perfil.value,
              }))}
            />

            {/* Perfiles */}
            <div className="flex flex-column gap-2 mb-3">
              <label htmlFor="perfil" className="p-text-bold">
                Perfiles:
              </label>
              <Dropdown
                id="perfil"
                value={selectedPerfil}
                options={perfiles}
                onChange={(e) => setSelectedPerfil(e.value)}
                placeholder="Seleccione"
                className="p-dropdown-sm"
              />
            </div>
          </form>
        </>
      )}
    </Dialog>
  )
}
