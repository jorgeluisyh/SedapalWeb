import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { useForm } from 'react-hook-form'
import type { User } from '../types/userType'
import { Dropdown } from 'primereact/dropdown'
import { useState } from 'react'

interface UpdateUserFormProps {
  // isModalOpen: boolean
  // onIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  onSubmit: (data: User) => Promise<void>
  // onHide: () => void
  handleClose: () => void
  currentService: User
}

export const UpdateUserForm = ({
  // isModalOpen,
  currentService,
  handleClose,
  // onIsModalOpen,
  onSubmit,
}: UpdateUserFormProps) => {
  const { handleSubmit, reset } = useForm<User>({
    mode: 'onBlur',
    defaultValues: currentService,
  })

  // const [searchValue, setSearchValue] = useState('')
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [selectedPerfil, setSelectedPerfil] = useState<string | null>(null)
  const [selectedEquipo, setSelectedEquipo] = useState<string | null>(null)
  const onSubmitNewProduct = async (data: User) => {
    await onSubmit(data)
    reset()
  }

  // Aquí deberías cargar los resultados del LDAP
  const perfiles = [
    { label: 'Admin', value: 'admin' },
    { label: 'Editor', value: 'editor' },
  ]
  const equipos = [
    { label: 'Equipo A', value: 'a' },
    { label: 'Equipo B', value: 'b' },
  ]
  const footer = (
    <div className="flex justify-content-end gap-2">
      <Button
        label="Agregar"
        icon="pi pi-check"
        onClick={() => console.log('Agregar usuario')}
        disabled={!selectedUser || !selectedPerfil || !selectedEquipo}
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
        <div className="mb-3">
          <h4>Datos específicos del nuevo usuario</h4>
          <div className="grid">
            <div className="col-4 flex align-items-center ">
              Usuario Seleccionado:
            </div>
            <div className="col-8">
              <InputText
                value={selectedUser?.usuario || ''}
                disabled
                style={{ width: '100%' }}
              />
            </div>

            <div className="col-4 flex align-items-center p-mb-2">
              Perfiles:
            </div>
            <div className="col-8">
              <Dropdown
                value={selectedPerfil}
                options={perfiles}
                onChange={(e) => setSelectedPerfil(e.value)}
                placeholder="Seleccione"
                className="p-dropdown-sm"
                style={{ width: '100%' }}
              />
            </div>

            <div className="col-4 flex align-items-center p-mb-2">Equipos:</div>
            <div className="col-8">
              <Dropdown
                value={selectedEquipo}
                options={equipos}
                onChange={(e) => setSelectedEquipo(e.value)}
                placeholder="Seleccione"
                className="p-dropdown-sm"
                style={{ width: '100%' }}
              />
            </div>
          </div>
        </div>
      </form>
    </Dialog>
  )
}
