import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { FilterMatchMode } from 'primereact/api'
import { useState, type ChangeEvent } from 'react'
import { ArcgisServiceTableHeader } from './ArcgisServiceTableHeader'
import { ArcgisServiceStatusTag } from './ArcgisServiceStatusTag'
import type { ArcGisService } from '../types/arcgisServiceType'
import { Button } from 'primereact/button'

interface Props {
  data: ArcGisService[]
  onAddClick: () => void
  onUpdateClick: (arcGisService: ArcGisService | null) => void
  onDeleteClick: (arcGisService: ArcGisService) => void
}

interface Filter {
  value: string | null
  matchMode: FilterMatchMode
}

interface Filters {
  [key: string]: Filter
}

export const ArcgisServiceTable = ({
  data,
  onAddClick,
  onUpdateClick,
  onDeleteClick,
}: Props) => {
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

  const actionBodyTemplate = (row: ArcGisService) => {
    return (
      <div className="flex justify-content-center ">
        <Button
          icon="pi pi-pencil"
          onClick={() => onUpdateClick(row)}
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
        header="#"
        body={(_rowData, { rowIndex }) => rowIndex + 1}
        style={{ width: '5%' }}
      />
      <Column field="idServicioMapa" header="ID" style={{ display: 'none' }} />
      <Column
        sortable
        field="nombreServicioMapa"
        header="Nombre"
        style={{ width: '20%' }}
      />
      <Column
        sortable
        field="urlServicioMapa"
        header="URL"
        style={{ width: '20%' }}
      />
      <Column
        sortable
        field="cacheado"
        header="Cacheado"
        body={(row) => <ArcgisServiceStatusTag status={row.cacheado} />}
        style={{ width: '20%' }}
      />
      <Column
        sortable
        field="descripcion"
        header="Descripción"
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
