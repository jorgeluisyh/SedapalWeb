export interface RecordsUserHistoryType {
  hUsuariosId: number;
  usuarioId: number;
  usuarioNombre: string;
  perfil: string;
  equipo: string;
  centroServicio: string | null;
  gerencia: string | null;
  fechaGuardado: string; // o podrías usar Date si lo conviertes
  tipo: "ACTUALIZACION" | string; // Puedes ampliar con otros tipos posibles
  editor: string;
  bloqueado: string;
}