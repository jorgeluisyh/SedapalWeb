import { useEffect, useRef, useState } from 'react'
import { Card } from 'primereact/card'
import type { TeamType } from '../types/teamType'
import { TeamTable } from '../components/TeamTable'
import { NewTeamForm } from '../components/NewTeamForm'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import {
  deleteTeam,
  getTeam,
  postTeam,
  updateTeam,
  getAreas,
  getCenters,
} from '../apis/teamApi'
import { Toast } from 'primereact/toast'
import { UpdateTeamForm } from '../components/UpdateTeamForm'
import type { AreasType } from '../types/areasType'
import type { CentersType } from '../types/centersType'
import type { InsertTeamType } from '../types/insertTeamType'
import type { UpdateTeamType } from '../types/updateTeamType'

export const TeamPage = () => {
  const [areas, setAreas] = useState<AreasType[] | null>(null)
  const [centers, setCenters] = useState<CentersType[] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const toast = useRef<Toast>(null)
  const [refresh, setRefresh] = useState(false)
  const [team, setTeam] = useState<TeamType[]>([])
  const [selectedTeam, setselectedTeam] = useState<TeamType | null>(null)

  // const data = [
  //   {
  //     idEquipo: 1,
  //     nombre: 'EA-C',
  //     correo: 'http://sigcap.no-ip.org:8082/geoserver/wms',
  //     descripcion: 'Servicio WMS SIGCAP',
  //     gerencia: 'Gerencia 1',
  //     centroServicio: 'Centro Servicio 1',
  //   },
  //   {
  //     idEquipo: 2,
  //     nombre: 'EA-N',
  //     correo:
  //       'http://websig.senamhi.gob.pe/wms/?wms=WMS_CLASIFICACION_CLIMATICA',
  //     descripcion: 'Servicio WMS GEOSERVIDOR',
  //     gerencia: 'Gerencia 2',
  //     centroServicio: 'Centro Servicio 2',
  //   },
  // ]

  // Función de transformación
  const toEquipoApi = (raw: TeamType): UpdateTeamType => ({
    idEquipo: raw.idEquipo,
    nombre: raw.nombre,
    correo: raw.correo,
    descripcion: raw.descripcion,
    bloqueado: raw.bloqueado,
    areaId: raw.areaId,
    zonasId: Array.isArray(raw.centroServicio)
      ? raw.centroServicio.map((cs) => cs.zonaId)
      : [],
  })

  const handleCloseUpdateForm = () => setselectedTeam(null)

  const handleCreateTeam = async (teamType: InsertTeamType) => {
    await confirmDialog({
      message: '¿Estás seguro de que deseas enviar el equipo?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      accept: async () => {
        const response = await postTeam(teamType)
        setIsModalOpen(false)
        toast.current?.show({
          severity: 'success',
          summary: 'Confirmación',
          detail: 'Equipo agregado correctamente',
          life: 3000,
        })
        setRefresh(!refresh)
        console.log(response.message)
      },
      reject: () => {
        setIsModalOpen(false)
        console.log('No se envió el equipo' + teamType.nombre)
      },
    })
  }

  const handleUpdateTeam = async (teamType: UpdateTeamType) => {
    await confirmDialog({
      message: `¿Estás seguro de que deseas editar el equipo : ${teamType.nombre}?`,
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      accept: async () => {
        const response = await updateTeam(teamType)
        handleCloseUpdateForm()
        toast.current?.show({
          severity: 'success',
          summary: 'Confirmación',
          detail: 'Se editó el equipo',
          life: 3000,
        })
        console.log(response.message)
        setRefresh(!refresh)
      },
      reject: () => {
        handleCloseUpdateForm()
        console.log('No se editó el equipo' + teamType.nombre)
      },
    })
  }

  const handleDeleteTeam = async (teamType: TeamType) => {
    console.log('eliminar')
    await confirmDialog({
      message: `¿Estás seguro de que deseas eliminar el equipo: ${teamType.nombre}?`,
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      accept: async () => {
        const response = await deleteTeam(teamType.idEquipo)
        console.log(response.message)
        toast.current?.show({
          severity: 'success',
          summary: 'Confirmed',
          detail: 'Se eliminó el equipo',
          life: 3000,
        })
        setRefresh(!refresh)
        console.log('Se eliminó el equipo ' + teamType.nombre)
      },
      reject: () => {
        console.log('No se eliminó el equipo ' + teamType.nombre)
      },
    })
  }

  const handleSwitchTeam = async (teamType: TeamType) => {
    console.log('se modifico bloqueo')
    console.log(teamType)
    teamType.bloqueado = teamType.bloqueado === 1 ? 0 : 1 // Cambia el estado de bloqueado
    console.log(teamType)
    const updateTeam_: UpdateTeamType = toEquipoApi(teamType)
    const response = await updateTeam(updateTeam_)
    console.log(response.message)
    toast.current?.show({
      severity: 'success',
      summary: 'Confirmed',
      detail: 'Se modificó el equipo',
      life: 3000,
    })
    setRefresh(!refresh)
    console.log('Se modificó el equipo ' + teamType.nombre)
  }

  // const team1 = [
  //   {
  //     idEquipo: 1,
  //     nombre: 'Equipo A',
  //     correo: 'equipoA@empresa.com',
  //     descripcion: 'Equipo encargado del soporte técnico.',
  //     bloqueado: 0,
  //     gerencia: 'Gerencia de TI',
  //     idGerencia: 101,
  //     centroServicio: 'Centro 1',
  //   },
  //   {
  //     idEquipo: 2,
  //     nombre: 'Equipo B',
  //     correo: 'equipoB@empresa.com',
  //     descripcion: 'Equipo encargado del desarrollo de software.',
  //     bloqueado: 1,
  //     gerencia: 'Gerencia de Desarrollo',
  //     idGerencia: 102,
  //     centroServicio: 'Centro 2',
  //   },
  //   {
  //     idEquipo: 3,
  //     nombre: 'Equipo C',
  //     correo: 'equipoC@empresa.com',
  //     descripcion: 'Equipo encargado de la administración de bases de datos.',
  //     bloqueado: 0,
  //     gerencia: 'Gerencia de Infraestructura',
  //     idGerencia: 103,
  //     centroServicio: 'Centro 3',
  //   },
  //   {
  //     idEquipo: 4,
  //     nombre: 'Equipo D',
  //     correo: 'equipoD@empresa.com',
  //     descripcion: 'Equipo encargado de la seguridad informática.',
  //     bloqueado: 1,
  //     gerencia: 'Gerencia de Seguridad',
  //     idGerencia: 104,
  //     centroServicio: 'Centro 4',
  //   },
  // ]

  useEffect(() => {
    const fetchTeamsAPIs = async () => {
      //Llamamos a la API para obtener los equipos
      const team = await getTeam()
      setTeam(team)
      //Llamamos a la API para obtener las áreas de gerencias
      const areas = await getAreas()
      setAreas(areas)
      //Llamamos a la API para obtener los centros de servicio
      const centers = await getCenters()
      setCenters(centers)
    }
    fetchTeamsAPIs()
  }, [refresh])

  return (
    <>
      <Card title="Equipos">
        <TeamTable
          data={team}
          onAddClick={() => setIsModalOpen(true)}
          onUpdateClick={(teamType: TeamType | null) => {
            setselectedTeam(teamType)
          }}
          onDeleteClick={(teamType: TeamType) => handleDeleteTeam(teamType)}
          onSwichtClick={(teamType: TeamType) => handleSwitchTeam(teamType)}
        />
      </Card>

      <NewTeamForm
        isModalOpen={isModalOpen}
        onIsModalOpen={setIsModalOpen}
        onSubmit={handleCreateTeam}
        areas={areas ?? []}
        centers={centers ?? []}
      />
      {selectedTeam && (
        <UpdateTeamForm
          // isModalOpen={!!selectedTeam}
          handleClose={handleCloseUpdateForm}
          onSubmit={handleUpdateTeam}
          currentService={selectedTeam}
          areas={areas ?? []}
          centers={centers ?? []}
        />
      )}
      <ConfirmDialog />
      <Toast ref={toast} />
    </>
  )
}
