import { useEffect, useRef, useState } from 'react'
import { Card } from 'primereact/card'
import type { TeamType } from '../types/teamType'
import { TeamTable } from '../components/TeamTable'
import { NewTeamForm } from '../components/NewTeamForm'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import {
  deleteTeam,
  getTeams,
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

  useEffect(() => {
    const fetchTeamsAPIs = async () => {
      const team = await getTeams()
      setTeam(team)
      const areas = await getAreas()
      setAreas(areas)
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
