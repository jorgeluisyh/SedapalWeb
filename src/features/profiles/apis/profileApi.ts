import { axiosInstance } from "../../../shared/http/axiosInstance";
import type { FunctionType, PermissionsType, Profile, ProjectType } from "../types/profileType";
import type { Map } from "../../maps/types/mapType";
import type { CentersType } from "../../teams/types/centersType";



export const getProfile = async (): Promise<Profile[]> => {
    const response = await axiosInstance.get("/api/Perfiles");
    return response.data;
}

export const postProfile = async (data: Profile) => {
    const response = await axiosInstance.post("/api/Perfiles", data);
    return response.data;
}

export const updateProfile = async (id: number, data: Profile) => {
    const response = await axiosInstance.put(`/api/Perfiles/${id}`, data);
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
    const response = await axiosInstance.get("/api/Lista/Centros");
    return response.data;
}

export const getProjects = async (): Promise<ProjectType[]> => {
    const response = await axiosInstance.get("/api/Proyecto");
    return response.data;
}