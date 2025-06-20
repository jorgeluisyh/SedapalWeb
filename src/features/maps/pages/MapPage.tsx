import { useState } from 'react'
import { Card } from 'primereact/card'
import type { MapType } from '../types/mapType'
import { MapTable } from '../components/MapTable'
import { NewMapForm } from '../components/NewMapForm'
// import { NewWmsServiceForm } from '../components/NewTeamForm'

export const MapPage = () => {
  //   const [wmsServices, setWmsServices] = useState<TeamType[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  //   const [statuses] = useState(['Cacheado', 'Dinámico', 'MXD'])

  const handleCreateProduct = async (arcGisService: MapType) => {
    //create tu metodo para guardar usuario con un api bicho
    console.log(arcGisService.mapName)
  }

  const data = [
    {
      id: 1,
      mapName: 'EA-C',
      descripcion: 'Servicio WMS SIGCAP',
    },
    {
      id: 2,
      mapName: 'EA-N',
      descripcion: 'Servicio WMS GEOSERVIDOR',
    },
  ]

  //   useEffect(() => {
  //     const fetchWmsServices = async () => {
  //       const wmsServices = await getWmsServices()
  //       setWmsServices(wmsServices)
  //     }
  //     fetchWmsServices()
  //   })

  return (
    <>
      <Card title="Mapas">
        <MapTable data={data} onAddClick={() => setIsModalOpen(true)} />
      </Card>

      <NewMapForm
        isModalOpen={isModalOpen}
        onIsModalOpen={setIsModalOpen}
        onSubmit={handleCreateProduct}
      />
    </>
  )
}
