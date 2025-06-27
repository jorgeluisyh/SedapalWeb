import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { FilterMatchMode } from 'primereact/api'
import { useState, type ChangeEvent } from 'react'
import { TeamTableHeader } from './TeamTableHeader'
import type { CenterServiceType, TeamType } from '../types/teamType'
import { Button } from 'primereact/button'
import { useForm } from 'react-hook-form'
import { InputSwitch } from 'primereact/inputswitch'
import type { UpdateTeamType } from '../types/updateTeamType'

interface Props {
  data: TeamType[]
  onAddClick: () => void
  onUpdateClick: (team: TeamType | null) => void
  onDeleteClick: (team: TeamType) => void
  onSwichtClick: (team: TeamType) => void
}

interface Filter {
  value: string | null
  matchMode: FilterMatchMode
}
interface Filters {
  [key: string]: Filter
}

export const TeamTable = ({
  data,
  onAddClick,
  onUpdateClick,
  onDeleteClick,
  onSwichtClick,
}: Props) => {
  const [filters, setFilters] = useState<Filters>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nombre: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    url: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    cacheado: { value: null, matchMode: FilterMatchMode.IN },
    descripcion: { value: null, matchMode: FilterMatchMode.IN },
  })

  const [globalFilterValue, setGlobalFilterValue] = useState('')

  const actionBodyTemplate = (row: TeamType) => {
    return (
      <div className="flex justify-content-center ">
        <Button
          icon="pi pi-pencil"
          onClick={() => onUpdateClick(row)} // Llamamos a la función de edición pasando el servicio
          // onClick={() => onUpdateClick(row)}
          severity="info"
          text
          size="small"
        />
        <Button
          icon="pi pi-trash"
          onClick={() => onDeleteClick(row)}
          // onClick={() => onDeleteClick(row)} // Llamamos a la función de eliminación pasando el ID
          severity="danger"
          text
          size="small"
        />
      </div>
    )
  }

  const checkedBodyTemplate = (row: TeamType) => {
    return (
      <InputSwitch
        checked={row.bloqueado === 1}
        onChange={(e) => onSwichtClick(row)} // Llamamos a la función de cambio de estado
      />
    )
  }

  const onGlobalFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    let _filters = { ...filters }
    _filters['global'].value = value
    setFilters(_filters)
    setGlobalFilterValue(value)
  }

  const formatCentroServicio = (centroServicio: CenterServiceType) => {
    if (centroServicio && Array.isArray(centroServicio)) {
      return centroServicio.map((item) => item.nombre).join(', ')
    }
    return ''
  }

  return (
    <DataTable
      header={
        <TeamTableHeader
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
        style={{ width: '2%' }}
      />
      <Column
        field="nombre"
        header="Nombre"
        sortable
        style={{ width: '10%' }}
      />
      <Column
        field="correo"
        header="Correo"
        sortable
        style={{ width: '10%' }}
      />

      <Column
        field="descripcion"
        header="Descripción"
        sortable
        style={{ width: '15%' }}
      />
      <Column
        field="gerencia"
        header="Gerencia"
        sortable
        style={{ width: '15%' }}
      />
      <Column
        field="centroServicio"
        header="Centro Servicio"
        body={(rowData) => formatCentroServicio(rowData.centroServicio)}
        style={{ width: '15%' }}
      />
      <Column
        field="bloqueado"
        header="Bloqueado"
        style={{ width: '15%' }}
        body={checkedBodyTemplate}
      />
      <Column
        body={actionBodyTemplate}
        header="Acciones"
        style={{ width: '5%' }}
      />
    </DataTable>
  )
}
