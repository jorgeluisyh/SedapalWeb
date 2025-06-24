import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { FilterMatchMode } from 'primereact/api'
import { useState, type ChangeEvent } from 'react'
import { ProfileTableHeader } from './ProfileTableHeader'
import type { Profile } from '../types/profileType'
import { Button } from 'primereact/button'

interface Props {
  data: Profile[]
  onAddClick: () => void
  onUpdateClick: (arcGisService: Profile | null) => void
  onDeleteClick: (arcGisService: Profile) => void
}

interface Filter {
  value: string | null
  matchMode: FilterMatchMode
}
interface Filters {
  [key: string]: Filter
}

export const ProfileTable = ({
  data,
  onAddClick,
  onUpdateClick,
  onDeleteClick,
}: Props) => {
  const [filters, setFilters] = useState<Filters>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nombre: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    descripcion: { value: null, matchMode: FilterMatchMode.IN },
  })

  const [globalFilterValue, setGlobalFilterValue] = useState('')

  const actionBodyTemplate = (row: Profile) => {
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
      header={
        <ProfileTableHeader
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
        field="nombrePerfil"
        header="Nombre Perfil"
        style={{ width: '40%' }}
        filter
        sortable
      />
      <Column
        field="descripcion"
        header="Descripción"
        filter
        sortable
        style={{ width: '55%' }}
      />
      <Column
        body={actionBodyTemplate}
        header="Acciones"
        style={{ width: '15%' }}
      />
    </DataTable>
  )
}
