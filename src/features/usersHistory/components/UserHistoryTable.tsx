import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { FilterMatchMode } from 'primereact/api'
import { useState, type ChangeEvent } from 'react'
import { UserHistoryTableHeader } from './UserHistoryTableHeader'
import { Button } from 'primereact/button'
import type { User } from '../../users/types/userType'

interface UserHistoryTableProps {
  data: User[]
  onAddClick: () => void
  onSelectedFilterClick: (row: User) => void
}

interface Filter {
  value: string | null
  matchMode: FilterMatchMode
}
interface Filters {
  [key: string]: Filter
}

export const UserHistoryTable = ({
  data,
  onAddClick,
  onSelectedFilterClick,
}: UserHistoryTableProps) => {
  const [filters, setFilters] = useState<Filters>({
    user: { value: null, matchMode: FilterMatchMode.CONTAINS },
    profile: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    team: { value: null, matchMode: FilterMatchMode.IN },
    global: { value: '', matchMode: FilterMatchMode.CONTAINS },
  })

  const [globalFilterValue, setGlobalFilterValue] = useState('')

  const actionBodyTemplate = (row: User) => {
    return (
      <div className="flex justify-content-center ">
        <Button
          icon="pi pi-address-book"
          onClick={() => onSelectedFilterClick(row)} // Llamamos a la función de edición pasando el servicio
          // onClick={() => onUpdateClick(row)}
          severity="info"
          text
          size="large"
        />
      </div>
    )
  }

  const onGlobalFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    let _filters = { ...filters }
    _filters['global'].value = value
    setFilters(_filters)
    setGlobalFilterValue(value)
  }

  return (
    <DataTable
      showGridlines
      header={
        <UserHistoryTableHeader
          globalFilterValue={globalFilterValue}
          onGlobalFilterChange={onGlobalFilterChange}
          onAddClick={onAddClick}
        />
      }
      value={data}
      filters={filters}
      paginator
      rows={10}
      rowsPerPageOptions={[10, 25, 50]}
      tableStyle={{ minWidth: '50rem' }}
      size="small"
      removableSort
      emptyMessage="No existen coincidencias"
    >
      <Column
        header="Nº"
        body={(_rowData, { rowIndex }) => rowIndex + 1}
        style={{ width: '5%' }}
      />
      <Column
        field="nombre"
        header="Usuario"
        style={{ width: '20%' }}
        sortable
      />
      <Column
        field="perfil"
        header="Perfil"
        body={(rowData) =>
          rowData.perfiles
            ? rowData.perfiles.map((p: any) => p.nombrePerfil).join(', ')
            : ''
        }
        sortable
        style={{ width: '25%' }}
      />
      <Column
        field="equipo"
        header="Equipo"
        sortable
        body={(rowData) => rowData.equipo || 'SIN EQUIPO'}
        style={{ width: '25%' }}
      />
      <Column
        field="tipo"
        header="Tipo"
        sortable
        body={(rowData) => (
          <span>{rowData.tipo === 1 ? 'LDAP' : 'EXTERNO'}</span>
        )}
        style={{ width: '10%' }}
      />
      <Column
        field="bloqueado"
        header="Bloqueado"
        body={(rowDataCheck) => (
          <span>{rowDataCheck.bloqueado === 1 ? 'Sí' : 'No'}</span>
        )}
        style={{ width: '10%' }}
      />
      <Column
        body={actionBodyTemplate}
        header="Acciones"
        style={{ width: '20%' }}
      />
    </DataTable>
  )
}
