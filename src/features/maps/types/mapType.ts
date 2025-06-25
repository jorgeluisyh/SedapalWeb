import type { ServiceMap } from "./serviceType";

export interface Map {
  idMapa: number
  nombreMapa: string
  descripcion: string
  servicios?: ServiceMap[];
}