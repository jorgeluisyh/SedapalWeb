import { useEffect, useRef, useState } from 'react'
import { Card } from 'primereact/card'
import type { Map } from '../types/mapType'
import { MapTable } from '../components/MapTable'
import { NewMapForm } from '../components/NewMapForm'
import { deleteMaps, getMaps, postMaps, updateMaps } from '../apis/mapApi'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import { Toast } from 'primereact/toast'
import { UpdateMapForm } from '../components/UpdateMapForm'
import type { ServiceMap } from '../types/serviceType'

export const MapPage = () => {
  const toast = useRef<Toast>(null)
  const [refresh, setRefresh] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [maps, setMaps] = useState<Map[]>([])
  const [selectedService, setselectedService] = useState<Map | null>(null)
  // const handleCreateProduct = async (mapType: MapType) => {
  //   //create tu metodo para guardar usuario con un api bicho
  //   console.log(mapType.nombreMapa)
  // }

  const [availableItems] = useState<ServiceMap[]>([
    {
      idServicioMapa: 1,
      nombreServicioMapa: 'Mapa Administrador',
    },
    {
      idServicioMapa: 2,
      nombreServicioMapa: 'Mapa Usuario',
    },
    {
      idServicioMapa: 3,
      nombreServicioMapa: 'Mapa Editor',
    },
    {
      idServicioMapa: 4,
      nombreServicioMapa: 'Mapa Analista',
    },
    {
      idServicioMapa: 5,
      nombreServicioMapa: 'Mapa Moderador',
    },
    {
      idServicioMapa: 6,
      nombreServicioMapa: 'Mapa Visualizador',
    },
  ])

  const handleCloseUpdateForm = () => setselectedService(null)

  const handleCreateMap = async (maps: Map) => {
    // crear dialogo para confirmar si se debe enviar usuario

    await confirmDialog({
      message: '¿Estás seguro de que deseas enviar el mapa?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      accept: async () => {
        const response = await postMaps(maps)
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
        console.log('No se envió el mapa' + maps.nombreMapa)
      },
    })
  }

  const handleUpdateMap = async (maps: Map) => {
    await confirmDialog({
      message: `¿Estás seguro de que deseas editar el mapa : ${maps.nombreMapa}?`,
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      accept: async () => {
        const response = await updateMaps(maps.idMapa, maps)
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
        console.log('No se editó el mapa' + maps.nombreMapa)
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
        const response = await deleteMaps(maps.idMapa)
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
    const fetchMaps = async () => {
      const maps = await getMaps()
      setMaps(maps)
    }
    fetchMaps()
  })

  return (
    <>
      <Card title="Mapas">
        <MapTable
          data={maps}
          onAddClick={() => setIsModalOpen(true)}
          onUpdateClick={(maps: Map | null) => {
            setselectedService(maps)
          }}
          onDeleteClick={(maps: Map) => handleDeleteMaps(maps)}
        />
      </Card>

      <NewMapForm
        availableItems={availableItems}
        isModalOpen={isModalOpen}
        onIsModalOpen={setIsModalOpen}
        onSubmit={handleCreateMap}
      />
      {selectedService && (
        <UpdateMapForm
          handleClose={handleCloseUpdateForm}
          onSubmit={handleUpdateMap}
          currentService={selectedService}
          isModalOpen={false}
        />
      )}
      <ConfirmDialog />
      <Toast ref={toast} />
    </>
  )
}
