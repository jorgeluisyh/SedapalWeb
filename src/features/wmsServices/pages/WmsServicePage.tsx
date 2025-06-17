import { useState } from 'react'
import { Card } from 'primereact/card'
import type { WmsService } from '../types/wmsServiceType'
import { WmsServiceTable } from '../components/WmsServiceTable'
import { NewWmsServiceForm } from '../components/NewWmsServiceForm'

export const WmsServicePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  //   const [statuses] = useState(['Cacheado', 'Dinámico', 'MXD'])

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
        <WmsServiceTable data={data} onAddClick={() => setIsModalOpen(true)} />
      </Card>

      <NewWmsServiceForm
        isModalOpen={isModalOpen}
        onIsModalOpen={setIsModalOpen}
        onSubmit={handleCreateProduct}
      />
    </>
  )
}
