export interface InsertProfileType {
  nombrePerfil: string;
  descripcion: string;
  funciones: number[]; // Lista de números (ID de las funciones)
  mapas: number[]; // Lista de números (ID de los mapas)
  permisos: number[]; // Lista de números (ID de los permisos)
  proyectos: number[]; // Lista de números (ID de los proyectos)
  zonas: string[]; // Lista de cadenas (nombres o identificadores de las zonas)
}