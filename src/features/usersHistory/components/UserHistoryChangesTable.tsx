import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { FilterMatchMode } from 'primereact/api'
import { useState, type ChangeEvent } from 'react'
import { UserHistoryTableHeader } from './UserHistoryTableHeader'
import type { RecordsUserHistoryType } from '../types/recordsUserHistoryType'

interface UserHistoryChangesTableProps {
  data: RecordsUserHistoryType[]
  onAddClick: () => void
}

interface Filter {
  value: string | null
  matchMode: FilterMatchMode
}
interface Filters {
  [key: string]: Filter
}

export const UserHistoryChangesTable = ({
  data,
  onAddClick,
}: UserHistoryChangesTableProps) => {
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
      rows={5}
      rowsPerPageOptions={[5, 10, 25, 50]}
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
        field="editor"
        header="Editor"
        style={{ width: '25%' }}
        sortable
      />
      <Column field="tipo" header="Tipo" sortable style={{ width: '25%' }} />
      <Column
        field="fechaGuardado"
        header="Fecha"
        sortable
        style={{ width: '25%' }}
      />
      <Column
        field="usuarioNombre"
        header="Usuario"
        sortable
        style={{ width: '25%' }}
      />
      <Column
        field="perfil"
        header="Perfil"
        // sortable
        // style={{ width: '25%' }}
        body={(rowData) => (
          <div
            style={{
              maxHeight: '170px', // Limitar la altura de la celda
              overflowY: 'auto', // Agregar scroll vertical si el texto excede el maxHeight
              textOverflow: 'ellipsis', // Cortar el texto que exceda la celda (opcional)
              whiteSpace: 'normal', // Permite el salto de línea
              width: '300px',
              overflowWrap: 'break-word', // Permite el salto de línea
              wordWrap: 'break-word', // Para que el texto largo se ajuste dentro del contenedor
            }}
          >
            {rowData.perfil || 'No disponible'}
          </div>
        )}
      />
      <Column
        field="equipo"
        header="Equipo"
        sortable
        style={{ width: '25%' }}
      />
      <Column
        field="centroServicio"
        header="Centro de Servicio"
        sortable
        style={{ width: '25%' }}
      />
      <Column
        field="gerencia"
        header="Gerencia"
        sortable
        style={{ width: '25%' }}
      />
      <Column field="bloqueado" header="Bloqueado" style={{ width: '25%' }} />
    </DataTable>
  )
}
