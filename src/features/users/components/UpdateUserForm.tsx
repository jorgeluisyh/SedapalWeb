import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { useForm } from 'react-hook-form'
import type { User } from '../types/userType'
import type { EditUser } from '../types/editUserType'
import { FormInput } from '../../../shared/components/form/FormInput'
import { FormMultiSelect } from '../../../shared/components/form/FormMultiSelect'
import type { Profile } from '../../profiles/types/profileType'
import type { TeamType } from '../../teams/types/teamType'
import { FormDropdown } from '../../../shared/components/form/FormDropdown'

interface UpdateUserFormProps {
  onSubmit: (data: EditUser) => Promise<void>
  handleClose: () => void
  currentUser: User
  perfiles: Profile[]
  equipos: TeamType[]
}

export const UpdateUserForm = ({
  // isModalOpen,
  currentUser,
  perfiles,
  equipos,
  handleClose,
  onSubmit,
}: UpdateUserFormProps) => {
  const toEditUser = (raw: User): EditUser => ({
    idUsuario: raw.idUsuario,
    nombre: raw.nombre,
    idEquipo: raw.idEquipo ?? 1,
    bloqueado: raw.bloqueado,
    perfiles: Array.isArray(raw.perfiles)
      ? raw.perfiles.map((perfil: Profile) => perfil.idPerfil)
      : [],
  })

  const formatedCurrentUser: EditUser = toEditUser(currentUser)
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm<EditUser>({
    mode: 'onBlur',
    defaultValues: formatedCurrentUser,
  })

  const onSubmitNewProduct = async (data: EditUser) => {
    await onSubmit(data)
    reset()
  }

  const footer = (
    <div className="flex justify-content-end gap-2">
      <Button
        label="Guardar cambios"
        icon="pi pi-check"
        onClick={handleSubmit(onSubmitNewProduct)}
        className="p-button-sm p-button-primary"
      />
      <Button
        label="Cancelar"
        icon="pi pi-times"
        severity="secondary"
        onClick={() => {
          handleClose()
        }}
        className="p-button-sm"
      />
    </div>
  )

  return (
    <Dialog
      header="Agregar Usuario"
      visible={true}
      maximizable
      style={{ width: '35vw' }}
      onHide={() => {
        handleClose()
      }}
      footer={footer}
    >
      <form onSubmit={handleSubmit(onSubmitNewProduct)}>
        {/* Datos del nuevo usuario */}
        <FormInput
          name="nombre"
          label="Nombre:"
          disabled
          control={control}
          errors={errors}
          rules={{ required: 'Ingrese nombre del equipo' }}
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
