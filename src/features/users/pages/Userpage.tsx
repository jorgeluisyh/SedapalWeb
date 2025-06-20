import { useState } from 'react'
import { Card } from 'primereact/card'
import { NewUserForm } from '../components/NewUserLDAPForm'
import { NewUserExternalForm } from '../components/NewUserExternalForm'
import type { NewUserExternal } from '../types/newUserExternalType'
import type { User } from '../types/userType'
import { EditMultipleUsersForm } from '../components/EditMultipleUsersForm'
import { UserTable } from '../components/UserTable'
// import type { EditMultipleUsers } from '../types/editMultipleUsersType'

export const Userpage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalOpenExternal, setIsModalOpenExternal] = useState(false)
  const [isModalOpenMultiple, setIsModalOpenMultiple] = useState(false)

  const handleCreateProduct = async (user: User) => {
    console.log(user)
  }

  const handleCreateNewExternalUser = async (user: NewUserExternal) => {
    console.log(user)
  }

  const handleEditMultipleUsers = async (users: User) => {
    console.log(users)
  }

  const data: User[] = [
    {
      id_Usuario: 1,
      username: 'ACM01',
      profile: 'EPFPIExternos',
      team: 'A', // add a value for team
      type: '100', // add a value for type
      blocked: true, // add a value for block
    },
    {
      id_Usuario: 2,
      username: 'Analisis Comercial',
      profile: 'EPFPExternos_Calidda ',
      team: 'B', // add a value for team
      type: '100', // add a value for type
      blocked: false, // add a value for block
    },
    {
      id_Usuario: 3,
      username: 'Analisis Superficial',
      profile: 'EPFPExternos_Calidda ',
      team: 'B', // add a value for team
      type: '200', // add a value for type
      blocked: false, // add a value for block
    },
  ]

  return (
    <>
      {/* {JSON.stringify(products)} */}
      <Card title="Usuarios">
        <UserTable
          data={data}
          onAddClick={() => setIsModalOpen(true)}
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
