import { axiosInstance } from "../../../shared/http/axiosInstance";
import type { Map } from "../types/mapType";


export const getMaps = async (): Promise<Map[]> => {
    const response = await axiosInstance.get("/api/Mapas");
    return response.data;
}

export const postMap = async (data: Map) => {
    const response = await axiosInstance.post("/api/Mapas", data);
    return response.data;
}

export const updateMap = async (data: Map) => {
    const response = await axiosInstance.put(`/api/Mapas`, data);
    return response.data;
}

export const deleteMap = async (id: number) => {
    const response = await axiosInstance.delete(`/api/Mapas?idMapa=${id}` );
    return response.data;
}