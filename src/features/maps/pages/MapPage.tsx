import { useEffect, useRef, useState } from 'react'
import { Card } from 'primereact/card'
import type { MapType } from '../types/mapType'
import { MapTable } from '../components/MapTable'
import { NewMapForm } from '../components/NewMapForm'
import { deleteMaps, getMaps, postMaps, updateMaps } from '../apis/mapApi'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import { Toast } from 'primereact/toast'
import { UpdateMapForm } from '../components/UpdateMapForm'

export const MapPage = () => {
  const toast = useRef<Toast>(null)
  const [refresh, setRefresh] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [maps, setMaps] = useState<MapType[]>([])
  const [selectedService, setselectedService] = useState<MapType | null>(null)
  // const handleCreateProduct = async (mapType: MapType) => {
  //   //create tu metodo para guardar usuario con un api bicho
  //   console.log(mapType.nombreMapa)
  // }

  // const data = [
  //   {
  //     idMapa: 1,
  //     nombreMapa: 'EA-C',
  //     descripcion: 'mapa WMS SIGCAP',
  //   },
  //   {
  //     idMapa: 2,
  //     nombreMapa: 'EA-N',
  //     descripcion: 'mapa WMS GEOSERVIDOR',
  //   },
  // ]

  const handleCloseUpdateForm = () => setselectedService(null)

  const handleCreateMap = async (maps: MapType) => {
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

  const handleUpdateMap = async (maps: MapType) => {
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

  const handleDeleteMaps = async (maps: MapType) => {
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
          onUpdateClick={(maps: MapType | null) => {
            setselectedService(maps)
          }}
          onDeleteClick={(maps: MapType) => handleDeleteMaps(maps)}
        />
      </Card>

      <NewMapForm
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
