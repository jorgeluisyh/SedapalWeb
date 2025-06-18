import { useEffect, useState } from 'react'
import { Card } from 'primereact/card'
import { NewArcgisServiceForm } from '../components/NewArcgisServiceForm'
import { ArcgisServiceTable } from '../components/ArcgisServiceTable'
import type { ArcGisService } from '../types/arcgisServiceType'
import { getArcgisServices } from '../apis/arcgisServiceApi'
// import { initialData } from '../data/arcgisServiceData'

export const ArcgisServicePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [arcgisServices, setArcgisServices] = useState<ArcGisService[]>([])

  const handleCreateProduct = async (arcGisService: ArcGisService) => {
    console.log(arcGisService.nombreServicioMapa)
  }
  const initialData: ArcGisService[] = [
    {
      idServicioMapa: 1,
      nombreServicioMapa: 'SGIO',
      urlServicioMapa:
        'http://gisprdsgp.sedapal.com.pe/arcgis/rest/services/SGIO/MapServer',
      cacheado: 'Dinámico',
      descripcion: 'Servicio de SGIO',
    },
    {
      idServicioMapa: 2,
      nombreServicioMapa: 'Análisis Redesmd',
      urlServicioMapa:
        '\\\\srvsigfs300.sedapal.com.pe\\Giscorporativo\\Desktop\\Recursos\\Produccion\\MXD\\Analisis Redes.mxd',
      cacheado: 'MXD',
      descripcion: 'Análisis Redes',
    },
    {
      idServicioMapa: 3,
      nombreServicioMapa: 'ANFmd',
      urlServicioMapa:
        '\\\\srvsigfs300.sedapal.com.pe\\Giscorporativo\\Desktop\\Recursos\\Produccion\\MXD\\Evaluacion Sectores.mxd',
      cacheado: 'MXD',
      descripcion: 'Mapa del Agua No Facturada',
    },
    {
      idServicioMapa: 4,
      nombreServicioMapa: 'Catastro Comercial',
      urlServicioMapa:
        'http://gisprdsgp.sedapal.com.pe/arcgis/rest/services/CatastroComercial/MapServer',
      cacheado: 'Dinámico',
      descripcion: 'Servicio de Catastro Comercial',
    },
    {
      idServicioMapa: 5,
      nombreServicioMapa: 'AguaPotable',
      urlServicioMapa:
        'http://gisprdsgp.sedapal.com.pe/arcgis/rest/services/AguaPotable/MapServer',
      cacheado: 'Dinámico',
      descripcion: 'Servicio de Agua Potable',
    },
    {
      idServicioMapa: 6,
      nombreServicioMapa: 'Satélite ESRI',
      urlServicioMapa:
        'http://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer',
      cacheado: 'Cacheado',
      descripcion: 'Servicio de Imágenes de Satélite',
    },
    {
      idServicioMapa: 7,
      nombreServicioMapa: 'Alcantarillado',
      urlServicioMapa:
        'http://gisprdsgp.sedapal.com.pe/arcgis/rest/services/Alcantarillado/MapServer',
      cacheado: 'Dinámico',
      descripcion: 'Servicio de Alcantarillado',
    },
  ]

  useEffect(() => {
    const fetchArcgisServices = async () => {
      const arcgisServices = await getArcgisServices()
      setArcgisServices(arcgisServices)
    }
    fetchArcgisServices()
  })

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
