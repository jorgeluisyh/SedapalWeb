import { useState } from 'react'
import { Card } from 'primereact/card'
import { NewUserForm } from '../components/NewUserLDAPForm'
import type { User } from '../types/userType'
import { UserTable } from '../components/UserTable'

export const Userpage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCreateProduct = async (user: User) => {
    console.log(user)
  }

  const data: User[] = [
    {
      id: 1,
      username: 'ACM01',
      profile: 'EPFPIExternos',
      team: 'A', // add a value for team
      type: '100', // add a value for type
      blocked: true, // add a value for block
    },
    {
      id: 2,
      username: 'Analisis Comercial',
      profile: 'EPFPExternos_Calidda ',
      team: 'B', // add a value for team
      type: '100', // add a value for type
      blocked: false, // add a value for block
    },
    {
      id: 3,
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
        <UserTable data={data} onAddClick={() => setIsModalOpen(true)} />
      </Card>

      <NewUserForm
        isModalOpen={isModalOpen}
        onIsModalOpen={setIsModalOpen}
        onSubmit={handleCreateProduct}
      />
    </>
  )
}
