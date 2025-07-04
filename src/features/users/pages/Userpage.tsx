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
  postLDAPUser,
  updatePerfilesMultipleUser,
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
import { toEditUser } from '../utils/userToEditUser'
import type { EditMultipleUsers } from '../types/editMultipleUsersType'

export const Userpage = () => {
  const toast = useRef<Toast>(null)
  const [refresh, setRefresh] = useState(false)
  const [users, setUsers] = useState<User[]>([])
  const [selectedUsers, setSelectedUsers] = useState<User[]>([])
  const [perfiles, setPerfiles] = useState<Profile[]>([])
  const [equipos, setEquipos] = useState<TeamType[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalOpenExternal, setIsModalOpenExternal] = useState(false)
  const [isModalOpenMultiple, setIsModalOpenMultiple] = useState(false)
  const [selectedUser, setselectedUser] = useState<User | null>(null)
  const handleCloseUpdateForm = () => setselectedUser(null)
  const handleCloseUpdateFormMultiple = () => {
    setSelectedUsers([])
    setIsModalOpenMultiple(false)
  }

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

  const handleEditMultipleUsers = async (multipleusers: EditMultipleUsers) => {
    confirmDialog({
      message: '¿Estás seguro de que deseas actualizar los perfiles?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      accept: async () => {
        const response = await updatePerfilesMultipleUser(multipleusers)
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
        console.log('No se envió el servicio')
      },
    })
  }

  const handleSwitchUser = async (user: User) => {
    console.log('se modifico bloqueo')
    console.log(user)
    user.bloqueado = user.bloqueado === 1 ? 0 : 1 // Cambia el estado de bloqueado
    console.log(user)
    const editUser: EditUser = toEditUser(user)
    const response = await updateUser(editUser)
    console.log(response.message)
    toast.current?.show({
      severity: 'success',
      summary: 'Confirmed',
      detail: 'Se modificó el equipo',
      life: 3000,
    })
    setRefresh(!refresh)
    console.log('Se modificó el usuario ')
  }

  const handleCreateLDAPUser = async (user: User) => {
    confirmDialog({
      message: '¿Estás seguro de que deseas enviar el servicio?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      accept: async () => {
        debugger
        const response = await postLDAPUser(user)
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
          selectedUsers={selectedUsers}
          onsetSelectedUsers={setSelectedUsers}
          onAddClick={() => {
            setIsModalOpen(true)
          }}
          onUpdateClick={(user: User | null) => {
            setselectedUser(user)
          }}
          onDeleteClick={(user: User) => handleDeleteService(user)}
          onAddExternalClick={() => setIsModalOpenExternal(true)}
          onEditMultipleUsersClick={() => setIsModalOpenMultiple(true)}
          onSwichtClick={(user: User) => handleSwitchUser(user)}
        />
      </Card>
      <NewUserForm
        perfiles={perfiles}
        equipos={equipos}
        isModalOpen={isModalOpen}
        onIsModalOpen={setIsModalOpen}
        onSubmit={handleCreateLDAPUser}
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
      />
      {selectedUsers.length > 0 && isModalOpenMultiple && (
        <EditMultipleUsersForm
          handleClose={handleCloseUpdateFormMultiple}
          selectedUsers={selectedUsers}
          perfiles={perfiles}
          onSubmit={handleEditMultipleUsers}
        />
      )}
    </>
  )
}
