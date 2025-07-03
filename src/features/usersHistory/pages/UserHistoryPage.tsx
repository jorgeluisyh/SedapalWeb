import { useEffect, useState } from 'react'
import { Card } from 'primereact/card'
import { UserHistoryTable } from '../components/UserHistoryTable'
import { UserHistoryTableNoMatch } from '../components/UserHistoryTableNoMatch'
import type { UserHistoryType } from '../types/userHistoryType'
import { getUserHistory } from '../apis/userHistoryApi'

export const UserHistoryPage = () => {
  const [_isModalOpen, setIsModalOpen] = useState(false)
  const [refresh, setRefresh] = useState(false)

  const [users, setUsers] = useState<UserHistoryType[]>([])

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

  useEffect(() => {
    const fetchWmsServices = async () => {
      const users = await getUserHistory()
      setUsers(users)
    }
    fetchWmsServices()
  }, [refresh])

  return (
    <>
      <Card title="Historicos de Usuarios" className="w-full">
        <UserHistoryTable
          data={users}
          onAddClick={() => setIsModalOpen(true)}
        />
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
