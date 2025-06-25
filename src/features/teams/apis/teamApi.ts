import { axiosInstance } from "../../../shared/http/axiosInstance";
import type { TeamType } from "../types/teamType";
import type { AreasType } from "../types/areasType";


export const getTeam = async (): Promise<TeamType[]> => {
    const response = await axiosInstance.get("/api/Equipos");
    return response.data;
}

export const postTeam = async (data: TeamType) => {
    const response = await axiosInstance.post("/api/Equipos", data);
    return response.data;
}

export const updateTeam = async (id: number, data: TeamType) => {
    const response = await axiosInstance.put(`/api/Equipos/${id}`, data);
    return response.data;
}

export const deleteTeam = async (id: number) => {
    const response = await axiosInstance.delete(`/api/Equipos/${id}`);
    return response.data;
}

export const getAreas = async (): Promise<AreasType[]> => {
    const response = await axiosInstance.get("/api/Lista/Areas");
    return response.data;
}

export const getCenters = async (): Promise<AreasType[]> => {
    const response = await axiosInstance.get("/api/Lista/Centros");
    return response.data;
}