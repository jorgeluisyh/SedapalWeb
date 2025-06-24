export interface TeamType {
  idEquipo: number
  nombre: string
  correo: string
  descripcion: string
  bloqueado?: boolean
  gerencia: string
  idGerencia?: number
  centroServicio?: string
}