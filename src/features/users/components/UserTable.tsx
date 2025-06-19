import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { FilterMatchMode } from 'primereact/api'
import { useState, type ChangeEvent } from 'react'
import { UserTableHeader } from './UserTableHeader'
import type { User } from '../types/userType'
import { Checkbox, type CheckboxChangeEvent } from 'primereact/checkbox'
import { Button } from 'primereact/button'

interface Props {
  data: User[]
  onAddClick: () => void
  onAddExternalClick?: () => void
  onAddMultipleClick?: () => void
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
  onAddExternalClick,
  onAddMultipleClick,
}: Props) => {
  const [filters, setFilters] = useState<Filters>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    username: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    profile: { value: null, matchMode: FilterMatchMode.IN },
  })

  const [globalFilterValue, setGlobalFilterValue] = useState('')

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
          onClick={() => console.log(row)} // Llamamos a la función de edición pasando el usuario
          severity="info"
          text
          size="small"
        />
        <Button
          icon="pi pi-trash"
          onClick={() => console.log(row)} // Llamamos a la función de eliminación pasando el ID
          severity="danger"
          text
          size="small"
        />
      </div>
    )
  }

  const onCheckBoxChange = (e: CheckboxChangeEvent, rowDataCheck: User) => {
    rowDataCheck.blocked = e.checked ?? true
    // Realizar la actualización de estado o lo que sea necesario
  }

  return (
    <DataTable
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
      <Column
        header="#"
        body={(_rowData, { rowIndex }) => rowIndex + 1}
        style={{ width: '5%' }}
      />
      <Column
        field="username"
        header="Usuario"
        style={{ width: '30%' }}
        filter
        sortable
      />
      <Column
        field="profile"
        header="Perfil"
        filter
        sortable
        style={{ width: '25%' }}
      />
      <Column
        field="team"
        header="Equipo"
        filter
        sortable
        style={{ width: '25%' }}
      />
      <Column
        field="type"
        header="Tipo"
        filter
        sortable
        style={{ width: '25%' }}
      />
      <Column
        field="blocked"
        header="Bloqueado"
        style={{ width: '25%' }}
        body={(rowDataCheck) => (
          <Checkbox
            checked={rowDataCheck.blocked}
            onChange={(e) => onCheckBoxChange(e, rowDataCheck)}
          />
        )}
      />
      <Column
        body={actionBodyTemplate}
        header="Acciones"
        style={{ width: '15%' }}
      />
    </DataTable>
  )
}
