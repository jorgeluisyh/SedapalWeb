import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Dropdown } from 'primereact/dropdown'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import type { User } from '../types/userType'
import type { EditMultipleUsers } from '../types/editMultipleUsersType'

interface EditMultipleProfilesProps {
  isModalOpen: boolean
  onIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  onHide: () => void
  onSubmit: (data: User) => Promise<void>
}

export const EditMultipleUsersForm = ({
  isModalOpen,
  onIsModalOpen,
  onSubmit,
}: EditMultipleProfilesProps) => {
  const { handleSubmit, reset } = useForm<User>({
    mode: 'onBlur',
  })

  const [selectedUser, setSelectedUser] = useState<EditMultipleUsers | null>(
    null
  )
  const [selectedPerfil, setSelectedPerfil] = useState<string | null>(null)

  const perfiles = [
    { label: 'Admin', value: 'admin' },
    { label: 'Editor', value: 'editor' },
    { label: 'Viewer', value: 'viewer' },
  ]

  const usuarios = [
    { username: 'user1', profiles: ['Admin', 'Editor'] },
    { username: 'user2', profiles: ['Viewer', 'Admin'] },
  ]

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
        onClick={() => onIsModalOpen(false)}
        className="p-button-sm"
      />
    </div>
  )

  return (
    <Dialog
      header="Editar Múltiples Perfiles"
      visible={isModalOpen}
      maximizable
      style={{ width: '30vw' }}
      onHide={() => {
        if (!isModalOpen) return
        onIsModalOpen(false)
      }}
      footer={footer}
    >
      {/* Usuario seleccionado */}
      <div className="mb-3">
        <h4>Usuarios:</h4>
        <DataTable
          value={usuarios}
          selectionMode="single"
          onSelectionChange={(e) => setSelectedUser(e.value)}
          className="p-datatable-sm"
        >
          <Column field="username" header="Usuario" />
        </DataTable>
      </div>

      {/* Perfiles actuales */}
      {selectedUser && (
        <div className="mb-3">
          <h4>Perfiles Actuales:</h4>
          <DataTable
            value={selectedUser.profiles.map((p) => ({ profiles: p }))}
            className="p-datatable-sm"
          >
            <Column field="profiles" header="Perfil" />
          </DataTable>
        </div>
      )}

      {/* Selección de nuevo perfil */}
      <div className="mb-3">
        <h4>Perfiles:</h4>
        <Dropdown
          value={selectedPerfil}
          options={perfiles}
          onChange={(e) => setSelectedPerfil(e.value)}
          placeholder="Seleccione"
          className="p-dropdown-sm"
        />
      </div>
    </Dialog>
  )
}
