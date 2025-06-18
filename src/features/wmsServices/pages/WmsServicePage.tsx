import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { IconField } from 'primereact/iconfield'
import { InputIcon } from 'primereact/inputicon'
import { InputText } from 'primereact/inputtext'
import { useState, type ChangeEvent } from 'react'
import { Card } from 'primereact/card'
import type { WmsService } from '../types/wmsServiceType'
import { FilterMatchMode } from 'primereact/api'
// import { Tag } from 'primereact/tag'
import { NewWmsServiceForm } from '../components/NewWmsServiceForm'

interface Filter {
  value: string | null
  matchMode: FilterMatchMode
}

interface Filters {
  [key: string]: Filter
}

export const WmsServicePage = () => {
  const [filters, setFilters] = useState<Filters>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nombre: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    url: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    cacheado: { value: null, matchMode: FilterMatchMode.IN },
    descripcion: { value: null, matchMode: FilterMatchMode.IN },
  })
  const [globalFilterValue, setGlobalFilterValue] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  //   const [statuses] = useState(['Cacheado', 'Dinámico', 'MXD'])

  const onGlobalFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    let _filters = { ...filters }

    _filters['global'].value = value

    setFilters(_filters)
    setGlobalFilterValue(value)
  }
  const renderHeader = () => {
    return (
      <div className="flex justify-content-between">
        <IconField iconPosition="left">
          <InputIcon className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            // onChange={(e) => setGlobalFilterValue(e.target.value)}
            onChange={onGlobalFilterChange}
            placeholder="Palabra clave"
          />
        </IconField>
        <Button
          onClick={() => setIsModalOpen(true)}
          type="button"
          icon="pi pi-plus"
          label="Agregar Servicios"
        />
      </div>
    )
  }

  const handleCreateProduct = async (arcGisService: WmsService) => {
    //create tu metodo para guardar usuario con un api bicho
    console.log(arcGisService.nombre)
  }

  const data = [
    {
      id: 1,
      nombre: 'SIGCAP',
      url: 'http://sigcap.no-ip.org:8082/geoserver/wms',
      descripcion: 'Servicio WMS SIGCAP',
    },
    {
      id: 2,
      nombre: 'GEOSERVIDOR',
      url: 'http://websig.senamhi.gob.pe/wms/?wms=WMS_CLASIFICACION_CLIMATICA',
      descripcion: 'Servicio WMS GEOSERVIDOR',
    },
  ]

  return (
    <>
      <Card title="Servicios WMS">
        <DataTable
          header={renderHeader()}
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
            sortable
            field="nombre"
            header="Nombre"
            style={{ width: '10%' }}
          ></Column>
          <Column
            sortable
            field="url"
            header="URL"
            style={{ width: '25%' }}
          ></Column>
          <Column
            sortable
            field="descripcion"
            header="Descripción"
            style={{ width: '25%' }}
          ></Column>
        </DataTable>
      </Card>

      <NewWmsServiceForm
        isModalOpen={isModalOpen}
        onIsModalOpen={setIsModalOpen}
        onSubmit={handleCreateProduct}
      />
    </>
  )
}
