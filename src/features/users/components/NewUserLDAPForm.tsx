import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { useForm } from 'react-hook-form'
import type { User } from '../types/userType'

import { useState } from 'react'
import { validateUsuarioBd, validateUsuarioLdap } from '../apis/userApi'
import type { UserPortal } from '../types/userPortalType'
import { FormMultiSelect } from '../../../shared/components/form/FormMultiSelect'
import { FormDropdown } from '../../../shared/components/form/FormDropdown'
import type { Profile } from '../../profiles/types/profileType'
import type { TeamType } from '../../teams/types/teamType'
import { FormInput } from '../../../shared/components/form/FormInput'

interface NewUserFormProps {
  isModalOpen: boolean
  perfiles: Profile[]
  equipos: TeamType[]
  onIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  onSubmit: (data: User) => Promise<void>
  onHide: () => void
}

export const NewUserForm = ({
  isModalOpen,
  perfiles,
  equipos,
  onIsModalOpen,
  onSubmit,
}: NewUserFormProps) => {
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid },
  } = useForm<User>({ mode: 'onBlur' })
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [usuarioPortal, setUsuarioPortal] = useState<UserPortal | null>(null)

  const onSubmitNewProduct = async (data: User) => {
    debugger
    await onSubmit(data)
    reset()
  }

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
      const tipoInterno = 1
      const response = await validateUsuarioBd(username, tipoInterno)
      console.log('Respuesta del servidor:', response)

      const userPortal = await validateUsuarioLdap(username)
      if (userPortal) {
        reset({
          nombre: userPortal.username,
          bloqueado: 0,
          perfiles: [],
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

  const footer = (
    <div className="flex justify-content-end gap-2">
      <Button
        onClick={handleSubmit(onSubmitNewProduct)}
        label="Agregar"
        disabled={!isValid}
        icon="pi pi-check"
        className="p-button-sm p-button-primary"
      />
      <Button
        label="Cancelar"
        icon="pi pi-times"
        severity="secondary"
        onClick={() => onIsModalOpen(false)}
        className="p-button-sm"
      />
    </div>
  )
  return (
    <Dialog
      header="Agregar Usuario"
      visible={isModalOpen}
      maximizable
      style={{ width: '35vw' }}
      onHide={() => {
        if (!isModalOpen) return
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
      <form onSubmit={handleSubmit(onSubmitNewProduct)}>
        {/* Datos del nuevo usuario */}
        <h4> Datos del nuevo usuario</h4>
        <FormInput
          name="nombre"
          label="Nombre Usuario"
          disabled
          control={control}
          errors={errors}
          rules={{ required: 'Nombre es requerido' }}
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
        <FormDropdown
          name="idEquipo"
          label="Equipo:"
          control={control}
          errors={errors}
          options={
            equipos?.map((equipo) => ({
              label: equipo.nombre,
              value: equipo.idEquipo,
            })) ?? []
          }
          rules={{ required: 'Defina la Gerencia' }} // Puedes agregar reglas como required, minLength, etc.
          placeholder="Seleccione una generencia"
        />
      </form>
    </Dialog>
  )
}
