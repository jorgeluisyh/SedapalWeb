import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { FilterMatchMode } from 'primereact/api'
import { useState, type ChangeEvent } from 'react'
import { UserTableHeader } from './UserTableHeader'
import type { User } from '../types/userType'
import { Button } from 'primereact/button'
import type { Profile } from '../../profiles/types/profileType'
import { InputSwitch } from 'primereact/inputswitch'

interface UserTableProps {
  data: User[]
  onAddClick: () => void
  onAddExternalClick?: () => void
  onAddMultipleClick?: () => void
  onUpdateClick: (users: User | null) => void
  onDeleteClick: (users: User) => void
  onSwichtClick: (team: User) => void
}

interface Filter {
  value: string | null
  matchMode: FilterMatchMode
}
interface Filters {
  [key: string]: Filter
}

export const UserTable = ({
  data,
  onAddClick,
  onUpdateClick,
  onDeleteClick,
  onAddExternalClick,
  onAddMultipleClick,
  onSwichtClick,
}: UserTableProps) => {
  const [filters, setFilters] = useState<Filters>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    username: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    profile: { value: null, matchMode: FilterMatchMode.IN },
  })

  const [globalFilterValue, setGlobalFilterValue] = useState('')
  const [selectedProducts, setSelectedProducts] = useState<User[]>([])

  const onGlobalFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    let _filters = { ...filters }
    _filters['global'].value = value
    setFilters(_filters)
    setGlobalFilterValue(value)
  }

  const actionBodyTemplate = (row: User) => {
    return (
      <div className="flex justify-content-center ">
        <Button
          icon="pi pi-pencil"
          onClick={() => onUpdateClick(row)} // Llamamos a la función de edición pasando el usuario
          severity="info"
          text
          size="small"
        />
        <Button
          icon="pi pi-trash"
          onClick={() => onDeleteClick(row)} // Llamamos a la función de eliminación pasando el ID
          severity="danger"
          text
          size="small"
        />
      </div>
    )
  }

  const checkedBodyTemplate = (row: User) => {
    return (
      <InputSwitch
        checked={row.bloqueado === 1}
        onChange={() => onSwichtClick(row)} // Llamamos a la función de cambio de estado
      />
    )
  }

  const formatPerfil = (profile: Profile) => {
    if (profile && Array.isArray(profile)) {
      return profile.map((item) => item.nombrePerfil).join(', ')
    }
    return ''
  }

  return (
    <DataTable
      selectionMode={'checkbox'}
      selection={selectedProducts}
      onSelectionChange={(e) => setSelectedProducts(e.value)}
      header={
        <UserTableHeader
          globalFilterValue={globalFilterValue}
          onGlobalFilterChange={onGlobalFilterChange}
          onAddClick={onAddClick}
          onAddExternalClick={onAddExternalClick}
          onAddMultipleClick={onAddMultipleClick}
        />
      }
      value={data}
      filters={filters}
      paginator
      rows={5}
      rowsPerPageOptions={[5, 10, 25, 50]}
      tableStyle={{ minWidth: '50rem' }}
      size="small"
      removableSort
      emptyMessage="No existen coincidencias"
    >
      <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
      <Column
        header="#"
        body={(_rowData, { rowIndex }) => rowIndex + 1}
        style={{ width: '5%' }}
      />
      <Column
        field="nombre"
        header="Usuario"
        style={{ width: '30%' }}
        sortable
      />
      <Column field="perfil" header="Perfil" hidden style={{ width: '25%' }} />
      <Column
        field="perfiles"
        header="Perfil"
        body={(rowData) => formatPerfil(rowData.perfiles)}
        sortable
        style={{ width: '25%' }}
      />
      <Column
        field="equipo"
        body={(rowData) => rowData.equipo || 'SIN EQUIPO'}
        header="Equipo"
        sortable
        style={{ width: '25%' }}
      />
      <Column field="tipo" header="Tipo" sortable style={{ width: '25%' }} />
      <Column
        field="bloqueado"
        header="Bloqueado"
        style={{ width: '25%' }}
        body={checkedBodyTemplate}
      />
      <Column
        body={actionBodyTemplate}
        header="Acciones"
        style={{ width: '15%' }}
      />
    </DataTable>
  )
}
