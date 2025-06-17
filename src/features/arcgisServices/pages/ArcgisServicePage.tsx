import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { IconField } from 'primereact/iconfield'
import { InputIcon } from 'primereact/inputicon'
import { InputText } from 'primereact/inputtext'
import { useState, type ChangeEvent } from 'react'
import { Card } from 'primereact/card'
// import { NewUserForm } from '../components/NewUserForm'
import type { ArcGisService } from '../types/arcgisServiceType'
import { FilterMatchMode } from 'primereact/api'
import { Tag } from 'primereact/tag'
import { NewArcgisServiceForm } from '../components/NewArcgisServiceForm'

interface Filter {
  value: string | null
  matchMode: FilterMatchMode
}

interface Filters {
  [key: string]: Filter
}

export const ArcgisServicePage = () => {
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

  const getSeverity = (status: string) => {
    switch (status) {
      case 'Cacheado':
        return 'info'

      case 'Dinámico':
        return null

      case 'MXD':
        return 'success'
    }
  }
  const statusBodyTemplate = (rowData: ArcGisService) => {
    const severity = getSeverity(rowData.cacheado)

    return (
      <Tag
        value={rowData.cacheado}
        severity={severity}
        style={
          severity === null
            ? {
                backgroundColor: 'gray',
              }
            : {}
        }
      />
    )
  }

  const handleCreateProduct = async (arcGisService: ArcGisService) => {
    //create tu metodo para guardar usuario con un api bicho
    console.log(arcGisService.nombre)
  }

  const data = [
    {
      id: 1,
      nombre: 'SGIO',
      url: 'http://gisprdsgp.sedapal.com.pe/arcgis/rest/services/SGIO/MapServer',
      cacheado: 'Dinámico',
      descripcion: 'Servicio de SGIO',
    },
    {
      id: 2,
      nombre: 'Análisis Redesmd',
      url: '\\\\srvsigfs300.sedapal.com.pe\\Giscorporativo\\Desktop\\Recursos\\Produccion\\MXD\\Analisis Redes.mxd',
      cacheado: 'MXD',
      descripcion: 'Análisis Redes',
    },
    {
      id: 3,
      nombre: 'ANFmd',
      url: '\\\\srvsigfs300.sedapal.com.pe\\Giscorporativo\\Desktop\\Recursos\\Produccion\\MXD\\Evaluacion Sectores.mxd',
      cacheado: 'MXD',
      descripcion: 'Mapa del Agua No Facturada',
    },
    {
      id: 4,
      nombre: 'Catastro Comercial',
      url: 'http://gisprdsgp.sedapal.com.pe/arcgis/rest/services/CatastroComercial/MapServer',
      cacheado: 'Dinámico',
      descripcion: 'Servicio de Catastro Comercial',
    },
    {
      id: 5,
      nombre: 'AguaPotable',
      url: 'http://gisprdsgp.sedapal.com.pe/arcgis/rest/services/AguaPotable/MapServer',
      cacheado: 'Dinámico',
      descripcion: 'Servicio de Agua Potable',
    },
    {
      id: 6,
      nombre: 'Satélite ESRI',
      url: 'http://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer',
      cacheado: 'Cacheado',
      descripcion: 'Servicio de Imágenes de Satélite',
    },
    {
      id: 7,
      nombre: 'Alcantarillado',
      url: 'http://gisprdsgp.sedapal.com.pe/arcgis/rest/services/Alcantarillado/MapServer',
      cacheado: 'Dinámico',
      descripcion: 'Servicio de Alcantarillado',
    },
    {
      id: 8,
      nombre: 'Curvas de Nivel',
      url: 'http://gisprdsgp.sedapal.com.pe/arcgis/rest/services/CurvasdeNivel/MapServer',
      cacheado: 'Dinámico',
      descripcion: 'Servicio de Curvas de Nivel',
    },
    {
      id: 9,
      nombre: 'Red Vial',
      url: 'http://gisprdsgp.sedapal.com.pe/arcgis/rest/services/RedVial/MapServer',
      cacheado: 'Dinámico',
      descripcion: 'Servicio de Red Vial',
    },
    {
      id: 10,
      nombre: 'Mapa Base',
      url: 'http://gisprdsgp.sedapal.com.pe/arcgis/rest/services/MapaBase/MapServer',
      cacheado: 'Dinámico',
      descripcion: 'Servicio de Mapa Base',
    },
    {
      id: 11,
      nombre: 'TIN',
      url: 'http://gisprdsgp.sedapal.com.pe/arcgis/rest/services/TIN/MapServer',
      cacheado: 'Cacheado',
      descripcion: 'Servicio de Modelo Digital del Terreno Vectorial',
    },
    {
      id: 12,
      nombre: 'Consulta Redesmd',
      url: '\\\\srvsigfs300.sedapal.com.pe\\Giscorporativo\\Desktop\\Recursos\\Produccion\\MXD\\Consulta Redes.mxd',
      cacheado: 'MXD',
      descripcion: 'Consulta Redes',
    },
    {
      id: 13,
      nombre: 'Gestión Comercialmd',
      url: '\\\\srvsigfs300.sedapal.com.pe\\Giscorporativo\\Desktop\\Recursos\\Produccion\\MXD\\Gestion Comercial.mxd',
      cacheado: 'MXD',
      descripcion: 'Gestion Comercial',
    },
    {
      id: 14,
      nombre: 'Supervisor Edicion ArcSDE...',
      url: '\\\\srvsigfs300.sedapal.com.pe\\Giscorporativo\\Desktop\\Recursos\\Produccion\\MXD\\SupervisorEdicionArcSDE.mxd',
      cacheado: 'MXD',
      descripcion: 'Supervisor Edicion ArcSDE',
    },
    {
      id: 15,
      nombre: 'Tematicos Comercialmd',
      url: '\\\\srvsigfs300.sedapal.com.pe\\Giscorporativo\\Desktop\\Recursos\\Produccion\\MXD\\Tematicos Comercial.mxd',
      cacheado: 'MXD',
      descripcion: 'Temáticos Comercial',
    },
    {
      id: 16,
      nombre: 'Tematicos Comercial y ESCE',
      url: '\\\\srvsigfs300.sedapal.com.pe\\Giscorporativo\\Desktop\\Recursos\\Produccion\\MXD\\TematicosComercialyESCE.mxd',
      cacheado: 'MXD',
      descripcion: 'Temáticos Comercial y ESCE',
    },
    {
      id: 17,
      nombre: 'Balance hidráulico',
      url: 'http://gisprdsgp.sedapal.com.pe/arcgis/rest/services/ANF/MapServer',
      cacheado: 'Dinámico',
      descripcion: 'Mapa de balance hidráulico (ANF)',
    },
    {
      id: 18,
      nombre: 'Demanda',
      url: 'http://gisprdsgp.sedapal.com.pe/arcgis/rest/services/Demanda/MapServer',
      cacheado: 'Dinámico',
      descripcion: 'Prospección de demanda',
    },
    {
      id: 19,
      nombre: 'Nucleo Geográfico',
      url: '\\\\srvsigfs300.sedapal.com.pe\\Giscorporativo\\Desktop\\Recursos\\Produccion\\MXD\\NucleoGrafico.mxd',
      cacheado: 'MXD',
      descripcion: 'Descripción núcleo Geográfico',
    },
  ]

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
          label="Agregar Servicios y MXDs"
        />
      </div>
    )
  }

  return (
    <>
      <Card title="Servicios ArcGIS Server y MXDs">
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
            sortable
            field="nombre"
            header="Nombre"
            style={{ width: '25%' }}
          ></Column>
          <Column
            sortable
            field="url"
            header="URL"
            style={{ width: '25%' }}
          ></Column>
          <Column
            sortable
            field="cacheado"
            header="Cacheado"
            body={statusBodyTemplate}
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

      <NewArcgisServiceForm
        isModalOpen={isModalOpen}
        onIsModalOpen={setIsModalOpen}
        onSubmit={handleCreateProduct}
      />
    </>
  )
}
