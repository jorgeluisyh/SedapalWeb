import type { Profile } from "../../profiles/types/profileType";
import type { EditUser } from "../types/editUserType";
import type { User } from "../types/userType";

export const toEditUser = (raw: User): EditUser => ({
    idUsuario: raw.idUsuario,
    nombre: raw.nombre,
    idEquipo: raw.idEquipo ?? 1,
    bloqueado: raw.bloqueado,
    perfiles: Array.isArray(raw.perfiles)
      ? raw.perfiles.map((perfil: Profile) => perfil.idPerfil)
      : [],
  })