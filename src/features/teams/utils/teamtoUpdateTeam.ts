import type { TeamType } from "../types/teamType";
import type { UpdateTeamType } from "../types/updateTeamType";

export const toEquipoApi = (raw: TeamType): UpdateTeamType => ({
    idEquipo: raw.idEquipo,
    nombre: raw.nombre,
    correo: raw.correo,
    descripcion: raw.descripcion,
    bloqueado: raw.bloqueado,
    areaId: raw.areaId,
    zonasId: Array.isArray(raw.centroServicio)
      ? raw.centroServicio.map((cs) => cs.zonaId)
      : [],
  })