import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { FilterMatchMode } from 'primereact/api'
import { useState, type ChangeEvent } from 'react'
import { WmsServiceTableHeader } from './WmsServiceTableHeader'
import type { WmsService } from '../types/wmsServiceType'
import { Button } from 'primereact/button'

interface WmsServiceTableProps {
  data: WmsService[]
  onAddClick: () => void
  onUpdateClick: (arcGisService: WmsService | null) => void
  onDeleteClick: (arcGisService: WmsService) => void
}

interface Filter {
  value: string | null
  matchMode: FilterMatchMode
}
interface Filters {
  [key: string]: Filter
}

export const WmsServiceTable = ({
  data,
  onAddClick,
  onUpdateClick,
  onDeleteClick,
}: WmsServiceTableProps) => {
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

  const actionBodyTemplate = (row: WmsService) => {
    return (
      <div className="flex justify-content-center ">
        <Button
          icon="pi pi-pencil"
          onClick={() => onUpdateClick(row)} // Llamamos a la función de edición pasando el servicio
          severity="info"
          text
          size="small"
        />
        <Button
          icon="pi pi-trash"
          onClick={() => onDeleteClick(row)}
          severity="danger"
          text
          size="small"
        />
      </div>
    )
  }

  return (
    <DataTable
      showGridlines
      header={
        <WmsServiceTableHeader
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
      <Column field="idServicioWMS" header="ID" style={{ display: 'none' }} />
      <Column
        field="nombreServicioWMS"
        header="Nombre"
        sortable
        style={{ width: '20%' }}
      />
      <Column
        field="urlServicioWMS"
        header="URL"
        sortable
        style={{ width: '35%' }}
      />
      <Column
        field="descripcion"
        header="Descripción"
        sortable
        style={{ width: '20%' }}
      />
      <Column
        body={actionBodyTemplate}
        header="Acciones"
        style={{ width: '15%' }}
      />
    </DataTable>
  )
}
