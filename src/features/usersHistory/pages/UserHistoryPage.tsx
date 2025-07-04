import { useEffect, useState } from 'react'
import { Card } from 'primereact/card'
import { UserHistoryTable } from '../components/UserHistoryTable'
import { UserHistoryTableNoMatch } from '../components/UserHistoryTableNoMatch'
import type { UserHistoryType } from '../types/userHistoryType'
import type { RecordsUserHistoryType } from '../types/recordsUserHistoryType'
import { getRecordsUserHistory, getUserHistory } from '../apis/userHistoryApi'
import type { User } from '../../users/types/userType'

export const UserHistoryPage = () => {
  const [_isModalOpen, setIsModalOpen] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [filteredUser, setFilteredUser] = useState<UserHistoryType[]>([])
  const [users, setUsers] = useState<UserHistoryType[]>([])
  const [recordsUsers, setRecordsUsers] = useState<RecordsUserHistoryType[]>([])
  const [selectedUser, setSelectedUser] = useState<UserHistoryType | null>(null)
  const [filteredHistorial, setFilteredHistorial] = useState<
    RecordsUserHistoryType[]
  >([])

  // Filtramos los registros basados en el usuario seleccionado
  // const filteredRecords = filteredUser
  //   ? data.filter(record => record.usuarioNombre === filteredUser)
  //   : data

  const dataHistorialUsuarios = [
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
      hUsuariosId: 2267,
      usuarioId: 238551,
      usuarioNombre: 'dprimera',
      perfil: 'EPFPIInternos',
      equipo: 'SIN EQUIPO',
      centroServicio: null,
      gerencia: null,
      fechaGuardado: '2024-12-10T19:22:32',
      tipo: 'CREACION',
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

  const dataUsuarios = [
    {
      idUsuario: 336701,
      nombre: 'migracion1_un',
      idEquipo: 1,
      tipo: 2,
      bloqueado: 0,
      admin: 0,
      perfiles: [
        {
          idPerfil: 115,
          descripcion: 'Perfil de uso exclusivo del ECRF - TERCEROS',
          nombrePerfil: 'Editor_Redes_Lima_Modif_Cod_Sap',
        },
        {
          idPerfil: 125,
          descripcion:
            'Edicion rapida de catastro comercial ATE (vias,lotes,frentes de mzs,manzanas,localidades)',
          nombrePerfil: 'Editor_Catastro_Rapida_ATE',
        },
      ],
      equipo: null,
      tipoUsuario: 'EXTERNO',
    },
    {
      idUsuario: 1,
      nombre: 'dprimera',
      idEquipo: 5,
      tipo: 2,
      bloqueado: 0,
      admin: 1,
      perfiles: [
        {
          idPerfil: 9,
          descripcion:
            'Web Perfil Analista - Temáticos de la Información del Catastro Comercial ',
          nombrePerfil: 'Analisis Comercial',
        },
        {
          idPerfil: 146,
          descripcion:
            'Edicion rapida de redes VES (tub.sec,reserv,surtid,hidrantes,valv.sist.,valv.control,cnx.dom.,conx.ftpropia,estruc.red / colect.sec.,buzones,cajas.registro,area de drenaje)',
          nombrePerfil: 'Editor_Redes_Rapida_VES',
        },
        {
          idPerfil: 152,
          descripcion: 'Aquafono',
          nombrePerfil: 'Aquafono',
        },
        {
          idPerfil: 149,
          descripcion: 'Alta Asistida Suministros - Editor',
          nombrePerfil: 'Alta Asistida Suministros - Editor',
        },
        {
          idPerfil: 150,
          descripcion: 'Alta Asistida Suministros - Supervisor',
          nombrePerfil: 'Alta Asistida Suministros - Supervisor',
        },
        {
          idPerfil: 151,
          descripcion: 'Demo de avisos de Aquafono',
          nombrePerfil: 'DEMO_Avisos_Aquafono',
        },
      ],
      equipo: 'Equipo Tecnologías de la Información y Comunicaciones',
      tipoUsuario: 'EXTERNO',
    },
    {
      idUsuario: 335726,
      nombre: 'Maraiana',
      idEquipo: 5,
      tipo: 1,
      bloqueado: 0,
      admin: 0,
      perfiles: [
        {
          idPerfil: 9,
          descripcion:
            'Web Perfil Analista - Temáticos de la Información del Catastro Comercial ',
          nombrePerfil: 'Analisis Comercial',
        },
        {
          idPerfil: 146,
          descripcion:
            'Edicion rapida de redes VES (tub.sec,reserv,surtid,hidrantes,valv.sist.,valv.control,cnx.dom.,conx.ftpropia,estruc.red / colect.sec.,buzones,cajas.registro,area de drenaje)',
          nombrePerfil: 'Editor_Redes_Rapida_VES',
        },
        {
          idPerfil: 152,
          descripcion: 'Aquafono',
          nombrePerfil: 'Aquafono',
        },
      ],
      equipo: 'Equipo Tecnologías de la Información y Comunicaciones',
      tipoUsuario: 'LDAP',
    },
    {
      idUsuario: 336051,
      nombre: 'Marlons',
      idEquipo: 5,
      tipo: 1,
      bloqueado: 0,
      admin: 0,
      perfiles: [],
      equipo: 'Equipo Tecnologías de la Información y Comunicaciones',
      tipoUsuario: 'LDAP',
    },
  ]
  useEffect(() => {
    const fetchWmsServices = async () => {
      const users = await getUserHistory()
      setUsers(users)
      const recordsUsers = await getRecordsUserHistory()
      setRecordsUsers(recordsUsers)
      setFilteredHistorial(recordsUsers) //(dataHistorialUsuarios)
    }
    fetchWmsServices()
  }, [refresh])

  const handleSelectedService = (user: UserHistoryType | null) => {
    setSelectedUser(user)
    if (user !== null) {
      const filteredHistorial = dataHistorialUsuarios.filter(
        (u) => u.usuarioNombre === user?.nombre
      )
      setFilteredHistorial(filteredHistorial)
    }
  }

  return (
    <>
      <Card title="Historicos de Usuarios" className="w-full">
        <UserHistoryTable
          data={dataUsuarios} //{users}
          onAddClick={() => setIsModalOpen(true)}
          onSelectedFilterClick={(user: UserHistoryType | null) => {
            handleSelectedService(user)
            console.log(user)
          }}
        />
        <div className="text-left" style={{ marginTop: '20px' }}>
          Sin Coincidencias
        </div>
        <UserHistoryTableNoMatch
          user={selectedUser}
          data={filteredHistorial} //{recordsUsers}
          onAddClick={() => setIsModalOpen(true)}
        />
      </Card>
    </>
  )
}
