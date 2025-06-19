import { useState } from 'react'
import { Card } from 'primereact/card'
import type { TeamType } from '../types/teamType'
import { TeamTable } from '../components/TeamTable'
import { NewTeamForm } from '../components/NewTeamForm'
// import { NewWmsServiceForm } from '../components/NewTeamForm'

export const TeamPage = () => {
  //   const [wmsServices, setWmsServices] = useState<TeamType[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  //   const [statuses] = useState(['Cacheado', 'Dinámico', 'MXD'])

  const handleCreateProduct = async (arcGisService: TeamType) => {
    //create tu metodo para guardar usuario con un api bicho
    console.log(arcGisService.nombre)
  }

  const data = [
    {
      id: 1,
      nombre: 'EA-C',
      correo: 'http://sigcap.no-ip.org:8082/geoserver/wms',
      descripcion: 'Servicio WMS SIGCAP',
      gerencia: 'Gerencia 1',
      centroServicio: 'Centro Servicio 1',
    },
    {
      id: 2,
      nombre: 'EA-N',
      correo:
        'http://websig.senamhi.gob.pe/wms/?wms=WMS_CLASIFICACION_CLIMATICA',
      descripcion: 'Servicio WMS GEOSERVIDOR',
      gerencia: 'Gerencia 2',
      centroServicio: 'Centro Servicio 2',
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
      <Card title="Equipos">
        <TeamTable data={data} onAddClick={() => setIsModalOpen(true)} />
      </Card>

      <NewTeamForm
        isModalOpen={isModalOpen}
        onIsModalOpen={setIsModalOpen}
        onSubmit={handleCreateProduct}
      />
    </>
  )
}
