// export interface UserHistoryType {
//   id: number
//   user: string
//   profile: string
//   team?: string
//   type?: string
//   blocked?: string
// }

interface PerfilUsuario {
  idPerfil: number;
  descripcion: string;
  nombrePerfil: string;
}

export interface UserHistoryType {
  idUsuario: number;
  nombre: string;
  idEquipo: number;
  tipo: number;
  bloqueado: number; // 0 = no bloqueado, 1 = bloqueado (podrías usar boolean si prefieres)
  admin: number; // 0 = no admin, 1 = admin (podrías usar boolean si prefieres)
  perfiles: PerfilUsuario[];
  equipo: null | string; // O podrías definir un tipo específico si hay opciones conocidas
  tipoUsuario: "EXTERNO" | "INTERNO" | string; // Amplía con los tipos posibles
}