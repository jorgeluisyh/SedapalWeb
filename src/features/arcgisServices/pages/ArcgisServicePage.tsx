import { useState } from 'react'
import { Card } from 'primereact/card'
import { NewArcgisServiceForm } from '../components/NewArcgisServiceForm'
import { ArcgisServiceTable } from '../components/ArcgisServiceTable'
import type { ArcGisService } from '../types/arcgisServiceType'
// import { initialData } from '../data/arcgisServiceData'

export const ArcgisServicePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCreateProduct = async (arcGisService: ArcGisService) => {
    console.log(arcGisService.nombre)
  }
  const initialData: ArcGisService[] = [
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

  return (
    <>
      <Card title="Servicios ArcGIS Server y MXDs">
        <ArcgisServiceTable
          data={initialData}
          onAddClick={() => setIsModalOpen(true)}
        />
      </Card>

      <NewArcgisServiceForm
        isModalOpen={isModalOpen}
        onIsModalOpen={setIsModalOpen}
        onSubmit={handleCreateProduct}
      />
    </>
  )
}
