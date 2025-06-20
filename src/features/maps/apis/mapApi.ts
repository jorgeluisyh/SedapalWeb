import { axiosInstance } from "../../../shared/http/axiosInstance";
import type { MapType } from "../types/mapType";


export const getMaps = async (): Promise<MapType[]> => {
    const response = await axiosInstance.get("/api/Servicios/serviciosmapa");
    return response.data;
}

export const postMaps = async (data: MapType) => {
    const response = await axiosInstance.post("/api/Servicios/serviciosmapa", data);
    return response.data;
}

export const updateMaps = async (id: number, data: MapType) => {
    const response = await axiosInstance.put(`/api/Servicios/serviciosmapa/${id}`, data);
    return response.data;
}

export const deleteMaps = async (id: number) => {
    const response = await axiosInstance.delete(`/api/Servicios/serviciosmapa/${id}`);
    return response.data;
}