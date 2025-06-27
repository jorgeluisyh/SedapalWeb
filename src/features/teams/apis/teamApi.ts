import { axiosInstance } from "../../../shared/http/axiosInstance";
import type { TeamType } from "../types/teamType";
import type { AreasType } from "../types/areasType";
import type { InsertTeamType } from "../types/insertTeamType";
import type { UpdateTeamType } from "../types/updateTeamType";
import type { CentersType } from "../types/centersType";


export const getTeam = async (): Promise<TeamType[]> => {
    const response = await axiosInstance.get("/api/Equipos");
    return response.data;
}

export const postTeam = async (data: InsertTeamType) => {
    const response = await axiosInstance.post("/api/Equipos", data);
    return response.data;
}

export const updateTeam = async ( data: UpdateTeamType) => {
    const response = await axiosInstance.put("/api/Equipos", data);
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

export const getCenters = async (): Promise<CentersType[]> => {
    const response = await axiosInstance.get("/api/Lista/Centros");
    return response.data;
}