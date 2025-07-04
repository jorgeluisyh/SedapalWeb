import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { useForm } from 'react-hook-form'
import type { User } from '../types/userType'
import type { Profile } from '../../profiles/types/profileType'
import { FormMultiSelect } from '../../../shared/components/form/FormMultiSelect'

interface EditMultipleUsersFormProps {
  handleClose: () => void
  perfiles: Profile[]
  selectedUsers: User[]
  onSubmit: (data: User) => Promise<void>
}

export const EditMultipleUsersForm = ({
  selectedUsers,
  perfiles,
  onSubmit,
  handleClose,
}: EditMultipleUsersFormProps) => {
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<User>({
    mode: 'onBlur',
  })

  const formatPerfil = (profile: Profile) => {
    if (profile && Array.isArray(profile)) {
      return (
        profile
          .map((item) => item.nombrePerfil)
          .join(', ')
          .substring(0, 20) + '...'
      )
    }
    return ''
  }

  const onSubmitNewProduct = async (data: User) => {
    await onSubmit(data)
    reset()
  }

  const footer = (
    <div className="flex justify-content-end gap-2">
      <Button
        label="Agregar"
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
      header="Editar Múltiples Perfiles"
      visible
      maximizable
      style={{ width: '30vw' }}
      onHide={() => {
        handleClose()
      }}
      footer={footer}
    >
      {/* Usuario seleccionado */}
      <div className="mb-3 flex flex-column gap-6">
        <div>
          <h4>Usuarios:</h4>

          <DataTable
            value={selectedUsers}
            className="p-datatable-sm"
            showGridlines
          >
            <Column field="nombre" header="Usuario" />
            <Column
              field="perfiles"
              header="Perfil"
              body={(rowData) => formatPerfil(rowData.perfiles)}
              sortable
              style={{ width: '50%' }}
            />
          </DataTable>
        </div>

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
      </div>
    </Dialog>
  )
}
