import { useState, useRef, useEffect } from 'react'
import { Card } from 'primereact/card'
import { NewUserForm } from '../components/NewUserLDAPForm'
import { NewUserExternalForm } from '../components/NewUserExternalForm'
import type { UserExterno } from '../types/newUserExternalType'
import type { User } from '../types/userType'
import { EditMultipleUsersForm } from '../components/EditMultipleUsersForm'
import { UserTable } from '../components/UserTable'
import {
  deleteUser,
  getUsers,
  postExternalUser,
  postUser,
  updateUser,
} from '../apis/userApi'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import { Toast } from 'primereact/toast'
import { UpdateUserForm } from '../components/UpdateUserForm'
import { getProfiles } from '../../profiles/apis/profileApi'
import type { Profile } from '../../profiles/types/profileType'
import type { EditUser } from '../types/editUserType'
import { getTeams } from '../../teams/apis/teamApi'
import type { TeamType } from '../../teams/types/teamType'

export const Userpage = () => {
  const toast = useRef<Toast>(null)
  const [refresh, setRefresh] = useState(false)
  const [users, setUsers] = useState<User[]>([])
  const [perfiles, setPerfiles] = useState<Profile[]>([])
  const [equipos, setEquipos] = useState<TeamType[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalOpenExternal, setIsModalOpenExternal] = useState(false)
  const [isModalOpenMultiple, setIsModalOpenMultiple] = useState(false)
  const [selectedUser, setselectedUser] = useState<User | null>(null)
  const handleCloseUpdateForm = () => setselectedUser(null)

  const handleCreateNewExternalUser = async (user: UserExterno) => {
    console.log(user)
    confirmDialog({
      message: '¿Estás seguro de que deseas enviar el servicio?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      accept: async () => {
        const response = await postExternalUser(user)
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
        console.log('No se envió el servicio' + user.nombreUsuario)
      },
    })
  }

  const handleEditMultipleUsers = async (users: User) => {
    console.log(users)
  }

  const handleCreateService = async (user: User) => {
    confirmDialog({
      message: '¿Estás seguro de que deseas enviar el servicio?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      accept: async () => {
        const response = await postUser(user)
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
        console.log('No se envió el servicio' + user.nombre)
      },
    })
  }

  const handleUpdateService = async (user: EditUser) => {
    confirmDialog({
      message: `¿Estás seguro de que deseas editar el usuario?`,
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      accept: async () => {
        const response = await updateUser(user)
        handleCloseUpdateForm()
        toast.current?.show({
          severity: 'success',
          summary: 'Confirmación',
          detail: 'Se editó el servicio',
          life: 3000,
        })
        console.log(response.message)
        setRefresh(!refresh)
      },
      reject: () => {
        handleCloseUpdateForm()
        console.log('No se editó el servicio')
      },
    })
  }

  const handleDeleteService = async (user: User) => {
    console.log('eliminar')
    confirmDialog({
      message: `¿Estás seguro de que deseas eliminar el servicio: ${user.nombre}?`,
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      accept: async () => {
        const response = await deleteUser(user.idUsuario)
        console.log(response.message)
        toast.current?.show({
          severity: 'success',
          summary: 'Confirmed',
          detail: 'Se eliminó el servicio',
          life: 3000,
        })
        setRefresh(!refresh)
        console.log('Se eliminó el servicio ' + user.nombre)
      },
      reject: () => {
        console.log('No se eliminó el servicio ' + user.nombre)
      },
    })
  }

  useEffect(() => {
    const fetchWmsServices = async () => {
      const users = await getUsers()
      setUsers(users)
      const perfiles = await getProfiles()
      setPerfiles(perfiles)
      const equipos = await getTeams()
      setEquipos(equipos)
    }
    fetchWmsServices()
  }, [refresh])

  return (
    <>
      {/* {JSON.stringify(products)} */}
      <Card title="Usuarios">
        <UserTable
          data={users}
          // onAddClick={() => setIsModalOpen(true)}
          onAddClick={() => {
            setIsModalOpen(true)
          }}
          onUpdateClick={(users: User | null) => {
            setselectedUser(users)
          }}
          onDeleteClick={(users: User) => handleDeleteService(users)}
          onAddExternalClick={() => setIsModalOpenExternal(true)}
          onAddMultipleClick={() => setIsModalOpenMultiple(true)}
        />
      </Card>
      <NewUserForm
        isModalOpen={isModalOpen}
        onIsModalOpen={setIsModalOpen}
        onSubmit={handleCreateService}
        onHide={() => console.log('Modal hidden')} // Add this prop
      />
      {selectedUser && (
        <UpdateUserForm
          handleClose={handleCloseUpdateForm}
          onSubmit={handleUpdateService}
          currentUser={selectedUser}
          perfiles={perfiles}
          equipos={equipos}
        />
      )}
      <ConfirmDialog />
      <Toast ref={toast} />
      <NewUserExternalForm
        perfiles={perfiles}
        isModalOpen={isModalOpenExternal}
        onIsModalOpen={setIsModalOpenExternal}
        onSubmit={handleCreateNewExternalUser}
        onHide={() => console.log('Modal hidden')} // Add this prop
      />
      <EditMultipleUsersForm
        isModalOpen={isModalOpenMultiple}
        onIsModalOpen={setIsModalOpenMultiple}
        onSubmit={handleEditMultipleUsers}
        onHide={() => console.log('Modal hidden')} // Add this prop
      />
    </>
  )
}
