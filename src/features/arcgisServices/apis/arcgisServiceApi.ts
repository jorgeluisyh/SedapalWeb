import { axiosInstance } from "../../../shared/http/axiosInstance";
import type { ArcGisService } from "../types/arcgisServiceType";


export const getArcgisServices = async (): Promise<ArcGisService[]> => {
    const response = await axiosInstance.get("/api/Servicios/serviciosmapa");
    return response.data;
}

export const createArcgisService = async (data: ArcGisService) => {
    const response = await axiosInstance.post("/api/Servicios/serviciosmapa", data);
    return response.data;
}

export const updateArcgisService = async (id: number, data: ArcGisService) => {
    const response = await axiosInstance.put(`/api/Servicios/serviciosmapa/${id}`, data);
    return response.data;
}

export const deleteArcgisService = async (id: number) => {
    const response = await axiosInstance.delete(`/api/Servicios/serviciosmapa/${id}`);
    return response.data;
}

export const getProducts = async () => {
    const response = await axiosInstance.get("/products");
    return response.data;
}
