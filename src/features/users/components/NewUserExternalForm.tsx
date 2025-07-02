import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { useForm } from 'react-hook-form'
import { Dropdown } from 'primereact/dropdown'
import { useState } from 'react'
import type { NewUserExternal } from '../types/newUserExternalType'
import { FormInput } from '../../../shared/components/form/FormInput'
import { Divider } from 'primereact/divider'
import type { UserPortal } from '../types/userPortalType'
import { validateUser } from '../apis/userApi'
// import { NewUserForm } from './NewUserForm';

interface NewUserExternalFormProps {
  isModalOpen: boolean
  onIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  onSubmit: (data: NewUserExternal) => Promise<void>
  onHide: () => void
}

export const NewUserExternalForm = ({
  isModalOpen,
  onIsModalOpen,
  onSubmit,
}: NewUserExternalFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid },
  } = useForm<NewUserExternal>({
    mode: 'onBlur',
  })

  const [selectedPerfil, setSelectedPerfil] = useState<string | null>(null)
  const [usuarioPortal, setUsuarioPortal] = useState<UserPortal | null>(null)

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
      const userPortal = await validateUser(username)
      debugger
      // Aquí va la llamada a tu API (cambia la URL a la correcta)
      if (userPortal) {
        reset({
          login: userPortal.username,
          representante: userPortal.fullName,
          email: userPortal.email,
        })
        setUsuarioPortal(userPortal)
      }
    } catch (error) {
      console.error('Error al buscar usuario en el portal:', error)
    }
  }

  const perfiles = [
    { label: 'Admin', value: 'admin' },
    { label: 'Editor', value: 'editor' },
    { label: 'Viewer', value: 'viewer' },
  ]

  const onSubmitNewProduct = async (data: NewUserExternal) => {
    await onSubmit(data)
    setUsuarioPortal(null)
    reset()
  }

  const footer = (
    <div className="flex justify-content-end gap-2">
      <Button
        label="Agregar"
        disabled={!isValid}
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
      <Divider />
      {usuarioPortal && (
        <form onSubmit={handleSubmit(onSubmitNewProduct)}>
          {/* Login */}
          <FormInput
            name="login"
            label="Login"
            disabled
            control={control}
            errors={errors}
            rules={{ required: 'Login es requerido' }}
          />

          <FormInput
            name="representante"
            label="Representante"
            disabled
            control={control}
            errors={errors}
            rules={{ required: 'Representante es requerido' }}
          />

          <FormInput
            name="email"
            label="Correo"
            disabled
            placeholder="username@dominio.com"
            control={control}
            errors={errors}
            rules={{ required: 'email es requerido' }}
          />

          <FormInput
            name="descripcion"
            label="Descripción"
            control={control}
            errors={errors}
          />

          <FormInput
            name="razonSocial"
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
            name="rucDni"
            label="Ruc/Dni"
            placeholder="1044444444"
            control={control}
            errors={errors}
            rules={{ required: 'Ruc o Dni es requerido' }}
          />
          <FormInput
            name="notas"
            label="Notas"
            control={control}
            errors={errors}
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
      )}
    </Dialog>
  )
}
