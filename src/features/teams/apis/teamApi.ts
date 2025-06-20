import { axiosInstance } from "../../../shared/http/axiosInstance";
import type { TeamType } from "../types/teamType";


export const getTeam = async (): Promise<TeamType[]> => {
    const response = await axiosInstance.get("/api/Servicios/servicioswms");
    return response.data;
}

export const postTeam = async (data: TeamType) => {
    const response = await axiosInstance.post("/api/Servicios/servicioswms", data);
    return response.data;
}

export const updateTeam = async (id: number, data: TeamType) => {
    const response = await axiosInstance.put(`/api/Servicios/servicioswms/${id}`, data);
    return response.data;
}

export const deleteTeam = async (id: number) => {
    const response = await axiosInstance.delete(`/api/Servicios/servicioswms/${id}`);
    return response.data;
}