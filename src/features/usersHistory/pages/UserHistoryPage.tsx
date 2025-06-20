import { useState } from 'react'
import { Card } from 'primereact/card'
import { UserHistoryTable } from '../components/UserHistoryTable'
import { UserHistoryTableNoMatch } from '../components/UserHistoryTableNoMatch'

export const UserHistoryPage = () => {
  const [_isModalOpen, setIsModalOpen] = useState(false)

  const data = [
    {
      id: 1,
      user: 'USUARIO 01',
      profile: 'EPFPIExternos',
    },
    {
      id: 2,
      user: 'USUARIO 02',
      profile: 'EPFPIExternos_Calidda',
    },
  ]

  return (
    <>
      <Card title="Historicos de Usuarios" className="w-full">
        <UserHistoryTable data={data} onAddClick={() => setIsModalOpen(true)} />
        <div className="text-left" style={{ marginTop: '20px' }}>
          Sin Coincidencias
        </div>
        <UserHistoryTableNoMatch
          data={data}
          onAddClick={() => setIsModalOpen(true)}
        />
      </Card>
      {/* <NewProfileForm
        isModalOpen={isModalOpen}
        onIsModalOpen={setIsModalOpen}
        onSubmit={handleCreateProduct}
      /> */}
    </>
  )
}
