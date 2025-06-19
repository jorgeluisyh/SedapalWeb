import { useEffect, useRef, useState } from 'react'
import { Card } from 'primereact/card'
import { NewArcgisServiceForm } from '../components/NewArcgisServiceForm'
import { UpdateArcgisServiceForm } from '../components/UpdateArcgisServiceForm'
import { ArcgisServiceTable } from '../components/ArcgisServiceTable'
import type { ArcGisService } from '../types/arcgisServiceType'
import {
  deleteArcgisService,
  getArcgisServices,
  postArcgisService,
  updateArcgisService,
} from '../apis/arcgisServiceApi'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import { Toast } from 'primereact/toast'

export const ArcgisServicePage = () => {
  const toast = useRef<Toast>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [arcgisServices, setArcgisServices] = useState<ArcGisService[]>([])
  const [selectedService, setselectedService] = useState<ArcGisService | null>(
    null
  )
  const handleCloseUpdateForm = () => setselectedService(null)

  const handleCreateService = async (arcGisService: ArcGisService) => {
    // crear dialogo para confirmar si se debe enviar usuario

    await confirmDialog({
      message: '¿Estás seguro de que deseas enviar el servicio?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        const response = await postArcgisService(arcGisService)
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
        console.log(
          'No se envió el servicio' + arcGisService.nombreServicioMapa
        )
      },
    })
  }

  const handleUpdateService = async (arcGisService: ArcGisService) => {
    await confirmDialog({
      message: `¿Estás seguro de que deseas editar el servicio : ${arcGisService.nombreServicioMapa}?`,
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        const response = await updateArcgisService(
          arcGisService.idServicioMapa,
          arcGisService
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
        console.log(
          'No se editó el servicio' + arcGisService.nombreServicioMapa
        )
      },
    })
  }

  const handleDeleteService = async (arcGisService: ArcGisService) => {
    console.log('eliminar')
    await confirmDialog({
      message: `¿Estás seguro de que deseas eliminar el servicio: ${arcGisService.nombreServicioMapa}?`,
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        const response = await deleteArcgisService(arcGisService.idServicioMapa)
        console.log(response.message)
        toast.current?.show({
          severity: 'success',
          summary: 'Confirmed',
          detail: 'Se eliminó el servicio',
          life: 3000,
        })
        setRefresh(!refresh)
        console.log(
          'Se eliminó el servicio ' + arcGisService.nombreServicioMapa
        )
      },
      reject: () => {
        console.log(
          'No se eliminó el servicio ' + arcGisService.nombreServicioMapa
        )
      },
    })
  }

  const initialData: ArcGisService[] = [
    {
      idServicioMapa: 1,
      nombreServicioMapa: 'SGIO',
      urlServicioMapa:
        'http://gisprdsgp.sedapal.com.pe/arcgis/rest/services/SGIO/MapServer',
      cacheado: 1,
      descripcion: 'Servicio de SGIO',
    },
    {
      idServicioMapa: 2,
      nombreServicioMapa: 'Análisis Redesmd',
      urlServicioMapa:
        '\\\\srvsigfs300.sedapal.com.pe\\Giscorporativo\\Desktop\\Recursos\\Produccion\\MXD\\Analisis Redes.mxd',
      cacheado: 2,
      descripcion: 'Análisis Redes',
    },
    {
      idServicioMapa: 3,
      nombreServicioMapa: 'ANFmd',
      urlServicioMapa:
        '\\\\srvsigfs300.sedapal.com.pe\\Giscorporativo\\Desktop\\Recursos\\Produccion\\MXD\\Evaluacion Sectores.mxd',
      cacheado: 3,
      descripcion: 'Mapa del Agua No Facturada',
    },
    {
      idServicioMapa: 4,
      nombreServicioMapa: 'Catastro Comercial',
      urlServicioMapa:
        'http://gisprdsgp.sedapal.com.pe/arcgis/rest/services/CatastroComercial/MapServer',
      cacheado: 2,
      descripcion: 'Servicio de Catastro Comercial',
    },
    {
      idServicioMapa: 5,
      nombreServicioMapa: 'AguaPotable',
      urlServicioMapa:
        'http://gisprdsgp.sedapal.com.pe/arcgis/rest/services/AguaPotable/MapServer',
      cacheado: 2,
      descripcion: 'Servicio de Agua Potable',
    },
    {
      idServicioMapa: 6,
      nombreServicioMapa: 'Satélite ESRI',
      urlServicioMapa:
        'http://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer',
      cacheado: 1,
      descripcion: 'Servicio de Imágenes de Satélite',
    },
    {
      idServicioMapa: 7,
      nombreServicioMapa: 'Alcantarillado',
      urlServicioMapa:
        'http://gisprdsgp.sedapal.com.pe/arcgis/rest/services/Alcantarillado/MapServer',
      cacheado: 2,
      descripcion: 'Servicio de Alcantarillado',
    },
  ]

  useEffect(() => {
    const fetchArcgisServices = async () => {
      const arcgisServices = await getArcgisServices()
      setArcgisServices(arcgisServices)
    }
    fetchArcgisServices()
  }, [refresh])

  return (
    <>
      <Card title="Servicios ArcGIS Server y MXDs">
        <ArcgisServiceTable
          data={arcgisServices}
          onAddClick={() => {
            setIsModalOpen(true)
          }}
          onUpdateClick={(arcgisService: ArcGisService | null) => {
            setselectedService(arcgisService)
          }}
          onDeleteClick={(arcgisService: ArcGisService) =>
            handleDeleteService(arcgisService)
          }
        />
      </Card>

      <NewArcgisServiceForm
        isModalOpen={isModalOpen}
        onIsModalOpen={setIsModalOpen}
        onSubmit={handleCreateService}
      />
      {selectedService && (
        <UpdateArcgisServiceForm
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
