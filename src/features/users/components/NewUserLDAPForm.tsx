import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { useForm } from 'react-hook-form'
import type { User } from '../types/userType'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Dropdown } from 'primereact/dropdown'
import { useState } from 'react'

interface NewUserFormProps {
  isModalOpen: boolean
  onIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  onSubmit: (data: User) => Promise<void>
  onHide: () => void
}

export const NewUserForm = ({
  isModalOpen,
  onIsModalOpen,
  onSubmit,
}: NewUserFormProps) => {
  const { handleSubmit, reset } = useForm<User>({ mode: 'onBlur' })

  const [searchValue, setSearchValue] = useState('')
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [selectedPerfil, setSelectedPerfil] = useState<string | null>(null)
  const [selectedEquipo, setSelectedEquipo] = useState<string | null>(null)
  const onSubmitNewProduct = async (data: User) => {
    await onSubmit(data)
    reset()
  }

  const buscarUsuario = () => {
    // Aquí iría la lógica para buscar usuarios por LDAP
    console.log('Buscando usuario:', searchValue)
  }
  const usuariosEncontrados = [
    { usuario: 'user1', nombres: 'Juan Perez' },
    { usuario: 'user2', nombres: 'Maria Lopez' },
  ] // Aquí deberías cargar los resultados del LDAP
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
      <form onSubmit={handleSubmit(onSubmitNewProduct)}>
        {/* Búsqueda */}
        <div className="flex align-items-center gap-4 mb-3">
          <label
            htmlFor="buscarUsuario"
            className="p-text-bold"
            style={{ width: '100px' }}
          >
            Usuario:
          </label>
          <InputText
            id="buscarUsuario"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="p-inputtext-sm"
            style={{ width: '80%' }}
          />
          <Button
            icon="pi pi-search"
            onClick={buscarUsuario}
            className="p-button-sm"
          />
        </div>

        {/* Tabla de resultados */}
        <div className="p-1 border-1 border-round mb-4">
          <h4>Usuarios encontrados en LDAP</h4>
          <DataTable
            value={usuariosEncontrados}
            selectionMode="single"
            onSelectionChange={(e) => setSelectedUser(e.value)}
            className="p-datatable-sm"
          >
            <Column field="usuario" header="Usuario" />
            <Column field="nombres" header="Nombres" />
          </DataTable>
        </div>

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
