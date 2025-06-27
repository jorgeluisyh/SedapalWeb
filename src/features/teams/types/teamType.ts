export interface TeamType {
  idEquipo: number
  nombre: string
  correo: string
  descripcion: string
  bloqueado: number
  gerencia: string
  areaId: string
  centroServicio?: CenterServiceType[]
}

export interface CenterServiceType{
  zonaId: string
  nombre: string 
}