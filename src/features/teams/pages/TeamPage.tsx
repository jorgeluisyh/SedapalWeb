import { useEffect, useRef, useState } from 'react'
import { Card } from 'primereact/card'
import type { TeamType } from '../types/teamType'
import { TeamTable } from '../components/TeamTable'
import { NewTeamForm } from '../components/NewTeamForm'
import { confirmDialog } from 'primereact/confirmdialog'
import { deleteTeam, getTeam, postTeam, updateTeam } from '../apis/teamApi'
import { Toast } from 'primereact/toast'
import { UpdateTeamForm } from '../components/UpdateTeamForm'

export const TeamPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const toast = useRef<Toast>(null)
  const [refresh, setRefresh] = useState(false)
  const [team, setTeam] = useState<TeamType[]>([])
  const [selectedTeam, setselectedService] = useState<TeamType | null>(null)

  const data = [
    {
      idEquipo: 1,
      nombre: 'EA-C',
      correo: 'http://sigcap.no-ip.org:8082/geoserver/wms',
      descripcion: 'Servicio WMS SIGCAP',
      gerencia: 'Gerencia 1',
      centroServicio: 'Centro Servicio 1',
    },
    {
      idEquipo: 2,
      nombre: 'EA-N',
      correo:
        'http://websig.senamhi.gob.pe/wms/?wms=WMS_CLASIFICACION_CLIMATICA',
      descripcion: 'Servicio WMS GEOSERVIDOR',
      gerencia: 'Gerencia 2',
      centroServicio: 'Centro Servicio 2',
    },
  ]

  const handleCloseUpdateForm = () => setselectedService(null)

  const handleCreateTeam = async (teamType: TeamType) => {
    confirmDialog({
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

  const handleUpdateTeam = async (teamType: TeamType) => {
    confirmDialog({
      message: `¿Estás seguro de que deseas editar el equipo : ${teamType.nombre}?`,
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      accept: async () => {
        const response = await updateTeam(teamType.idEquipo, teamType)
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
    confirmDialog({
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

  useEffect(() => {
    const fetchWmsServices = async () => {
      const team = await getTeam()
      setTeam(team)
    }
    fetchWmsServices()
  })

  return (
    <>
      <Card title="Equipos">
        <TeamTable
          data={team}
          onAddClick={() => setIsModalOpen(true)}
          onUpdateClick={(teamType: TeamType | null) => {
            setselectedService(teamType)
          }}
          onDeleteClick={(teamType: TeamType) => handleDeleteTeam(teamType)}
        />
      </Card>

      <NewTeamForm
        isModalOpen={isModalOpen}
        onIsModalOpen={setIsModalOpen}
        onSubmit={handleCreateTeam}
      />
      <UpdateTeamForm
        isModalOpen={!!selectedTeam}
        onIsModalOpen={handleCloseUpdateForm}
        onSubmit={handleUpdateTeam}
      />
    </>
  )
}
