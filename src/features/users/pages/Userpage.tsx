import { useState, useRef, useEffect } from 'react'
import { Card } from 'primereact/card'
import { NewUserForm } from '../components/NewUserLDAPForm'
import { NewUserExternalForm } from '../components/NewUserExternalForm'
import type { NewUserExternal } from '../types/newUserExternalType'
import type { User } from '../types/userType'
import { EditMultipleUsersForm } from '../components/EditMultipleUsersForm'
import { UserTable } from '../components/UserTable'
import { deleteUsers, getUsers, postUsers, updateUsers } from '../apis/userApi'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import { Toast } from 'primereact/toast'
import { UpdateUserForm } from '../components/UpdateUserForm'

export const Userpage = () => {
  const toast = useRef<Toast>(null)
  const [refresh, setRefresh] = useState(false)
  const [users, setUsers] = useState<User[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalOpenExternal, setIsModalOpenExternal] = useState(false)
  const [isModalOpenMultiple, setIsModalOpenMultiple] = useState(false)
  const [selectedService, setselectedService] = useState<User | null>(null)
  const handleCloseUpdateForm = () => setselectedService(null)

  const handleCreateProduct = async (user: User) => {
    console.log(user)
  }

  const handleCreateNewExternalUser = async (user: NewUserExternal) => {
    console.log(user)
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
        const response = await postUsers(user)
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

  const handleUpdateService = async (user: User) => {
    confirmDialog({
      message: `¿Estás seguro de que deseas editar el servicio : ${user.nombre}?`,
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      accept: async () => {
        const response = await updateUsers(user.idUsuario, user)
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
        console.log('No se editó el servicio' + user.nombre)
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
        const response = await deleteUsers(user.idUsuario)
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

  // const data: User[] = [
  //   {
  //     idUsuario: 1,
  //     nombre: 'ACM01',
  //     perfil: 'EPFPIExternos',
  //     equipo: 'A', // add a value for team
  //     tipo: 2, // add a value for type
  //     bloqueado: 0, // add a value for block
  //   },
  //   {
  //     idUsuario: 2,
  //     nombre: 'Analisis Comercial',
  //     perfil: 'EPFPExternos_Calidda ',
  //     equipo: 'B', // add a value for team
  //     tipo: 2, // add a value for type
  //     bloqueado: 0, // add a value for block
  //   },
  //   {
  //     idUsuario: 3,
  //     nombre: 'Analisis Superficial',
  //     perfil: 'EPFPExternos_Calidda ',
  //     equipo: 'B', // add a value for team
  //     tipo: 2, // add a value for type
  //     bloqueado: 0, // add a value for block
  //   },
  // ]

  useEffect(() => {
    const fetchWmsServices = async () => {
      const users = await getUsers()
      setUsers(users)
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
            setselectedService(users)
          }}
          onDeleteClick={(users: User) => handleDeleteService(users)}
          onAddExternalClick={() => setIsModalOpenExternal(true)}
          onAddMultipleClick={() => setIsModalOpenMultiple(true)}
        />
      </Card>
      <NewUserForm
        isModalOpen={isModalOpen}
        onIsModalOpen={setIsModalOpen}
        onSubmit={handleCreateProduct}
        onHide={() => console.log('Modal hidden')} // Add this prop
      />
      {selectedService && (
        <UpdateUserForm
          handleClose={handleCloseUpdateForm}
          onSubmit={handleUpdateService}
          currentService={selectedService}
        />
      )}
      <ConfirmDialog />
      <Toast ref={toast} />
      <NewUserExternalForm
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
