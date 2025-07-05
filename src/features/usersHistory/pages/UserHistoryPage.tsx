import { useEffect, useState } from 'react'
import { Card } from 'primereact/card'
import { UserHistoryTable } from '../components/UserHistoryTable'
import { UserHistoryChangesTable } from '../components/UserHistoryChangesTable'
import type { RecordsUserHistoryType } from '../types/recordsUserHistoryType'
import { getRecordsUserHistory } from '../apis/userHistoryApi'
import type { User } from '../../users/types/userType'
import { getUsers } from '../../users/apis/userApi'

export const UserHistoryPage = () => {
  const [_isModalOpen, setIsModalOpen] = useState(false)
  const [users, setUsers] = useState<User[]>([])
  const [recordUsers, setRecordUsers] = useState<RecordsUserHistoryType[]>([])
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [filteredHistorial, setFilteredHistorial] = useState<
    RecordsUserHistoryType[]
  >([])

  useEffect(() => {
    const fetchWmsServices = async () => {
      debugger
      const users = await getUsers()
      setUsers(users)
      const _recordsUsers = await getRecordsUserHistory()
      setRecordUsers(_recordsUsers)
      setFilteredHistorial(_recordsUsers) //(dataHistorialUsuarios)
    }
    fetchWmsServices()
  }, [])

  useEffect(() => {
    if (selectedUser) {
      const filtered = recordUsers.filter(
        (u) => u.usuarioNombre === selectedUser.nombre
      )
      setFilteredHistorial(filtered)
    } else {
      setFilteredHistorial(recordUsers) // Si no hay usuario seleccionado, mostrar todo
    }
  }, [selectedUser, recordUsers]) // ¡Dependencias correctas!

  const handleSelectedService = (user: User | null) => {
    setSelectedUser(user) // Esto disparará el useEffect de arriba
  }

  return (
    <>
      <Card title="Historicos de Usuarios" className="w-full">
        <UserHistoryTable
          data={users}
          onAddClick={() => setIsModalOpen(true)}
          onSelectedFilterClick={(user: User | null) => {
            handleSelectedService(user)
          }}
        />
        <div className="text-left" style={{ marginTop: '20px' }}>
          <h4>Historial de Cambios</h4>
        </div>
        <UserHistoryChangesTable
          data={filteredHistorial} //{recordsUsers}
          onAddClick={() => setIsModalOpen(true)}
        />
      </Card>
    </>
  )
}
