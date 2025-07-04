import { useEffect, useState } from 'react'
import { Card } from 'primereact/card'
import { UserHistoryTable } from '../components/UserHistoryTable'
import { UserHistoryTableNoMatch } from '../components/UserHistoryTableNoMatch'
import type { UserHistoryType } from '../types/userHistoryType'
import type { RecordsUserHistoryType } from '../types/recordsUserHistoryType'
import { getRecordsUserHistory, getUserHistory } from '../apis/userHistoryApi'

export const UserHistoryPage = () => {
  const [_isModalOpen, setIsModalOpen] = useState(false)
  const [refresh, setRefresh] = useState(false)

  const [users, setUsers] = useState<UserHistoryType[]>([])
  const [recordsUsers, setRecordsUsers] = useState<RecordsUserHistoryType[]>([])
  const data = [
    {
      hUsuariosId: 2259,
      usuarioId: 185576,
      usuarioNombre: 'CGANARIOS01',
      perfil: 'EPFPIExternos',
      equipo: 'SIN EQUIPO',
      centroServicio: null,
      gerencia: null,
      fechaGuardado: '2024-12-05T14:31:46',
      tipo: 'ACTUALIZACION',
      editor: 'eptisageoportaladm',
      bloqueado: 'NO',
    },
    {
      hUsuariosId: 2260,
      usuarioId: 185577,
      usuarioNombre: 'JSMITH02',
      perfil: 'Administrador',
      equipo: 'TI',
      centroServicio: 'Sede Central',
      gerencia: 'Gerencia TI',
      fechaGuardado: '2024-12-06T09:15:22',
      tipo: 'CREACION',
      editor: 'admin_sistema',
      bloqueado: 'NO',
    },
    {
      hUsuariosId: 2261,
      usuarioId: 185578,
      usuarioNombre: 'MRODRIGUEZ03',
      perfil: 'Consultor',
      equipo: 'Consultoría',
      centroServicio: 'Regional Norte',
      gerencia: 'Gerencia Consultoría',
      fechaGuardado: '2024-12-07T16:45:10',
      tipo: 'BLOQUEO',
      editor: 'seguridad_adm',
      bloqueado: 'SI',
    },
    {
      hUsuariosId: 2262,
      usuarioId: 185579,
      usuarioNombre: 'ADMIN_TEMP',
      perfil: 'Administrador Temporal',
      equipo: 'SIN EQUIPO',
      centroServicio: null,
      gerencia: null,
      fechaGuardado: '2024-12-08T11:20:33',
      tipo: 'ACTUALIZACION', // Error intencional para pruebas de validación
      editor: 'sysadmin',
      bloqueado: 'NO',
    },
    {
      hUsuariosId: 2263,
      usuarioId: 185580,
      usuarioNombre: 'USER_INACTIVO',
      perfil: 'Usuario Básico',
      equipo: 'Ventas',
      centroServicio: 'Regional Sur',
      gerencia: 'Gerencia Comercial',
      fechaGuardado: '2024-12-09T14:10:05',
      tipo: 'ELIMINACION',
      editor: 'rh_system',
      bloqueado: 'SI',
    },
  ]

  useEffect(() => {
    const fetchWmsServices = async () => {
      const users = await getUserHistory()
      setUsers(users)
      const recordsUsers = await getRecordsUserHistory()
      setRecordsUsers(recordsUsers)
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
          data={recordsUsers}
          onAddClick={() => setIsModalOpen(true)}
        />
      </Card>
    </>
  )
}
