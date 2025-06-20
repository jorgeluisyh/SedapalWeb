import { useEffect, useRef, useState } from 'react'
import { Card } from 'primereact/card'
import type { Profile } from '../types/profileType'
import { ProfileTable } from '../components/ProfileTable'
import { NewProfileForm } from '../components/NewProfileForm'
import {
  getProfile,
  postProfile,
  updateProfile,
  deleteProfile,
} from '../apis/profileApi'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import { Toast } from 'primereact/toast'
import { UpdateProfileForm } from '../components/UpdateProfileForm'

export const ProfilePage = () => {
  const toast = useRef<Toast>(null)
  const [refresh, setRefresh] = useState(false)
  const [profile, setProfile] = useState<Profile[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedService, setselectedService] = useState<Profile | null>(null)

  const handleCloseUpdateForm = () => setselectedService(null)

  // const handleCreateProduct = async (profile: Profile) => {
  //   //create tu metodo para guardar usuario con un api bicho
  //   console.log(profile.nombrePerfil)
  // }

  // const data = [
  //   {
  //     idPerfil: 1,
  //     nombrePerfil: 'Alta Asistida Suministros',
  //     descripcion: 'Alta Asistida Suministros - Editor',
  //   },
  //   {
  //     idPerfil: 2,
  //     nombrePerfil: 'Analisis Comercial',
  //     descripcion:
  //       'Web Perfil Analista - Temáticos de la Información del Catastro Comercial ',
  //   },
  // ]

  const handleCreateService = async (profile: Profile) => {
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

  const handleUpdateService = async (profile: Profile) => {
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

  const handleDeleteService = async (profile: Profile) => {
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

  useEffect(() => {
    const fetchWmsServices = async () => {
      const profile = await getProfile()
      setProfile(profile)
    }
    fetchWmsServices()
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
            setselectedService(profile)
          }}
          onDeleteClick={(profile: Profile) => handleDeleteService(profile)}
        />
      </Card>
      <NewProfileForm
        isModalOpen={isModalOpen}
        onIsModalOpen={setIsModalOpen}
        onSubmit={handleCreateService}
      />
      {selectedService && (
        <UpdateProfileForm
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
