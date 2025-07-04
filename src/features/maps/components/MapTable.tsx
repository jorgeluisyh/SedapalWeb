import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { FilterMatchMode } from 'primereact/api'
import { useState, type ChangeEvent } from 'react'
import { MapTableHeader } from './MapTableHeader'
import type { Map } from '../types/mapType'
import { Button } from 'primereact/button'

interface MapTableProps {
  data: Map[]
  onAddClick: () => void
  onUpdateClick: (mapType: Map | null) => void
  onDeleteClick: (mapType: Map) => void
}

interface Filter {
  value: string | null
  matchMode: FilterMatchMode
}
interface Filters {
  [key: string]: Filter
}

export const MapTable = ({
  data,
  onAddClick,
  onUpdateClick,
  onDeleteClick,
}: MapTableProps) => {
  const [filters, setFilters] = useState<Filters>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nombre: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    descripcion: { value: null, matchMode: FilterMatchMode.IN },
  })

  const [globalFilterValue, setGlobalFilterValue] = useState('')

  const actionBodyTemplate = (row: Map) => {
    return (
      <div className="flex justify-content-center ">
        <Button
          icon="pi pi-pencil"
          // onClick={() => console.log(row)} // Llamamos a la función de edición pasando el servicio
          onClick={() => onUpdateClick(row)}
          severity="info"
          text
          size="small"
        />
        <Button
          icon="pi pi-trash"
          // onClick={() => console.log(row)}
          onClick={() => onDeleteClick(row)} // Llamamos a la función de eliminación pasando el ID
          severity="danger"
          text
          size="small"
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
        <MapTableHeader
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
      <Column field="nombreMapa" header="Nombre Mapa" sortable />
      <Column
        field="descripcion"
        header="Descripción"
        sortable
        style={{ width: '35%' }}
      />

      <Column
        body={actionBodyTemplate}
        header="Acciones"
        style={{ width: '15%' }}
      />
    </DataTable>
  )
}
