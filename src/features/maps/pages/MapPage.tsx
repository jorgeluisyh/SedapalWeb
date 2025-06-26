import { useEffect, useRef, useState } from 'react'
import { Card } from 'primereact/card'
import type { Map } from '../types/mapType'
import { MapTable } from '../components/MapTable'
import { NewMapForm } from '../components/NewMapForm'
import { deleteMap, getMaps, postMap, updateMap } from '../apis/mapApi'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import { Toast } from 'primereact/toast'
import type { ServiceMap } from '../types/serviceType'
import { getArcgisServices } from '../../arcgisServices/apis/arcgisServiceApi'
import { UpdateMapForm } from '../components/UpdateMapForm'

export const MapPage = () => {
  const toast = useRef<Toast>(null)
  const [refresh, setRefresh] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [maps, setMaps] = useState<Map[]>([])
  const [arcgisServices, setArcgisServices] = useState<ServiceMap[]>([])
  const [selectedService, setselectedService] = useState<Map | null>(null)
  // const handleCreateProduct = async (mapType: MapType) => {
  //   //create tu metodo para guardar usuario con un api bicho
  //   console.log(mapType.nombreMapa)
  // }

  // const [availableItems] = useState<ServiceMap[]>([
  //   {
  //     idServicioMapa: 1,
  //     nombreServicioMapa: 'Mapa Administrador',
  //   },
  //   {
  //     idServicioMapa: 2,
  //     nombreServicioMapa: 'Mapa Usuario',
  //   },
  //   {
  //     idServicioMapa: 3,
  //     nombreServicioMapa: 'Mapa Editor',
  //   },
  //   {
  //     idServicioMapa: 4,
  //     nombreServicioMapa: 'Mapa Analista',
  //   },
  //   {
  //     idServicioMapa: 5,
  //     nombreServicioMapa: 'Mapa Moderador',
  //   },
  //   {
  //     idServicioMapa: 6,
  //     nombreServicioMapa: 'Mapa Visualizador',
  //   },
  // ])

  const handleCloseUpdateForm = () => setselectedService(null)

  const handleCreateMap = async (map: Map) => {
    // crear dialogo para confirmar si se debe enviar usuario

    await confirmDialog({
      message: '¿Estás seguro de que deseas enviar el mapa?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      accept: async () => {
        const response = await postMap(map)
        toast.current?.show({
          severity: 'success',
          summary: 'Confirmación',
          detail: 'Mapa agregado correctamente',
          life: 3000,
        })
        setRefresh(!refresh)
        console.log(response.message)
      },
      reject: () => {
        console.log('No se envió el mapa' + map.nombreMapa)
      },
    })
  }

  const handleUpdateMap = async (map: Map) => {
    await confirmDialog({
      message: `¿Estás seguro de que deseas editar el mapa : ${map.nombreMapa}?`,
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      accept: async () => {
        const response = await updateMap(map)
        handleCloseUpdateForm()
        toast.current?.show({
          severity: 'success',
          summary: 'Confirmación',
          detail: 'Se editó el mapa ',
          life: 3000,
        })
        console.log(response.message)
        setRefresh(!refresh)
      },
      reject: () => {
        handleCloseUpdateForm()
        console.log('No se editó el mapa' + map.nombreMapa)
      },
    })
  }

  const handleDeleteMaps = async (maps: Map) => {
    console.log('eliminar')
    await confirmDialog({
      message: `¿Estás seguro de que deseas eliminar el mapa: ${maps.nombreMapa}?`,
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      accept: async () => {
        const response = await deleteMap(maps.idMapa)
        console.log(response.message)
        toast.current?.show({
          severity: 'success',
          summary: 'Confirmed',
          detail: 'Se eliminó el mapa',
          life: 3000,
        })
        setRefresh(!refresh)
        console.log('Se eliminó el mapa ' + maps.nombreMapa)
      },
      reject: () => {
        console.log('No se eliminó el mapa ' + maps.nombreMapa)
      },
    })
  }

  useEffect(() => {
    const fetchElements = async () => {
      const maps = await getMaps()
      setMaps(maps)
      const arcgisServices = await getArcgisServices()
      setArcgisServices(arcgisServices)
    }
    fetchElements()
  }, [refresh])

  return (
    <>
      <Card title="Mapas">
        <MapTable
          data={maps}
          onAddClick={() => setIsModalOpen(true)}
          onUpdateClick={(map: Map | null) => {
            setselectedService(map)
            console.log(map)
          }}
          onDeleteClick={(map: Map) => handleDeleteMaps(map)}
        />
      </Card>

      <NewMapForm
        availableItems={arcgisServices}
        isModalOpen={isModalOpen}
        onIsModalOpen={setIsModalOpen}
        onSubmit={handleCreateMap}
      />
      {selectedService && (
        <UpdateMapForm
          availableItems={arcgisServices}
          handleClose={handleCloseUpdateForm}
          onSubmit={handleUpdateMap}
          currentService={selectedService}
        />
      )}
      <ConfirmDialog />
      <Toast ref={toast} />
    </>
  )
}
