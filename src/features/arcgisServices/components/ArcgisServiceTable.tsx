import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { FilterMatchMode } from 'primereact/api'
import { useState, type ChangeEvent } from 'react'
import { ArcgisServiceTableHeader } from './ArcgisServiceTableHeader'
import { ArcgisServiceStatusTag } from './ArcgisServiceStatusTag'
import type { ArcGisService } from '../types/arcgisServiceType'

interface Props {
  data: ArcGisService[]
  onAddClick: () => void
}

interface Filter {
  value: string | null
  matchMode: FilterMatchMode
}

interface Filters {
  [key: string]: Filter
}

export const ArcgisServiceTable = ({ data, onAddClick }: Props) => {
  const [filters, setFilters] = useState<Filters>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nombre: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    url: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    cacheado: { value: null, matchMode: FilterMatchMode.IN },
    descripcion: { value: null, matchMode: FilterMatchMode.IN },
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
        <ArcgisServiceTableHeader
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
        sortable
        field="nombre"
        header="Nombre"
        style={{ width: '25%' }}
      />
      <Column sortable field="url" header="URL" style={{ width: '25%' }} />
      <Column
        sortable
        field="cacheado"
        header="Cacheado"
        body={(row) => <ArcgisServiceStatusTag status={row.cacheado} />}
        style={{ width: '25%' }}
      />
      <Column
        sortable
        field="descripcion"
        header="Descripción"
        style={{ width: '25%' }}
      />
    </DataTable>
  )
}
