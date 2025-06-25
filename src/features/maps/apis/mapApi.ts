import { axiosInstance } from "../../../shared/http/axiosInstance";
import type { Map } from "../types/mapType";


export const getMaps = async (): Promise<Map[]> => {
    const response = await axiosInstance.get("/api/Mapas");
    return response.data;
}

export const postMaps = async (data: Map) => {
    const response = await axiosInstance.post("/api/Mapas", data);
    return response.data;
}

export const updateMaps = async (id: number, data: Map) => {
    const response = await axiosInstance.put(`/api/Mapas/${id}`, data);
    return response.data;
}

export const deleteMaps = async (id: number) => {
    const response = await axiosInstance.delete(`/api/Mapas/${id}`);
    return response.data;
}