import { axiosInstance } from "../../../shared/http/axiosInstance";
import type { FunctionType, PermissionsType, Profile, ProjectType } from "../types/profileType";
import type { Map } from "../../maps/types/mapType";
import type { CentersType } from "../../teams/types/centersType";
import type { ProfileIns } from "../types/profileInsType";



export const getProfiles = async (): Promise<Profile[]> => {
    const response = await axiosInstance.get("/api/Perfiles");
    return response.data;
}

export const postProfile = async (data: ProfileIns) => {
    const response = await axiosInstance.post("/api/Perfiles", data);
    return response.data;
}

export const updateProfile = async ( data: ProfileIns) => {
    const response = await axiosInstance.put(`/api/Perfiles`, data);
    return response.data;
}

export const deleteProfile = async (id: number) => {
    const response = await axiosInstance.delete(`/api/Perfiles/${id}`);
    return response.data;
}

export const getMaps = async (): Promise<Map[]> => {
    const response = await axiosInstance.get("/api/Mapas");
    return response.data;
}

export const getFunctions = async (): Promise<FunctionType[]> => {
    const response = await axiosInstance.get("/api/Funcion");
    return response.data;
}

export const getCenters = async (): Promise<CentersType[]> => {
    const response = await axiosInstance.get("/api/Lista/Centros");
    return response.data;
}

export const getPermissions = async (): Promise<PermissionsType[]> => {
    const response = await axiosInstance.get("/api/Permiso");
    return response.data;
}

export const getProjects = async (): Promise<ProjectType[]> => {
    const response = await axiosInstance.get("/api/Proyecto");
    return response.data;
}

// Obtener elementos por ID

export const getFuncionesById = async (id: number): Promise<FunctionType[]> => {
  try {
    const response = await axiosInstance.get(`/api/Funcion/FuncionesPerfil?idPerfil=${id}`);
    return response.data;
  } catch (error: any) {
    // Verificar si el error es un 404
    if (error.response?.status === 404) {
      console.warn(`Funciones para el perfil ${id} no encontradas, devolviendo un array vacío.`);
      return []; // Retorna un array vacío en caso de error 404
    }
    // Propagar otros errores
    throw error;
  }
}

export const getMapsById = async (id: number): Promise<Map[]> => {
  try {
    const response = await axiosInstance.get(`/api/Mapas/MapasPerfil?idPerfil=${id}`);
    return response.data;
  } catch (error:any) {
    if (error.response?.status === 404) {
      console.warn(`Mapas para el perfil ${id} no encontrados, devolviendo un array vacío.`);
      return []; // Retorna un array vacío en caso de error 404
    }
    throw error;
  }
}

export const getProyectosById = async (id: number): Promise<ProjectType[]> => {
  try {
    const response = await axiosInstance.get(`/api/Proyecto/ProyectosPerfil?idPerfil=${id}`);
    return response.data;
  } catch (error:any) {
    if (error.response?.status === 404) {
      console.warn(`Proyectos para el perfil ${id} no encontrados, devolviendo un array vacío.`);
      return []; // Retorna un array vacío en caso de error 404
    }
    throw error;
  }
}

export const getPermisosById = async (id: number): Promise<PermissionsType[]> => {
  try {
    const response = await axiosInstance.get(`/api/Permiso/PermisosPerfil?idPerfil=${id}`);
    return response.data;
  } catch (error:any) {
    if (error.response?.status === 404) {
      console.warn(`Permisos para el perfil ${id} no encontrados, devolviendo un array vacío.`);
      return []; // Retorna un array vacío en caso de error 404
    }
    throw error;
  }
}

export const getCentersById = async (id: number): Promise<CentersType[]> => {
  try {
    const response = await axiosInstance.get(`/api/Lista/CentrosPerfil?idPerfil=${id}`);
    return response.data;
  } catch (error:any) {
    if (error.response?.status === 404) {
      console.warn(`Centros para el perfil ${id} no encontrados, devolviendo un array vacío.`);
      return []; // Retorna un array vacío en caso de error 404
    }
    throw error;
  }
}