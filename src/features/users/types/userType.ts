import type { Profile } from "../../profiles/types/profileType"

export interface User {
  idUsuario: number
  nombre: string
  idEquipo?: number
  tipo?: number
  bloqueado: number
  admin?: number
  perfiles: Profile[]
  equipo?: string
  tipoUsuario?: string
}
