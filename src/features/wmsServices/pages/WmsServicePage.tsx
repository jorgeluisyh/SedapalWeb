import { useEffect, useRef, useState } from 'react'
import { Card } from 'primereact/card'
import type { WmsService } from '../types/wmsServiceType'
import { WmsServiceTable } from '../components/WmsServiceTable'
import { NewWmsServiceForm } from '../components/NewWmsServiceForm'
import {
  deleteWmsService,
  getWmsServices,
  postWmsService,
  updateWmsService,
} from '../apis/wmsServiceApi'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import { Toast } from 'primereact/toast'
import { UpdateWmsServiceForm } from '../components/UpdateWmsServiceForm'

export const WmsServicePage = () => {
  const toast = useRef<Toast>(null)
  const [refresh, setRefresh] = useState(false)
  const [wmsServices, setWmsServices] = useState<WmsService[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedService, setselectedService] = useState<WmsService | null>(
    null
  )
  const handleCloseUpdateForm = () => setselectedService(null)

  const handleCreateService = async (wmsService: WmsService) => {
    confirmDialog({
      message: '¿Estás seguro de que deseas enviar el servicio?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        const response = await postWmsService(wmsService)
        toast.current?.show({
          severity: 'success',
          summary: 'Confirmación',
          detail: 'Servicio agregado correctamente',
          life: 3000,
        })
        setRefresh(!refresh)
        console.log(response.message)
      },
      reject: () => {
        console.log('No se envió el servicio' + wmsService.nombreServicioWMS)
      },
    })
  }

  const handleUpdateService = async (wmsService: WmsService) => {
    confirmDialog({
      message: `¿Estás seguro de que deseas editar el servicio : ${wmsService.nombreServicioWMS}?`,
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        const response = await updateWmsService(
          wmsService.idServicioWMS,
          wmsService
        )
        handleCloseUpdateForm()
        toast.current?.show({
          severity: 'info',
          summary: 'Cancel',
          detail: 'Se canceló la operación',
          life: 3000,
        })
        console.log(response.message)
        setRefresh(!refresh)
      },
      reject: () => {
        handleCloseUpdateForm()
        console.log('No se editó el servicio' + wmsService.nombreServicioWMS)
      },
    })
  }

  const handleDeleteService = async (wmsService: WmsService) => {
    console.log('eliminar')
    confirmDialog({
      message: `¿Estás seguro de que deseas eliminar el servicio: ${wmsService.nombreServicioWMS}?`,
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        const response = await deleteWmsService(wmsService.idServicioWMS)
        console.log(response.message)
        toast.current?.show({
          severity: 'success',
          summary: 'Confirmed',
          detail: 'Se eliminó el servicio',
          life: 3000,
        })
        setRefresh(!refresh)
        console.log('Se eliminó el servicio ' + wmsService.nombreServicioWMS)
      },
      reject: () => {
        console.log('No se eliminó el servicio ' + wmsService.nombreServicioWMS)
      },
    })
  }

  // const data = [
  //   {
  //     id: 1,
  //     nombre: 'SIGCAP',
  //     url: 'http://sigcap.no-ip.org:8082/geoserver/wms',
  //     descripcion: 'Servicio WMS SIGCAP',
  //   },
  //   {
  //     id: 2,
  //     nombre: 'GEOSERVIDOR',
  //     url: 'http://websig.senamhi.gob.pe/wms/?wms=WMS_CLASIFICACION_CLIMATICA',
  //     descripcion: 'Servicio WMS GEOSERVIDOR',
  //   },
  // ]

  useEffect(() => {
    const fetchWmsServices = async () => {
      const wmsServices = await getWmsServices()
      setWmsServices(wmsServices)
    }
    fetchWmsServices()
  })

  return (
    <>
      <Card title="Servicios WMS">
        <WmsServiceTable
          data={wmsServices}
          onAddClick={() => {
            setIsModalOpen(true)
          }}
          onUpdateClick={(wmsService: WmsService | null) => {
            setselectedService(wmsService)
          }}
          onDeleteClick={(wmsService: WmsService) =>
            handleDeleteService(wmsService)
          }
        />
      </Card>

      <NewWmsServiceForm
        isModalOpen={isModalOpen}
        onIsModalOpen={setIsModalOpen}
        onSubmit={handleCreateService}
      />
      {selectedService && (
        <UpdateWmsServiceForm
          handleClose={handleCloseUpdateForm}
          onSubmit={handleUpdateService}
          currentService={selectedService}
        />
      )}
      <ConfirmDialog />
      <Toast ref={toast} />
    </>
  )
}
