import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { FilterMatchMode } from 'primereact/api'
import { useState, type ChangeEvent } from 'react'
import { UserHistoryTableHeader } from './UserHistoryTableHeader'
import type { UserHistoryType } from '../types/userHistoryType'

interface Props {
  data: UserHistoryType[]
  onAddClick: () => void
}

interface Filter {
  value: string | null
  matchMode: FilterMatchMode
}
interface Filters {
  [key: string]: Filter
}

export const UserHistoryTableNoMatch = ({ data, onAddClick }: Props) => {
  const [filters, setFilters] = useState<Filters>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    editor: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    user: { value: null, matchMode: FilterMatchMode.IN },
  })

  const [globalFilterValue, setGlobalFilterValue] = useState('')

  const onGlobalFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    let _filters = { ...filters }
    _filters['global'].value = value
    setFilters(_filters)
    setGlobalFilterValue(value)
  }

  return (
    <DataTable
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
        field="editor"
        header="Editor"
        style={{ width: '25%' }}
        filter
        sortable
      />
      <Column
        field="type"
        header="Tipo"
        filter
        sortable
        style={{ width: '25%' }}
      />
      <Column field="date" header="Date" sortable style={{ width: '25%' }} />
      <Column
        field="user"
        header="Usuario"
        filter
        sortable
        style={{ width: '25%' }}
      />
      <Column
        field="profile"
        header="Perfil"
        filter
        sortable
        style={{ width: '25%' }}
      />
      <Column field="team" header="Equipo" sortable style={{ width: '25%' }} />
      <Column
        field="serviceCenter"
        header="Centro de Servicio"
        sortable
        style={{ width: '25%' }}
      />
      <Column
        field="management"
        header="Gerencia"
        sortable
        style={{ width: '25%' }}
      />
      <Column field="blocked" header="Bloqueado" style={{ width: '25%' }} />
    </DataTable>
  )
}
