import { useEffect, useRef, useState } from 'react'
import { Card } from 'primereact/card'
import type {
  FunctionType,
  PermissionsType,
  Profile,
  ProjectType,
} from '../types/profileType'
import { ProfileTable } from '../components/ProfileTable'
import { NewProfileForm } from '../components/NewProfileForm'
import {
  getProfile,
  postProfile,
  updateProfile,
  deleteProfile,
  getFunctions,
  getMaps,
  getCenters,
  getPermissions,
  getProjects,
} from '../apis/profileApi'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import { Toast } from 'primereact/toast'
import { UpdateProfileForm } from '../components/UpdateProfileForm'
import type { Map } from '../../maps/types/mapType'
import type { CentersType } from '../../teams/types/centersType'
import type { ProfileIns } from '../types/profileInsType'

export const ProfilePage = () => {
  const toast = useRef<Toast>(null)
  const [refresh, setRefresh] = useState(false)
  const [profile, setProfile] = useState<Profile[]>([])
  const [functions, setFunctions] = useState<FunctionType[]>([])
  const [maps, setMaps] = useState<Map[]>([])
  const [centers, setCenters] = useState<CentersType[]>([])
  const [permissions, setPermissions] = useState<PermissionsType[]>([])
  const [projects, setProjects] = useState<ProjectType[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProfile, setselectedProfile] = useState<Profile | null>(null)

  const handleCloseUpdateForm = () => setselectedProfile(null)

  const handleCreateProfile = async (profile: ProfileIns) => {
    confirmDialog({
      message: '¿Estás seguro de que deseas enviar el servicio?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      accept: async () => {
        const response = await postProfile(profile)
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
        console.log('No se envió el servicio' + profile.nombrePerfil)
      },
    })
  }

  const handleUpdateProfile = async (profile: Profile) => {
    confirmDialog({
      message: `¿Estás seguro de que deseas editar el perfil : ${profile.nombrePerfil}?`,
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      accept: async () => {
        const response = await updateProfile(profile.idPerfil, profile)
        handleCloseUpdateForm()
        toast.current?.show({
          severity: 'success',
          summary: 'Confirmación',
          detail: 'Se editó el perfil',
          life: 3000,
        })
        console.log(response.message)
        setRefresh(!refresh)
      },
      reject: () => {
        handleCloseUpdateForm()
        console.log('No se editó el perfil' + profile.nombrePerfil)
      },
    })
  }

  const handleDeleteProfile = async (profile: Profile) => {
    console.log('eliminar')
    confirmDialog({
      message: `¿Estás seguro de que deseas eliminar el perfil: ${profile.nombrePerfil}?`,
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      accept: async () => {
        const response = await deleteProfile(profile.idPerfil)
        console.log(response.message)
        toast.current?.show({
          severity: 'success',
          summary: 'Confirmed',
          detail: 'Se eliminó el perfil',
          life: 3000,
        })
        setRefresh(!refresh)
        console.log('Se eliminó el perfil ' + profile.nombrePerfil)
      },
      reject: () => {
        console.log('No se eliminó el perfil ' + profile.nombrePerfil)
      },
    })
  }

  // const availableFunctions = [
  //   {
  //     idFuncion: 1,
  //     nombreFuncion: 'SGIO- Ayesa',
  //     descripcion: 'Sistema de Gestión Integral de Operaciones',
  //   },
  //   {
  //     idFuncion: 2,
  //     nombreFuncion: 'Análisis Redesmx Julio',
  //     descripcion: 'Análisis de Redes de Telecomunicaciones',
  //   },
  //   {
  //     idFuncion: 3,
  //     nombreFuncion: 'ANFmxd Ayesa',
  //     descripcion: 'Modelo de Datos ANF',
  //   },
  // ]

  // const availableMaps = [
  //   {
  //     idMapa: 108,
  //     descripcion: 'Nuevo Mapa de inserccion',
  //     nombreMapa: 'Nuevo Mapa',
  //     servicios: [
  //       {
  //         idServicioMapa: 5,
  //         nombreServicioMapa: 'AguaPotable',
  //         posicion: 1,
  //         visible: 1,
  //       },
  //       {
  //         idServicioMapa: 4,
  //         nombreServicioMapa: 'Catastro Comercial',
  //         posicion: 2,
  //         visible: 0,
  //       },
  //     ],
  //   },
  // ]

  // const availableCenters = [
  //   {
  //     id: 'AO-7',
  //     name: 'CSO BREÑA',
  //     extra: '336',
  //   },
  //   {
  //     id: 'AO-8',
  //     name: 'CSO SURQUILLO',
  //     extra: '337',
  //   },
  //   {
  //     id: 'AO-9',
  //     name: 'LIMA',
  //     extra: '338',
  //   },
  // ]
  useEffect(() => {
    const fetchAttributes = async () => {
      const profile = await getProfile()
      setProfile(profile)
      const functions = await getFunctions()
      setFunctions(functions)
      const maps = await getMaps()
      setMaps(maps)
      const centers = await getCenters()
      setCenters(centers)
      const permissions = await getPermissions()
      setPermissions(permissions)
      const projects = await getProjects()
      setProjects(projects)
    }
    fetchAttributes()
  }, [refresh])

  return (
    <>
      <Card title="Perfiles">
        <ProfileTable
          data={profile}
          onAddClick={() => {
            setIsModalOpen(true)
          }}
          onUpdateClick={(profile: Profile | null) => {
            setselectedProfile(profile)
          }}
          onDeleteClick={(profile: Profile) => handleDeleteProfile(profile)}
        />
      </Card>
      <NewProfileForm
        availableFunctions={functions}
        availableMaps={maps}
        availableCenters={centers}
        availableProjects={projects}
        availablePermissions={permissions}
        isModalOpen={isModalOpen}
        onIsModalOpen={setIsModalOpen}
        onSubmit={handleCreateProfile}
      />
      {selectedProfile && (
        <UpdateProfileForm
          availableFunctions={functions}
          availableMaps={maps}
          availableCenters={centers}
          availableProjects={projects}
          availablePermissions={permissions}
          handleClose={handleCloseUpdateForm}
          onSubmit={handleUpdateProfile}
          currentProfile={selectedProfile}
        />
      )}
      <ConfirmDialog />
      <Toast ref={toast} />
    </>
  )
}
